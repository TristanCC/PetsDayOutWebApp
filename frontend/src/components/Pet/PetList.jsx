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

import { Group, HStack } from "@chakra-ui/react"
import { EmptyState } from "@/components/ui/empty-state"
import { GiSniffingDog } from "react-icons/gi";

import { LuCircleX } from "react-icons/lu";

import CreatePet from "./CreatePet"

const PetList = ({ customer, preferredColors, handleEditPet, closePetsPanel }) => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true)

    const [createPetPressed, setCreatePetPressed] = useState(false)

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true)
                const response = await fetch(`db/getPets/${customer.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPets(Array.isArray(data) ? data : []);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching pets:', error);
                setPets([]);
                setLoading(false)
                
            }
        };

        if (customer.id) {
            fetchPets();
        }
    }, [customer]);

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
            ></Box>
            {loading ? (
                <Box
                    bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
                    textAlign={"center"}
                    borderRadius={"1rem"}
                    p={"1rem"}
                    w={"100%"}
                    h={"auto"}
                    cursor={"radio"}
                >
                    <Text>Fetching pets...</Text>
                </Box>
            ) : pets.length === 0 ? (
                <Box
                    bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
                    borderRadius={"1rem"}
                    p={"1rem"}
                    w={"100%"}
                    h={"auto"}
                    cursor={"radio"}
                >
                    <IconButton
                        position={"absolute"}
                        top={"5"}
                        right={"5"}
                        aria-label="close update customer"
                        size={"lg"}
                        variant={"ghost"}
                        borderRadius={"1rem"}
                        onClick={() => closePetsPanel()}
                        zIndex={100000}
                    >
                        <LuCircleX />
                    </IconButton>
                    {!createPetPressed ? (
                    <EmptyState
                        icon={<Box fontSize={"3.5rem"}><GiSniffingDog/></Box>}
                        title={`Start tracking pets!`}
                        description={`No pets are being tracked for ${customer.firstName} yet.
                        You can either create a new pet or link customers together (for pets already in the system).`}
                        >
                                        
                        <Group>
                            <Button>Link Customers</Button>
                            <Button onClick={()=>setCreatePetPressed(true)}>Create Pet</Button>
                        </Group>
                    </EmptyState>
                    ) : (<CreatePet customer={customer}/>)}
                </Box>
            ) : (
                <Box
                    bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
                    borderRadius={"1rem"}
                    p={"2rem"}
                    w={"100%"}
                    h={"auto"}
                    cursor={"radio"}
                >
                    <IconButton
                        position={"absolute"}
                        top={"0"}
                        right={"0"}
                        aria-label="close update customer"
                        size={"lg"}
                        variant={"ghost"}
                        borderRadius={"1rem"}
                        onClick={() => closePetsPanel()}
                        zIndex={100000}
                    >
                        <LuCircleX />
                    </IconButton>

                    <div className="customerInfoHeader">
                        <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"medium"}
                                position={"relative"}
                                justifySelf={"center"}
                            >
                                {customer.firstName} {customer.lastName}
                                {customer.lastName.charAt(customer.lastName.length - 1) === "s"
                                    ? "'"
                                    : "'s"}{" "}
                                Pets
                            </Text>
                            <AccordionRoot multiple variant={"enclosed"}>
                                {pets.map((item, index) => (
                                    <AccordionItem key={index} value={item.name}>
                                        <AccordionItemTrigger>{item.name}</AccordionItemTrigger>
                                        <AccordionItemContent>{item.breed}</AccordionItemContent>
                                        <AccordionItemContent>{item.size}</AccordionItemContent>
                                    </AccordionItem>
                                ))}
                            </AccordionRoot>
                            <Button>Link Customers</Button>
                            <Button>Add Pet</Button>
                        </Box>
                    </div>
                </Box>
            )}
        </div>
    );
};

export default PetList;
