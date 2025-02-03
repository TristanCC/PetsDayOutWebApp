import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Button, Input, IconButton, HStack, Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";

const CustomerInfo = ({ selectedCustomer, setCustomerInfoOpen, updateCustomerInState }) => {
    const [firstName, setFirstName] = useState(selectedCustomer.firstName);
    const [middleName, setMiddleName] = useState(selectedCustomer.middleName);
    const [lastName, setLastName] = useState(selectedCustomer.lastName);
    const [email, setEmail] = useState(selectedCustomer.email);
    const [phoneNumber, setPhoneNumber] = useState(selectedCustomer.phoneNumber);
    const [customerComment, setCustomerComment] = useState(selectedCustomer.customerComment || "");
    const isMobile = useBreakpointValue({ base: true, md: false });

    const [editFirstName, setEditFirstName] = useState(false);
    const [editMiddleName, setEditMiddleName] = useState(false);
    const [editLastName, setEditLastName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);

    useEffect(() => {
        setFirstName(selectedCustomer.firstName);
        setMiddleName(selectedCustomer.middleName);
        setLastName(selectedCustomer.lastName);
        setEmail(selectedCustomer.email);
        setPhoneNumber(selectedCustomer.phoneNumber);
        setCustomerComment(selectedCustomer.customerComment || "");
    }, [selectedCustomer]);

    const handleClickEdit = (field) => {
        switch (field) {
            case "firstName":
                setEditFirstName(!editFirstName);
                if (editFirstName) setFirstName(selectedCustomer.firstName);
                break;
            case "middleName":
                setEditMiddleName(!editMiddleName);
                if (editMiddleName) setMiddleName(selectedCustomer.middleName);
                break;
            case "lastName":
                setEditLastName(!editLastName);
                if (editLastName) setLastName(selectedCustomer.lastName);
                break;
            case "email":
                setEditEmail(!editEmail);
                if (editEmail) setEmail(selectedCustomer.email);
                break;
            case "phoneNumber":
                setEditPhoneNumber(!editPhoneNumber);
                if (editPhoneNumber) setPhoneNumber(selectedCustomer.phoneNumber);
                break;
            default:
                break;
        }
    };

    const isSaveDisabled =
        selectedCustomer.firstName === firstName &&
        selectedCustomer.middleName === middleName &&
        selectedCustomer.lastName === lastName &&
        selectedCustomer.phoneNumber === phoneNumber &&
        selectedCustomer.email === email &&
        (selectedCustomer.customerComment || "") === customerComment;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/db/updateCustomer/${selectedCustomer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                middleName,
                lastName,
                email,
                phoneNumber,
                customerComment,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                updateCustomerInState(data);
                setCustomerInfoOpen(false);
            })
            .catch((error) => console.error("Error updating customer:", error));
    };

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg="rgba(18, 18, 18, 0.5)"
            backdropFilter="blur(10px)"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                borderRadius="lg"
                p={6}
                maxW="600px"
                w="auto"
                boxShadow="lg"
                position="relative"
                bg={{ base: "white", _dark: "primarySurface" }}
                color={{ base: "black", _dark: "white" }}
            >
                <IconButton
                    aria-label="Close"
                    position="absolute"
                    top={4}
                    right={4}
                    size="xl"
                    variant="ghost"
                    onClick={() => setCustomerInfoOpen(false)}
                >
                    <LuCircleX />
                </IconButton>
                <Text fontSize="2xl" fontWeight="bold" mb={6}>
                    Customer Info
                </Text>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} justifySelf={"center"}>
                        {isMobile ? (
                            <>
                                <Field label="First Name" required>
                                    <HStack>
                                        <Input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            isDisabled={!editFirstName}
                                            placeholder="First Name"
                                        />
                                        <IconButton
                                            aria-label="Edit First Name"
                                            icon={<FaRegEdit />}
                                            onClick={() => handleClickEdit("firstName")}
                                        />
                                    </HStack>
                                </Field>
                                <Field label="Middle Name">
                                    <HStack>
                                        <Input
                                            value={middleName || ""}
                                            onChange={(e) => setMiddleName(e.target.value)}
                                            isDisabled={!editMiddleName}
                                            placeholder="Middle Name"
                                        />
                                        <IconButton
                                            aria-label="Edit Middle Name"
                                            icon={<FaRegEdit />}
                                            onClick={() => handleClickEdit("middleName")}
                                        />
                                    </HStack>
                                </Field>
                            </>
                        ) : (
                            <>
                                <Field label="First Name" required>
                                    <HStack>
                                        <Input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            isDisabled={!editFirstName}
                                            placeholder="First Name"
                                        />
                                        <IconButton
                                            aria-label="Edit First Name"
                                            icon={<FaRegEdit />}
                                            onClick={() => handleClickEdit("firstName")}
                                        />
                                    </HStack>
                                </Field>
                                <Field label="Middle Name">
                                    <HStack>
                                        <Input
                                            value={middleName || ""}
                                            onChange={(e) => setMiddleName(e.target.value)}
                                            isDisabled={!editMiddleName}
                                            placeholder="Middle Name"
                                        />
                                        <IconButton
                                            aria-label="Edit Middle Name"
                                            icon={<FaRegEdit />}
                                            onClick={() => handleClickEdit("middleName")}
                                        />
                                    </HStack>
                                </Field>
                            </>
                        )}
                        <Field label="Last Name" required>
                            <HStack>
                                <Input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    isDisabled={!editLastName}
                                    placeholder="Last Name"
                                />
                                <IconButton
                                    aria-label="Edit Last Name"
                                    icon={<FaRegEdit />}
                                    onClick={() => handleClickEdit("lastName")}
                                />
                            </HStack>
                        </Field>
                        <Field label="Phone Number" required>
                            <HStack>
                                <Input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    isDisabled={!editPhoneNumber}
                                    placeholder="Phone Number"
                                />
                                <IconButton
                                    aria-label="Edit Phone Number"
                                    icon={<FaRegEdit />}
                                    onClick={() => handleClickEdit("phoneNumber")}
                                />
                            </HStack>
                        </Field>
                        <Field label="Email">
                            <HStack>
                                <Input
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isDisabled={!editEmail}
                                    placeholder="Email"
                                />
                                <IconButton
                                    aria-label="Edit Email"
                                    icon={<FaRegEdit />}
                                    onClick={() => handleClickEdit("email")}
                                />
                            </HStack>
                        </Field>
                        <Field label="Customer Notes">
                            <Textarea
                                value={customerComment}
                                onChange={(e) => setCustomerComment(e.target.value)}
                                placeholder="Start typing..."
                                resize="vertical"
                            />
                        </Field>
                        <Button
                            type="submit"
                            isDisabled={isSaveDisabled}
                            colorScheme="blue"
                            width="100%"
                            mt={4}
                        >
                            Save Changes
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
};

export default CustomerInfo;