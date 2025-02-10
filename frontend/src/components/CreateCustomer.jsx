import { useEffect, useState } from "react";
import { Button, Input, IconButton, HStack, Box, Text, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import CustomerCreationPet from './CustomerCreationPet';
import { Checkbox } from "@/components/ui/checkbox"
import { Toaster, toaster } from "@/components/ui/toaster"

import CreatePet from "./Pet/CreatePet2";


const CreateCustomer = ({ setCustomerInfoOpen }) => {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [addPetChecked, setAddPetChecked] = useState(false);


  const createEditableField = (label, value, setValue, required) => (
    <Field label={label} required={required} mb={".5rem"}>
      <HStack w={"100%"}>
        <Input
          variant={"outline"}
          size={"lg"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          backgroundColor={{ base: "primaryL", _dark: "primary" }}
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    let customerId;
  
    // Create customer
    try {
      console.log('Submitting customer data:', {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email || null,
        phoneNumber: phoneNumber,
      });
  
      response = await fetch('/db/createCustomer', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          email: email || null,
          phoneNumber: phoneNumber,
        })
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const customerData = await response.json();
      customerId = customerData.newCustomer.id; // Extract the customer ID
      console.log("Customer ID:", customerId);
      console.log("Customer Data:", customerData);
  
      // Update the customer state with the new ID
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        id: customerId,
      }));
    } catch (error) {
      console.error("Error creating customer:", error);
      return;
    }
  
    // Create pets if checkbox is checked and petList is not empty
    if (addPetChecked && petList.length > 0) {
      try {
        for (const pet of petList) {
          response = await fetch('/db/createPet', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: pet.name,
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

  useEffect(() => {
    console.log("FROM INSIDE CREATECUSTOMER PETLIST", petList)
  },[petList])

  return (
    <Box className="customerInfo" p={4}
     bg={{ base: "primaryL", _dark: "primaryMidpoint" }} borderRadius="md" boxShadow="md"
     minW={"259px"} maxW={"400px"}  w="100%">
      {/* Modal background */}
      <Box
        className="transparentBackground"
        pos={"fixed"}
        w={"100vw"}
        h={"100vh"}
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
        p={"2rem"}
        w={"100%"}
        h={"auto"}
        cursor={"radio"}
        flex={1}
        flexDir={"column"}
        data-state="open"
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
        <IconButton
          position={"absolute"}
          top={"8"}
          right={"6"}
          aria-label="close create customer"
          size={"lg"}
          variant={"ghost"}
          borderRadius={"1rem"}
          onClick={() => setCustomerInfoOpen(false)}
        >
          <LuCircleX />
        </IconButton>

        {/* Modal title */}
        { step == 1 && (<Text fontSize={"2xl"} fontWeight={"medium"} mb={2} position={"relative"} justifySelf={"start"} bottom={"0.75rem"}>
          Create Customer
        </Text>
        )}

        <Box className="customerInfoHeader" h={"100%"} >
          <form className="customerInfoForm">
            <VStack spacing={4} align="stretch">
              <Box>
                {/* Form fields for step 1 */}
                {step === 1 && (
                  <>
                    {createEditableField("First Name", firstName, setFirstName, true)}
                    {createEditableField("Middle Name", middleName, setMiddleName, false)}
                    {createEditableField("Last Name", lastName, setLastName, true)}
                    {createEditableField("Phone Number", phoneNumber, setPhoneNumber, true)}
                    {createEditableField("Email", email, setEmail, false)}
                    <Box mt={"1rem"}>
                      <Checkbox checked={addPetChecked} onCheckedChange={(e) => setAddPetChecked(!addPetChecked)}>
                        Add pets now?
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
                     onClick={handleNextStep} w={"100%"} disabled={!firstName || !lastName || !phoneNumber}>
                      Next
                    </Button>
                  )}
                  {addPetChecked && step === 2 && (
                    <Button onClick={handlePrevStep} w={"50%"} variant={"outline"}>
                      Back
                    </Button>
                  )}
                  {(step === 2 || !addPetChecked) && (
                    <Button onClick={handleSubmit} w={step === 2 ? "50%" : "100%"} disabled={!firstName || !lastName || !phoneNumber || (addPetChecked && petList.length === 0)}>
                      Submit
                    </Button>
                  )}
                  <Toaster></Toaster>
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