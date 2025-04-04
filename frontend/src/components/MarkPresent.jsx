import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LuCircleX, LuBookOpenCheck } from "react-icons/lu";

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
            <Table.Row key={pet.id} bg={{ base: "white", _dark: "primary" }}>
                <Table.Cell>
                    <Avatar.Root shape="rounded" size="xl">
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src={placeholderAvatar} />
                    </Avatar.Root>
                </Table.Cell>
                <Table.Cell maxW="150px" overflow="hidden" whiteSpace="nowrap">
                    <Text maxW={"4rem"} fontWeight="medium">{pet.name}</Text>
                </Table.Cell>
                <Table.Cell maxW="150px" overflow="hidden" whiteSpace="nowrap">
                    <Text maxW={"4rem"}>{pet.breed || "N/A"}</Text>
                </Table.Cell>
                <Table.Cell >
                    <Checkbox.Root
                        size="lg"
                        variant="outline"
                        checked={selectedPets.some(p => p.id === pet.id)}
                        onCheckedChange={() => handleCheck(pet)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label />
                    </Checkbox.Root>
                </Table.Cell>
            </Table.Row>
        ))
    ), [pets, selectedPets, handleCheck]);
    

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
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
                p={4}
                pos={"fixed"}
                boxShadow="lg"
                maxH="80vh"
                position={"fixed"}
                w={{ base: "90vw", md: "50vw", lg: "450px" }}
                
                bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
            >
                <HStack w="100%" justifyContent="space-between" p={2}>
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

                <Separator w="80%" alignSelf="start" mb="1rem" />

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
                    flex="1 1 0"
                >
                    <Box w="100%" maxH="60vh" overflowY="auto">
                        {pets.length > 0 ? (
                            <Table.Root interactive stickyHeader >
                                <Table.Header bg={{ base: "white", _dark: "primary" }}>
                                    <Table.Row alignItems="center" bg={{ base: "white", _dark: "primaryMidpoint" }}>
                                        <Table.ColumnHeader />
                                        <Table.ColumnHeader><Text>Name</Text></Table.ColumnHeader>
                                        <Table.ColumnHeader><Text>Breed</Text></Table.ColumnHeader>
                                        <Table.ColumnHeader><Text></Text></Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>{rows}</Table.Body>
                            </Table.Root>
                        ) : (
                            <Text textAlign="center" w="100%">This customer has no pets yet.</Text>
                        )}
                    </Box>
                    <Button disabled={selectedPets.length === 0} display={pets.length > 0 ? "block" : "none"} w="100%" onClick={handleConfirm} >
                        Confirm
                    </Button>
                </VStack>
                )}
            </MotionBox>
        </Box>
    );
};

export default MarkPresent;
