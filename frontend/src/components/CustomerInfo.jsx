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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const [editFirstName, setEditFirstName] = useState(true);
    const [editMiddleName, setEditMiddleName] = useState(true);
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

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [selectedCustomer]);

    const handleClickEditCustomer = (num) => {
        switch (num) {
            case 1:
                if (isMobile) {
                    if (!edit1) {
                        setFirstName(selectedCustomer.firstName);
                        setMiddleName(selectedCustomer.middleName);
                    }
                    setEdit1(!edit1);
                } else {
                    if (!editFirstName) {
                        setFirstName(selectedCustomer.firstName);
                    }
                    setEditFirstName(!editFirstName);
                }
                break;
            case 2:
                if (!edit2) {
                    setLastName(selectedCustomer.lastName);
                }
                setEdit2(!edit2);
                break;
            case 3:
                if (!edit3) {
                    setEmail(selectedCustomer.email);
                }
                setEdit3(!edit3);
                break;
            case 4:
                if (!edit4) {
                    setPhoneNumber(selectedCustomer.phoneNumber);
                }
                setEdit4(!edit4);
                break;
            case 5:
                if (!isMobile) {
                    if (!editMiddleName) {
                        setMiddleName(selectedCustomer.middleName);
                    }
                    setEditMiddleName(!editMiddleName);
                }
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
            backdropFilter={"blur(20px)"}
            opacity={"100%"}
            zIndex={-1}
            pointerEvents={"none"}
            cursor={"default"}
            >
            </Box>

            <Box
            bg={{ base: "transparent", _dark: "transparent" }}
            color={"white"}
            borderRadius={"1rem"}
             h={"auto"}
            cursor={"radio"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"start"}
            
            >
                <HStack display={"flex"} justifyItems={"start"}>
                    <IconButton position={"absolute"} 
                        aria-label="close update customer"  mb={"1rem"} right={0}
                        size={"lg"} variant={"ghost"} borderRadius={"1rem"} onClick={() => setCustomerInfoOpen(false)}>
                        <LuCircleX />
                    </IconButton>
                            <Text fontSize={"2xl"} fontWeight={"medium"} mb={"1rem"}
                             position={"relative"} justifySelf={"start"} alignSelf={"center"}
                             >Customer Info</Text>
                </HStack>
                <Box className="customerInfoHeader" alignSelf={"center"}>
                        <form action="" className="customerInfoForm" onSubmit={handleSubmit}>
                            <Box className="customerInfoFormInner"
                            display={"flex"} >
                                <Box className="editInput">
                                    {isMobile ? (
                                        <HStack >
                                            <Field label="First name" required >
                                                <HStack>
                                                    <Input
                                                        disabled={edit1}
                                                        variant="subtle"
                                                        fontSize={"md"}
                                                        value={firstName}
                                                        size="md"
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        bg={{ base: "primaryL", _dark: "primary" }}
                                                        color={{ base: "black", _dark: "white" }}
                                        
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
                                                        bg={{ base: "primaryL", _dark: "primary" }}
                                                        color={{ base: "black", _dark: "white" }}
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
                                    ) : (
                                        <>
                                        <Field label="First name" required>
                                            <HStack w={"100%"}mb={"1rem"}>
                                                <Input
                                                    disabled={editFirstName}
                                                    variant="subtle"
                                                    fontSize={"md"}
                                                    value={firstName}
                                                    size="md"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    bg={{ base: "primaryL", _dark: "primary" }}
                                                    color={{ base: "black", _dark: "white" }}
                                    
                                                />
                                                <IconButton
                                                    aria-label="Edit first name"
                                                    onClick={() => handleClickEditCustomer(1)}
                                                    >
                                                        <FaRegEdit />
                                                </IconButton>                
                                            </HStack>
                                        </Field>
                                        <Field label="Middle" >
                                            <HStack w={"100%"}>
                                                <Input
                                                    disabled={editMiddleName}
                                                    variant="subtle"
                                                    fontSize={"md"}
                                                    value={middleName? middleName : ""}
                                                    placeholder="N/A"
                                                    size="md"
                                                    onChange={(e) => setMiddleName(e.target.value)}
                                                    bg={{ base: "primaryL", _dark: "primary" }}
                                                    color={{ base: "black", _dark: "white" }}
                                                />
                                                <IconButton
                                                    aria-label="Edit middle name"
                                                    onClick={() => handleClickEditCustomer(5)}
                                                >
                                                    <FaRegEdit />
                                                </IconButton>
                                            </HStack>
                                        </Field>
                                        </>
                                    )}

                                </Box>
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
                                                bg={{ base: "primaryL", _dark: "primary" }}
                                                color={{ base: "black", _dark: "white" }}
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
                                                bg={{ base: "primaryL", _dark: "primary" }}
                                                color={{ base: "black", _dark: "white" }}
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
                                                bg={{ base: "primaryL", _dark: "primary" }}
                                                color={{ base: "black", _dark: "white" }}
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
                                            bg={{ base: "primaryL", _dark: "primary" }}
                                            color={{ base: "black", _dark: "white" }}
                                            
                                         />
                                      </Field>
                                      
                                    </HStack>
                                </div>
                                <Button type="submit" disabled={isSaveDisabled}
                                w={"100%"}>Save</Button>
                            </Box>
                        </form>
                </Box>
            </Box>
        </div>
    );
};

export default CustomerInfo;
