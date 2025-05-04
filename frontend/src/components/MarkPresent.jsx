import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox, Portal} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { motion } from "framer-motion";
import { LuCircleX, LuBookOpenCheck } from "react-icons/lu";
import { EmptyState } from "@chakra-ui/react"
import { FaDog } from "react-icons/fa6";
import placeholderAvatar from "../assets/Dogavi.png";

const MotionBox = motion(Box);

const MarkPresent = ({ selectedCustomer, setPresentOpen, preferredColors }) => {
    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState([]);
    const [selectedPets, setSelectedPets] = useState([]);


    const handleCheck = useCallback((pet) => {
        setSelectedPets((prev) =>
            prev.find(p => p.id === pet.id)
                ? prev.filter(p => p.id !== pet.id)
                : [...prev, pet]
        );
    }, []);
    
    
    const handleConfirm = () => {
        const markPresent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/db/markPresent`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                // Change the body of the fetch request to:
                body: JSON.stringify({
                    customer: selectedCustomer.id,
                    pets: selectedPets.map(p => p.id) // Just send the IDs directly
                })
                                       
                });
                if (!response.ok) throw new Error("Network error");
                const data = await response.json();
                
            } catch (error) {
                console.error("Error marking present:", error);
            } finally {
                const namesString = pets.map((pet) => pet.name).join(`, `)
                toaster.create({
                    title: `Marked Present successfully`,
                    description: `${namesString}`,
                    type: "success"
                })
                setLoading(false);
                setPresentOpen(false)
            }
        };
        markPresent()
    }

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/db/getPets/${selectedCustomer.id}`);
                if (!response.ok) throw new Error("Network error");
                const data = await response.json();
                setPets(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching pets:", error);
                setPets([]);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCustomer?.id) fetchPets();
    }, [selectedCustomer?.id]);

    const rows = useMemo(() => (
        pets.map((pet) => (
            <Table.Row key={pet.id} bg={{ base: "primaryL", _dark: "primary" }} 
            maxW={"100%"} onClick={() => handleCheck(pet)} cursor={"pointer"} className="tableRow"
            color={selectedPets.includes(pet) ? preferredColors+".500": "inherit"} 
            
            >
                <Table.Cell textAlign={"center"}>
                    <Avatar.Root shape="rounded" size="2xl">
                        <Avatar.Fallback name={pet.name} />
                        <Avatar.Image src={pet.photoUrl ? pet.photoUrl:placeholderAvatar} />
                    </Avatar.Root>
                </Table.Cell>
                <Table.Cell overflow="hidden" whiteSpace="nowrap" textAlign={"start"}>
                    <Text maxW={"4rem"} fontWeight="medium">{pet.name}</Text>
                </Table.Cell>
                <Table.Cell  overflow="hidden" whiteSpace="nowrap" textAlign={"start"}>
                    <Text >{pet.breed || "N/A"}</Text>
                </Table.Cell>
            </Table.Row>
        ))
    ), [pets, selectedPets, handleCheck]);
    

    return (
        <Portal>
            <Box
                position="fixed"
                top={0}
                left={0}
                w="100svw"
                h="100svh"
                bg="rgba(18, 18, 18, 0.5)"
                backdropFilter="blur(1px)"
                zIndex={1000}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="default"
                overflow="auto"
            >
                <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    borderRadius="lg"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    pos={"fixed"}
                    boxShadow="lg"
                    position={"fixed"}
                    w={{ base: "90svw", md: "50svw", lg: "33svw" }}
                    minW={"300px"}
                    colorPalette={preferredColors}
            
                    bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
                >
                    <HStack w="100%" justifyContent="space-between" p={4}>
                        <HStack>
                            <IconButton variant="plain" pointerEvents="none" scale="125%" colorPalette={preferredColors}>
                                <LuBookOpenCheck />
                            </IconButton>
                            <Text fontSize="2xl" fontWeight="medium">Mark Present</Text>
                        </HStack>
                        <IconButton aria-label="Close" size="lg" variant="ghost" onClick={() => setPresentOpen(false)}>
                            <LuCircleX />
                        </IconButton>
                    </HStack>
                    <Separator w="100%" alignSelf="start" />
                    {loading ? (
                        <HStack justifyContent="center">
                            <Spinner />
                            <Text>Loading...</Text>
                        </HStack>
                    ) : (
                    <VStack
                        w="100%"
                        bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
                        align="start"
                        rounded="md"
                        gap={0}
            
                    >
                        <Box w="100%" maxH="60svh" overflowY="auto" flex={1} >
                            {pets.length > 0 ? (
                                <Table.Root interactive stickyHeader  size={"md"} variant={"outline"}
                                 >
                                        <Table.ColumnGroup>
                                          <Table.Column htmlWidth="25%" />
                                          <Table.Column htmlWidth="25%" />
                                          <Table.Column htmlWidth="25%" />
                                          <Table.Column/>
                                        </Table.ColumnGroup>
                                    <Table.Header >
                                        <Table.Row bg={{ base: "white", _dark: "primaryMidpoint" }}>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body >{rows}</Table.Body>
                                </Table.Root>
                            ) : (
                                <EmptyState.Root justifyContent={"center"} alignContent={"center"} alignSelf={"center"}>
                                <EmptyState.Content>
                                  <EmptyState.Indicator>
                                    <FaDog />
                                  </EmptyState.Indicator>
                                  <VStack textAlign="center">
                                    <EmptyState.Title>No pets found</EmptyState.Title>
                                    <EmptyState.Description>
                                      Add pets to mark them present
                                    </EmptyState.Description>
                                  </VStack>
                                </EmptyState.Content>
                              </EmptyState.Root>
                            )}
                        </Box>
                        <Box w={"100%"} p={4} display={pets.length > 0 ? "block" : "none"}>
                            <Button disabled={selectedPets.length === 0} w="100%" size={"lg"}  onClick={handleConfirm} >
                                Confirm
                            </Button>
                        </Box>
                    </VStack>
                    )}
                </MotionBox>
            </Box>
        </Portal>
    );
};

export default MarkPresent;
