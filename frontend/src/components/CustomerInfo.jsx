import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Button, Input, IconButton, HStack, Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import { Separator } from "@chakra-ui/react";
import { withMask } from "use-mask-input";

const createEditableField = (label, value, setValue, edit, setEdit, isMobile, required) => (
    <Field label={label} required={required}>
        <HStack>
            <Input
                variant={"outline"}
                size={"lg"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!edit}
                placeholder={label === "Phone Number" ? "(999) 999-9999" : label}
                ref={label === "Phone Number" ? withMask("(999) 999-9999") : null}
                backgroundColor={{ base: "primaryL", _dark: "primary" }}
            />
            <IconButton
                aria-label={`Edit ${label}`}
                size="sm"
                variant="ghost"
                onClick={() => setEdit(!edit)}
            >
                <FaRegEdit />
            </IconButton>
        </HStack>
    </Field>
);

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

        // Format the phone number before sending the payload
        const formattedPhoneNumber = phoneNumber.replaceAll(/[()\-\ ]/g, "");

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
                phoneNumber: formattedPhoneNumber, // Use the formatted phone number
                customerComment,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                updateCustomerInState(data);
                setCustomerInfoOpen(false);
                setPhoneNumber(formattedPhoneNumber); // Update the state with the formatted phone number
            })
            .catch((error) => console.error("Error updating customer:", error));
    };

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            w="100vw"
            h="100vh"
            bg="rgba(18, 18, 18, 0.5)"
            backdropFilter="blur(1px)"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            margin={"auto"}
        >
            <Box
                data-state="open"
                _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                }}
                _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                }}
                borderRadius="lg"
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                alignItems={"center"}
                p={6}
                boxShadow="lg"
                position="fixed"
                bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
            >
                <Box minW={"259px"} maxW={"400px"} w="100%" borderRadius={"lg"} p={2} py={0} display={"flex"} gap={"3"} lineHeight={"2rem"}
                    justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize="2xl" fontWeight="medium">
                        {selectedCustomer.firstName} {selectedCustomer.lastName}{selectedCustomer.lastName[selectedCustomer.lastName.length - 1] !== "s" ? "'s" : "'"} Info
                    </Text>
                    <IconButton
                        aria-label="Close"
                        size="xl"
                        variant="ghost"
                        rounded={"1"}
                        padding={0}
                        onClick={() => setCustomerInfoOpen(false)}
                    >
                        <LuCircleX />
                    </IconButton>
                </Box>
                <Separator mb={4} w={"80%"} alignSelf={"start"}></Separator>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} justifySelf={"center"}>
                        {createEditableField("First Name", firstName, setFirstName, editFirstName, setEditFirstName, isMobile, true)}
                        {createEditableField("Middle Name", middleName, setMiddleName, editMiddleName, setEditMiddleName, isMobile, false)}
                        {createEditableField("Last Name", lastName, setLastName, editLastName, setEditLastName, isMobile, true)}
                        {createEditableField("Phone Number", phoneNumber, setPhoneNumber, editPhoneNumber, setEditPhoneNumber, isMobile, true)}
                        {createEditableField("Email", email, setEmail, editEmail, setEditEmail, isMobile, false)}
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
                            disabled={isSaveDisabled}
                            width="100%"
                            mt={2}
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