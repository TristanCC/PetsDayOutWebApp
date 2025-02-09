import { useEffect, useState } from "react";
import { Button, Input, IconButton, HStack, Box, Text, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import CustomerCreationPet from './CustomerCreationPet';
import { Checkbox } from "@/components/ui/checkbox"

const createEditableField = (label, value, setValue, required) => (
  <Field label={label} required={required} mb={"1rem"}>
    <HStack>
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

const CreateCustomer = ({ setCustomerInfoOpen }) => {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [addPetChecked, setAddPetChecked] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to create a new customer
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

  return (
    <Box className="customerInfo" p={4} bg={{ base: "primaryL", _dark: "primaryMidpoint" }} borderRadius="md" boxShadow="md">
      {/* Modal background */}
      <Box
        className="transparentBackground"
        pos={"fixed"}
        w={"100vw"}
        h={"100vh"}
        top={"0px"}
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
        bg={{ base: "primaryL", _dark: "primaryMidpoint" }}
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
          top={"0"}
          right={"0"}
          aria-label="close create customer"
          size={"lg"}
          variant={"ghost"}
          borderRadius={"1rem"}
          onClick={() => setCustomerInfoOpen(false)}
        >
          <LuCircleX />
        </IconButton>

        {/* Modal title */}
        <Text fontSize={"2xl"} fontWeight={"medium"} mb={2} position={"relative"} justifySelf={"start"} bottom={"0.75rem"}>
          Create Customer
        </Text>

        <Box className="customerInfoHeader" h={"100%"}>
          <form onSubmit={handleSubmit} className="customerInfoForm">
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
                  <CustomerCreationPet />
                )}
                {/* Navigation buttons */}
                <HStack w={"100%"} mt={"1rem"}>
                  {addPetChecked && step === 1 && (
                    <Button onClick={handleNextStep} w={"100%"}>
                      Next
                    </Button>
                  )}
                  {addPetChecked && step === 2 && (
                    <Button onClick={handlePrevStep} w={"50%"}>
                      Back
                    </Button>
                  )}
                  {(step === 2 || !addPetChecked) && (
                    <Button type="submit" w={step === 2 ? "50%" : "100%"}>
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