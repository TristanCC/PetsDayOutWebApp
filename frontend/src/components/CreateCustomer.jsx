
import { useEffect, useState } from "react";
import { Button, Input, IconButton, HStack, Box, Text, VStack, Separator } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import CustomerCreationPet from './CustomerCreationPet';
import { Checkbox } from "@/components/ui/checkbox"
import { Toaster, toaster } from "@/components/ui/toaster"

import { useCustomers } from "./context/CustomerContext";

import { withMask } from "use-mask-input";

import CreatePet from "./Pet/CreatePet2";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const CreateCustomer = ({ setCustomerInfoOpen }) => {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [addPetChecked, setAddPetChecked] = useState(false);
  const [verifiedLink, setVerifiedLink] = useState(false)
  const [linkPhoneNumber, setLinkPhoneNumber] = useState("")

  const [newCreatedCustomerID, setNewCreatedCustomerID] = useState("")

  const [customerIDToLink, setCustomerIDToLink] = useState("")

  const {
    fetchCustomers
  } = useCustomers();


  const createEditableField = (label, value, setValue, required) => (
    <Field label={label} required={required} mb={".5rem"}>
      <HStack w={"100%"}>
        <Input
          variant={"outline"}
          size={"lg"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label === "Phone Number" ? "(999) 999-9999" : label}
          ref={label === "Phone Number" ? withMask("(999) 999-9999") : null}
          backgroundColor={{ base: "primarySurfaceL", _dark: "primarySurface" }}
        />
      </HStack>
    </Field>
  );

  useEffect(() => {
    customer.firstName = firstName
    customer.middleName = middleName
    customer.lastName = lastName
    customer.phoneNumber = phoneNumber
    customer.email = email

  },[firstName, middleName, lastName, email, phoneNumber])


  // pet form
  const [petName, setPetName] = useState("")
  const [petBreed, setPetBreed] = useState("")
  const [petSize, setPetSize] = useState("")
  const [petNotes, setPetNotes] = useState("")
  const [petPhotoUrl, setPetPhotoUrl] = useState("")

  const [customer, setCustomer] = useState({})
  const [petList, setPetList] = useState([])

  const [isCreatingCustomer, setIsCreatingCustomer] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    let customerId;

    setIsLoading(true)
  
    // Create customer
    try {
      const formattedPhoneNumber = phoneNumber.replaceAll(/[()\-\ ]/g, "");
      console.log('Submitting customer data:', {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email || null,
        phoneNumber: formattedPhoneNumber,
      });
  
      response = await fetch(`${BACKEND_URL}/db/createCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          email: email || null,
          phoneNumber: formattedPhoneNumber,
        })
      }
    );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const customerData = await response.json();
      customerId = customerData.newCustomer.id; // Extract the customer ID
      setNewCreatedCustomerID(customerId)
      console.log("Customer ID:", customerId);
      console.log("Customer Data:", customerData);
  
      // Update the customer state with the new ID
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        id: customerId,
      }));
      toaster.create({
        title: "Customer created succesfully",
        type: "success"
      })
    } catch (error) {
      console.error("Error creating customer:", error);
      return;
    }
  
    // Create pets if checkbox is checked and petList is not empty
    if (addPetChecked && petList.length > 0) {
      try {
        for (const pet of petList) {
          response = await fetch(`${BACKEND_URL}/db/createPet`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: pet.name,
              sex: pet.sex,
              breed: pet.breed,
              size: pet.size,
              photoUrl: pet.photoUrl,
              ownerID: customerId, // Use the customerId from the response
              notes: pet.notes
            })
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        }
      } catch (error) {
        console.error("Error creating pets:", error);
        return;
      }
    }

    if(verifiedLink) {
      const handleLink = async (currentID, targetID) => {
        try {
          const response = await fetch(`${BACKEND_URL}/db/linkCustomers`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentOwnerID: currentID,
              targetOwnerID: targetID,
            }),
          });
    
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to link customers.");
          }
          setDidLinkCustomer(true)
          reloadPets()
        } catch (error) {
          console.error("Error linking customers:", error);
        }
      };
      await handleLink(customerId, customerIDToLink)
    }
    await fetchCustomers()
  
    setCustomerInfoOpen(false);
  };

  // Handle next step in form
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Handle previous step in form
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onPetCreated = () => {
    // close 

  }

  const handleVerify = async () => {
    try {
      const formattedPhoneNumber = linkPhoneNumber.replaceAll(/[()\-\ ]/g, "");
      const response = await fetch(`${BACKEND_URL}/db/verifyPhone/${formattedPhoneNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (response.status === 304) {
        toaster.create({
          title: "Phone number already verified.",
          type: "info"
        });
        return;
      }
  
      if (response.status === 404) {
        toaster.create({
          title: "No customers with this phone number found.",
          type: "error"
        });
        return; // Don't continue if 404
      }
  
      if (!response.ok) {
        throw new Error("Error verifying linked phone number");
      }
  
      const data = await response.json(); 
  
      setVerifiedLink(true);
      setCustomerIDToLink(data.id); 
      toaster.create({
        title: "Successfully verified phone number.",
        type: "success"
      });
  
    } catch (error) {
      console.error("Error verifying linked phone number", error);
      toaster.create({
        title: "Failed to verify phone number.",
        type: "error"
      });
    }
  };
  
  

  useEffect(() => {
    setVerifiedLink(false)
  }, [linkPhoneNumber])

  useEffect(() => {
    console.log("FROM INSIDE CREATECUSTOMER PETLIST", petList)
  },[petList])

  return (
    <Box className="customerInfo" p={4}
     
     minW={"259px"} maxW={"600px"}  w="100%">
      {/* Modal background */}
      <Box
        className="transparentBackground"
        pos={"fixed"}
        w={"100svw"}
        h={"100svh"}
        top={"0px"}
        left={0}
        right={0}
        bottom={"0px"}
        backgroundColor={"rgba(18, 18, 18, 0.5)"}
        backdropFilter="blur(5px)"
        opacity={"100%"}
        zIndex={-1}
        pointerEvents={"none"}
        flex={1}
      ></Box>

      {/* Modal content */}
      <Box
        bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
        borderRadius={"1rem"}

        w={"100%"}
        h={"auto"}
        cursor={"radio"}
        flex={1}
        flexDir={"column"}
        data-state="open"
        maxH={"90vh"} // Limit the modal height to 90% of the viewport
        overflowY={"auto"} // Enable scrolling if content exceeds modal height
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "300ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
      >
        {/* Close button */}
        <HStack align={"center"} alignItems={"center"} justify={"space-between"} p={4}>
        <Text fontSize={"2xl"} fontWeight={"medium"}  position={"relative"} justifySelf={"start"} >
            Create Customer
          </Text>
          <IconButton
            aria-label="close create customer"
            size={"lg"}
            variant={"ghost"}
            borderRadius={"1rem"}
            onClick={() => setCustomerInfoOpen(false)}
            zIndex={9000}
          >
            <LuCircleX />
          </IconButton>
          {/* Modal title */}
        </HStack>
        <Separator mb={2} w={"100%"}/>

        <Box className="customerInfoHeader" h={"100%"} >
          <form className="customerInfoForm">
            <VStack spacing={4} align="stretch" p={4}>
              <Box>
                {/* Form fields for step 1 */}
                {step === 1 && (
                  <>
                    <HStack
                      gap={"1rem"}
                      flexDirection={{ base: "column", md: "row" }} // Stack vertically on small screens
                      w={"100%"}
                    >
                      <VStack w={"100%"}>
                        {createEditableField("First Name", firstName, setFirstName, true)}
                        {createEditableField("Middle Name", middleName, setMiddleName, false)}
                        {createEditableField("Last Name", lastName, setLastName, true)}
                      </VStack>
                      <VStack w={"100%"}>
                        {createEditableField("Phone Number", phoneNumber, setPhoneNumber, true)}
                      
                        {createEditableField("Email", email, setEmail, false)}
                                    
                        <Field label={"Link to Customer"} required={false} mb={".5rem"}>
                          <HStack w={"100%"}>
                            <Input
                              variant={"outline"}
                              size={"lg"}
                              value={linkPhoneNumber}
                              onChange={(e) => setLinkPhoneNumber(e.target.value)}
                              placeholder={"(999) 999-9999"}
                              ref={withMask("(999) 999-9999")}
                              backgroundColor={{ base: "primarySurfaceL", _dark: "primarySurface" }}
                            />
                            <Button disabled={linkPhoneNumber.replace(/\D/g, "").length < 10} onClick={handleVerify} backgroundColor={verifiedLink? "green.500" : "blue.500"}>
                              {verifiedLink ? "Verified!" : "Verify"}
                            </Button>
                          </HStack>
                        </Field>
                      </VStack>
                    </HStack>
                    <Text fontSize={"smaller"} maxW={"400px"}>NOTE: Customers with the same phone number will be automatically linked together in a household.</Text>

                    <Box mt={"1rem"}>
                      <Checkbox checked={addPetChecked} onCheckedChange={(e) => setAddPetChecked(!addPetChecked)}>
                        Add pets
                      </Checkbox>
                    </Box>
                  </>
                )}
                {/* Form fields for step 2 */}
                {step === 2 && (
                  <CreatePet 
                    customer={customer}
                    petName={petName} setPetName={setPetName}
                    petBreed={petBreed} setPetBreed={setPetBreed}
                    onPetCreated={onPetCreated}
                    petSize={petSize} setPetSize={setPetSize}
                    petNotes={petNotes} setPetNotes={setPetNotes}
                    petList={petList} setPetList={setPetList}
                    isCreatingCustomer={isCreatingCustomer}
                    petPhotoUrl={petPhotoUrl} setPetPhotoUrl={setPetPhotoUrl}
                    
                    />
                )}
                {/* Navigation buttons */}
                <HStack w={"100%"} mt={"1rem"}>
                  {addPetChecked && step === 1 && (
                    <Button variant={"outline"}
                     onClick={handleNextStep} w={"100%"} disabled={!firstName || !lastName || !phoneNumber || (linkPhoneNumber && !verifiedLink)}>
                      Next
                    </Button>
                  )}
                  {addPetChecked && step === 2 && (
                    <Button onClick={handlePrevStep} w={"50%"} variant={"outline"}>
                      Back
                    </Button>
                  )}
                  {(step === 2 || !addPetChecked) && (
                    <Button onClick={handleSubmit} w={step === 2 ? "50%" : "100%"} disabled={!firstName || !lastName || !phoneNumber || (addPetChecked && petList.length === 0) || isLoading || (linkPhoneNumber && !verifiedLink) }>
                      Submit
                    </Button>
                  )}
                </HStack>
              </Box>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCustomer;