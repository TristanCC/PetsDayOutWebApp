import { useEffect, useState } from "react";
import { Button, Input, IconButton, HStack, Box, Text, useMediaQuery } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";

const CreateCustomer = ({ setCustomerInfoOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to create a new customer
    setCustomerInfoOpen(false);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="customerInfo">
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
        flexWrap={1}
      >
        
      </Box>

      <Box
        bg={{ base: "white", _dark: "black" }}
        borderRadius={"1rem"}
        p={"2rem"}
        w={"100%"}
        h={"auto"}
        cursor={"radio"}
        flex={1}
        flexDir={"row"}
      >
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
        <Text fontSize={"2xl"} fontWeight={"medium"} mb={"1rem"}
         position={"relative"} justifySelf={"center"}
         bottom={"0.75rem"}
         >Create New Customer</Text>
        <div className="customerInfoHeader">
          <form onSubmit={handleSubmit} className="customerInfoForm">
            <div className="formWrapper">
                <div className="customerInfoFormInner">
                  {(!isMobile || step === 1) && (
                    <>
                      <div className="editInput">
                        <Field label="First name" required>
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={firstName}
                              size="md"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                      <div className="editInput">
                        <Field label="Middle name">
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={middleName}
                              size="md"
                              onChange={(e) => setMiddleName(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                      <div className="editInput">
                        <Field label="Last name" required>
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={lastName}
                              size="md"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                    </>
                  )}
                  {(!isMobile || step === 2) && (
                    <>
                      <div className="editInput">
                        <Field label="Phone number" required>
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={phoneNumber}
                              size="md"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                      <div className="editInput">
                        <Field label="Email">
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={email}
                              placeholder="N/A"
                              size="md"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                    </>
                  )}
                  {isMobile && (
                    <HStack w={"100%"} mt={"1rem"}>
                      {step > 1 && (
                        <Button onClick={handlePrevStep} w={"50%"}>
                          Back
                        </Button>
                      )}
                      {step < 2 && (
                        <Button onClick={handleNextStep} w={"50%"}>
                          Next
                        </Button>
                      )}
                      {step === 2 && (
                        <Button type="submit" w={"50%"}>
                          Submit
                        </Button>
                      )}
                    </HStack>
                  )}
                  {!isMobile && (
                    <Button type="submit" w={"100%"} mt={"1rem"}>
                      Submit
                    </Button>
                  )}
                </div>
                {!isMobile && (<div className="customerInfoFormInner">
                  {(!isMobile || step === 1) && (
                    <>
                      <div className="editInput">
                        <Field label="First name" required>
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={firstName}
                              size="md"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                      <div className="editInput">
                        <Field label="Middle name">
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={middleName}
                              size="md"
                              onChange={(e) => setMiddleName(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                      <div className="editInput">
                        <Field label="Last name" required>
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={lastName}
                              size="md"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                    </>
                  )}
                  {(!isMobile || step === 2) && (
                    <>
                      <div className="editInput">
                        <Field label="Phone number" required>
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={phoneNumber}
                              size="md"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                      <div className="editInput">
                        <Field label="Email">
                          <HStack w={"100%"}>
                            <Input
                              variant="subtle"
                              fontSize={"md"}
                              value={email}
                              placeholder="N/A"
                              size="md"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </HStack>
                        </Field>
                      </div>
                    </>
                  )}
                  {isMobile && (
                    <HStack w={"100%"} mt={"1rem"}>
                      {step > 1 && (
                        <Button onClick={handlePrevStep} w={"50%"}>
                          Back
                        </Button>
                      )}
                      {step < 2 && (
                        <Button onClick={handleNextStep} w={"50%"}>
                          Next
                        </Button>
                      )}
                      {step === 2 && (
                        <Button type="submit" w={"50%"}>
                          Submit
                        </Button>
                      )}
                    </HStack>
                  )}
                  {!isMobile && (
                    <Button type="submit" w={"100%"} mt={"1rem"}>
                      Submit
                    </Button>
                  )}
                </div>
                )
                }
            </div>
          </form>
        </div>
        <div><h1>hello</h1></div>
      </Box>
    </div>
  );
};

export default CreateCustomer;