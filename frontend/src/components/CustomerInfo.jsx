import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Button, Input, IconButton, HStack, Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import PetList from './PetList';

const CustomerInfo = ({ selectedCustomer, preferredColors }) => {
    const [firstName, setFirstName] = useState(selectedCustomer.firstName);
    const [lastName, setLastName] = useState(selectedCustomer.lastName);
    const [email, setEmail] = useState(selectedCustomer.email);
    const [phoneNumber, setPhoneNumber] = useState(selectedCustomer.phoneNumber);

    const [edit1, setEdit1] = useState(true);
    const [edit2, setEdit2] = useState(true);
    const [edit3, setEdit3] = useState(true);
    const [edit4, setEdit4] = useState(true);

    useEffect(() => {
        setFirstName(selectedCustomer.firstName);
        setLastName(selectedCustomer.lastName);
        setEmail(selectedCustomer.email);
        setPhoneNumber(selectedCustomer.phoneNumber);
    }, [selectedCustomer]);

    const handleClickEditCustomer = (num) => {
        switch (num) {
            case 1:
                setEdit1(!edit1);
                break;
            case 2:
                setEdit2(!edit2);
                break;
            case 3:
                setEdit3(!edit3);
                break;
            case 4:
                setEdit4(!edit4);
                break;
            default:
                break;
        }
    };

    const isSaveDisabled = selectedCustomer.firstName === firstName
        && selectedCustomer.lastName === lastName
        && selectedCustomer.phoneNumber === phoneNumber
        && selectedCustomer.email === email;

    return (
        <div className="customerInfo">
            <Box bg={{ base: "white", _dark: "black" }} borderRadius={"1rem"} p={"2rem"} >
                <div className="customerInfoHeader">
                    <h1>{selectedCustomer.firstName} {selectedCustomer.lastName}</h1>
                        <form action="" className="customerInfoForm">
                            <div className="customerInfoFormInner">
                                <div className="editInput">
                                    <Field label="First name" required >
                                        <HStack w={"100%"}>
                                            <Input
                                                disabled={edit1}
                                                variant="subtle"
                                                fontSize={"lg"}
                                                value={firstName}
                                                size="md"
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <IconButton
                                                aria-label="Edit first name"
                                                onClick={() => handleClickEditCustomer(1)}
                                            >
                                                <FaRegEdit />
                                            </IconButton>
                                        </HStack>
                                    </Field>
                                </div>
                                <div className="editInput">
                                    <Field label="Last name" required>
                                        <HStack w={"100%"}>
                                            <Input
                                                disabled={edit2}
                                                variant="subtle"
                                                fontSize={"lg"}
                                                value={lastName}
                                                size="md"
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <IconButton
                                                aria-label="Edit last name"
                                                onClick={() => handleClickEditCustomer(2)}
                                            >
                                                <FaRegEdit />
                                            </IconButton>
                                        </HStack>
                                    </Field>
                                </div>
                                <div className="editInput">
                                    <Field label="Phone number" required>
                                        <HStack w={"100%"}>
                                            <Input
                                                disabled={edit4}
                                                variant="subtle"
                                                fontSize={"lg"}
                                                value={phoneNumber}
                                                size="md"
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                            <IconButton
                                                aria-label="Edit phone number"
                                                onClick={() => handleClickEditCustomer(4)}
                                            >
                                                <FaRegEdit />
                                            </IconButton>
                                        </HStack>
                                    </Field>
                                </div>
                                <div className="editInput">
                                    <Field label="Email">
                                        <HStack w={"100%"}>
                                            <Input
                                                disabled={edit3}
                                                variant="subtle"
                                                fontSize={"lg"}
                                                value={email ? email : ""}
                                                placeholder="N/A"
                                                size="md"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <IconButton
                                                aria-label="Edit email"
                                                onClick={() => handleClickEditCustomer(3)}
                                            >
                                                <FaRegEdit />
                                            </IconButton>
                                        </HStack>
                                    </Field>
                                </div>
                                <Button type="submit" disabled={isSaveDisabled}>Save</Button>
                            </div>
                        </form>
                </div>
            </Box>
        </div>
    );
};

export default CustomerInfo;
