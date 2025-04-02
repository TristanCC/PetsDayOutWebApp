import { useState, useEffect } from "react";
import { Tabs, VStack, Box, Text, IconButton, HStack, Spinner, Separator } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LuCircleX, LuBookOpenCheck } from "react-icons/lu";

const Present = ({ selectedCustomer, setPresentOpen, preferredColors }) => {
    const MotionBox = motion(Box);
    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/db/getPets/${selectedCustomer.id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPets(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching pets:", error);
                setPets([]);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCustomer?.id) {
            fetchPets();
        }
    }, [selectedCustomer?.id]);

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
                p={6}
                boxShadow="lg"
                maxH="90vh"
                w={{ base: "90vw", md: "50vw", lg: "600px" }}
                overflowY="auto"
                bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
            >
                <HStack w="100%" justifyContent="space-between" p={2}>
                    <HStack>
                        <IconButton 
                        variant={"plain"}
                        pointerEvents={"none"}
                        scale={"125%"}
                        colorPalette={preferredColors}>
                            <LuBookOpenCheck />
                        </IconButton>
                        <Text fontSize="2xl" fontWeight="medium">Mark Present</Text>
                    </HStack>
                    <IconButton aria-label="Close" size="lg" variant="ghost" onClick={() => setPresentOpen(false)}>
                        <LuCircleX />
                    </IconButton>
                </HStack>
                
                <Separator  w="80%" alignSelf={"start"} mb={"1rem"} />
                
                {loading ? (
                    <HStack justifyContent="center">
                        <Spinner />
                        <Text>Loading...</Text>
                    </HStack>
                ) : (
                    <VStack w="100%" align="stretch" spacing={4}>
                        {pets.length > 0 ? (
                            pets.map((pet) => <Text key={pet.id}>{pet.name} - {pet.breed}</Text>)
                        ) : (
                            <Text>No pets found.</Text>
                        )}
                    </VStack>
                )}
            </MotionBox>
        </Box>
    );
};

export default Present;
