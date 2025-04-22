import {useState, useEffect} from "react"
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LuFolderClock, LuCircleX } from "react-icons/lu";

const Records = ({ selectedPet, preferredColors, setRecordsOpen }) => {

    const [loading, setLoading] = useState(false)
    const [records, setRecords] = useState([])

    const MotionBox = motion(Box);

    useEffect(() => {
        const getRecords = async () => {
            const response = await fetch(`/db/getRecords/${selectedPet.id}`)
            const formattedResponse = await response.json()
            console.log(formattedResponse)
        }
        getRecords()
    }, [])

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
                                <LuFolderClock />
                                </IconButton>
                                <Text fontSize="2xl" fontWeight="medium">Pet Records</Text>
                            </HStack>
                            <IconButton aria-label="Close" size="lg" variant="ghost" onClick={() => setRecordsOpen(false)}>
                                   
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
                            <Text>{selectedPet.name}</Text>
                        )}
                    </MotionBox>
                </Box>
    )
} 

export default Records