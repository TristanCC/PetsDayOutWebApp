import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Button, Input, IconButton, HStack, Box, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react"

import { LuCircleX } from "react-icons/lu";

// import PetList from './PetList';

const CustomerInfo = ({ selectedCustomer, setCustomerInfoOpen, updateCustomerInState }) => {
    const [firstName, setFirstName] = useState(selectedCustomer.firstName);
    const [middleName, setMiddleName] = useState(selectedCustomer.middleName);
    const [lastName, setLastName] = useState(selectedCustomer.lastName);
    const [email, setEmail] = useState(selectedCustomer.email);
    const [phoneNumber, setPhoneNumber] = useState(selectedCustomer.phoneNumber);
    const [customerComment, setCustomerComment] = useState(selectedCustomer.customerComment);

    const [edit1, setEdit1] = useState(true);
    const [edit2, setEdit2] = useState(true);
    const [edit3, setEdit3] = useState(true);
    const [edit4, setEdit4] = useState(true);


    useEffect(() => {
        setFirstName(selectedCustomer.firstName);
        setMiddleName(selectedCustomer.middleName)
        setLastName(selectedCustomer.lastName);
        setEmail(selectedCustomer.email);
        setPhoneNumber(selectedCustomer.phoneNumber);
        setCustomerComment(selectedCustomer.customerComment || "");
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

    const isSaveDisabled = 
           selectedCustomer.firstName === firstName
        && selectedCustomer.middleName === middleName
        && selectedCustomer.lastName === lastName
        && selectedCustomer.phoneNumber === phoneNumber
        && selectedCustomer.email === email
        && (selectedCustomer.customerComment || "") === customerComment;


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/db/updateCustomer/${selectedCustomer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                customerComment: customerComment,
            }),
        })
        .then(response => response.json())
        .then(data => {
            updateCustomerInState(data);
        })
        .catch(error => console.error('Error updating customer:', error));
        setCustomerInfoOpen(false);
    }

    return (
        
        <div className="customerInfo">
            <Box className="transparentBackground"
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
            >
            </Box>

            <Box
            bg={{ base: "white", _dark: "black" }}
            borderRadius={"1rem"}
            p={"2rem"} w={"100%"} h={"auto"}
            cursor={"radio"}
            
            >
                <IconButton position={"absolute"} top={"0"}
                 right={"0"} aria-label="close update customer"
                 size={"lg"} variant={"ghost"} borderRadius={"1rem"} onClick={() => setCustomerInfoOpen(false)}>
                    <LuCircleX />
                </IconButton>
                        <Text fontSize={"2xl"} fontWeight={"medium"} mb={"1rem"}
                         position={"relative"} justifySelf={"center"}
                         bottom={"0.75rem"}
                         >Customer Info</Text>
                <div className="customerInfoHeader">
                        <form action="" className="customerInfoForm" onSubmit={handleSubmit}>
                            <div className="customerInfoFormInner">
                                <div className="editInput">
                                    <HStack maxW={"275px"} w={"100%"}>
                                        <Field label="First name" required >
                                            <HStack w={"100%"}>
                                                <Input
                                                    disabled={edit1}
                                                    variant="subtle"
                                                    fontSize={"md"}
                                                    value={firstName}
                                                    size="md"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </HStack>
                                        </Field>
                                        <Field label="Middle" >
                                            <HStack w={"100%"}>
                                                <Input
                                                    disabled={edit1}
                                                    variant="subtle"
                                                    fontSize={"md"}
                                                    value={middleName? middleName : ""}
                                                    placeholder="N/A"
                                                    size="md"
                                                    onChange={(e) => setMiddleName(e.target.value)}
                                                    
                                                />
                                                <IconButton
                                                    aria-label="Edit first name or middle name"
                                                    onClick={() => handleClickEditCustomer(1)}
                                                >
                                                    <FaRegEdit />
                                                </IconButton>
                                            </HStack>
                                        </Field>
                                    </HStack>
                                </div>
                                <div className="editInput">
                                    <Field label="Last name" required>
                                        <HStack w={"100%"}>
                                            <Input
                                                disabled={edit2}
                                                variant="subtle"
                                                fontSize={"md"}
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
                                                fontSize={"md"}
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
                                                fontSize={"md"}
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
                                <div className="editInput2">
                                    <HStack gap="10" width="100%" h={"auto"}>
                                        
                                      <Field label="Customer Notes">
                                        
                                        <Textarea
                                        fontSize={"md"}
                                            placeholder="Start typing..."
                                            variant="outline"
                                            overflowWrap={"break-word"}
                                            h={"10rem"}
                                            value={customerComment}
                                            onChange={(e) => {
                                                setCustomerComment(e.target.value);
                                                console.log(selectedCustomer.customerComment);
                                            }}
                                        />
                                      </Field>
                                      
                                    </HStack>
                                </div>
                                <Button type="submit" disabled={isSaveDisabled}
                                w={"100%"}>Save</Button>
                            </div>
                        </form>
                </div>
            </Box>
        </div>
    );
};

export default CustomerInfo;
