import { useState, useEffect } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { 
  Table,
  Button,
  IconButton,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion"

import { LuCircleX } from "react-icons/lu";


const PetList = ({ customer, preferredColors, handleEditPet, closePetsPanel }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`db/getPets/${customer.id}`);
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    if (customer.id) {
      fetchPets();
    }
  }, [customer]);

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
    bg={{ base: "white", _dark: "primarySurface" }}
    borderRadius={"1rem"}
    p={"2rem"} w={"100%"} h={"auto"}
    cursor={"radio"}
    >
        <IconButton position={"absolute"} top={"0"}
         right={"0"} aria-label="close update customer"
         size={"lg"} variant={"ghost"} borderRadius={"1rem"} onClick={() => closePetsPanel()}>
            <LuCircleX />
        </IconButton>
                <Text fontSize={"2xl"} fontWeight={"medium"} mb={"1rem"}
                 position={"relative"} justifySelf={"center"}
                 bottom={"0.75rem"}
                 >
                  {customer.firstName} {customer.lastName}
                  {customer.lastName.charAt(customer.lastName.length-1) == "s" ? "'" : "'s"} Pets
                 </Text>
        <div className="customerInfoHeader">
        <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
        <AccordionRoot multiple variant={"enclosed"}>
      {pets.map((item, index) => (
        <AccordionItem key={index} value={item.name}>
          <AccordionItemTrigger>{item.name}</AccordionItemTrigger>
          <AccordionItemContent>{item.breed}</AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
        </Box>
        </div>
    </Box>
</div>
  );
};

export default PetList;


{/* <Box>
{pets.map((pet) => (
  <div key={pet.id}>
    <h1>{pet.name}</h1>
  </div>
))}
</Box> */}

/*

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

*/