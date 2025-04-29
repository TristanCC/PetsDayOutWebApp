import { useState, useEffect } from "react";
import { 
  Box, Text, IconButton, HStack, Spinner, Separator, Icon, VStack, AbsoluteCenter 
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuFolderClock, LuCircleX, LuFolder } from "react-icons/lu";
import { FaRegEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import EditInstructions from "./EditInstructions";

const MotionBox = motion(Box);

const Records = ({ selectedPet, preferredColors, setRecordsOpen }) => {
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [editInstructionsOpen, setEditInstructionsOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [expandedItems, setExpandedItems] = useState({});

    const catppuccinPastelRainbow = [
        "#89b4fa", "#74c7ec", "#94e2d5", "#a6e3a1", 
        "#f9e2af", "#fab387", "#eba0ac", "#f5c2e7", "#cba6f7"
    ];

    const toggleItem = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        const getRecords = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/db/getRecords/${selectedPet.id}`);
                const data = await response.json();

                const sortedRecords = [...(data.records || [])].sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                );

                setRecords(sortedRecords);
                
                // Initialize all items as collapsed
                const initialExpandedState = {};
                sortedRecords.forEach(record => {
                    initialExpandedState[record.id] = false;
                });
                setExpandedItems(initialExpandedState);
            } catch (error) {
                console.error("Error fetching records:", error);
            } finally {
                setLoading(false);
            }
        };

        getRecords();
    }, [editInstructionsOpen]);

    const handleEditClick = (record, color) => {
        setSelectedRecord(record);
        setSelectedColor(color);
        setEditInstructionsOpen(!editInstructionsOpen);
    };

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
                pos="fixed"
                boxShadow="lg"
                maxH="80vh"
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
                    <IconButton
                        aria-label="Close"
                        size="lg"
                        variant="ghost"
                        onClick={() => setRecordsOpen(false)}
                    >
                        <LuCircleX />
                    </IconButton>
                </HStack>

                <Separator w="80%" alignSelf="start" mb="1rem" />

                {loading ? (
                    <HStack justifyContent="center">
                        <Spinner />
                        <Text>Loading...</Text>
                    </HStack>
                ) : records.length === 0 ? (
                    <VStack justifyContent="center" alignItems="center" mt={4}>
                        <Text fontSize="md" fontWeight="medium" textAlign="center">
                            No records found for this pet.
                        </Text>
                    </VStack>
                ) : (
                    <>
                        <Box overflow="auto" cursor="pointer" rounded="lg" w="100%">
                            {!editInstructionsOpen ? records.map((record, idx) => (
                                <MotionBox
                                    key={record.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    mb={1}
                                >
                                    <MotionBox
                                        p=".25rem"
                                        py="1rem"
                                        bg={`${catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}99`}
                                        borderLeft="5px solid"
                                        borderColor={catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}
                                        borderRadius="md"
                                        _hover={{
                                            bg: `${catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}33`,
                                            cursor: "pointer",
                                        }}
                                        
                                    >
                                        <Box position="relative">
                                            <HStack
                                                onClick={() => toggleItem(record.id)}
                                                justifyContent="space-between"
                                                cursor="pointer"
                                            >
                                                <HStack flex="1" gap="1rem" ml={".5rem"}>
                                                    <Icon size={"md"} as={LuFolder} color={"gray.600"}/>
                                                    <Text color={"gray.800"}>
                                                        {(() => {
                                                            const [year, month, day] = record.date.split("-");
                                                            return `${month}/${day}/${year}`;
                                                        })()}
                                                        {record.status === "present" ? " - Newest" : ""}
                                                    </Text>
                                                </HStack>
                                                <Icon 
                                                    as={expandedItems[record.id] ? FaChevronUp : FaChevronDown}
                                                    mr={".5rem"}
                                                    transition="transform 0.2s"
                                                    transform={expandedItems[record.id] ? "rotate(0deg)" : "rotate(0deg)"}
                                                />
                                            </HStack>
                                            <AbsoluteCenter axis="vertical" insetEnd="0">
                                                <IconButton
                                                    mr={"2rem"}
                                                    variant="ghost"
                                                    color="white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditClick(record, catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]);
                                                    }}
                                                >
                                                    <FaRegEdit />
                                                </IconButton>
                                            </AbsoluteCenter>
                                        </Box>

                                        <AnimatePresence>
                                            {expandedItems[record.id] && (
                                                <MotionBox
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    overflow="hidden"
                                                    mt={2}
                                                >
                                                    <Box 
                                                        p={2}
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        alignItems="flex-start"  // Changed from center to flex-start for better text alignment
                                                        gap={2}  // Added gap for spacing
                                                    >
                                                        <Text 
                                                            flex="1"  // Takes up available space
                                                            wordBreak="break-word"  // Ensures long words break
                                                            whiteSpace="normal"  // Allows text to wrap
                                                            overflowWrap="break-word"  // Alternative to wordBreak
                                                            pr={2}  // Right padding to separate from button
                                                        >
                                                            {record.instructions || "No information from this visit."}
                                                        </Text>

                                                    </Box>
                                                </MotionBox>
                                            )}
                                        </AnimatePresence>
                                    </MotionBox>
                                </MotionBox>
                            )) : (
                                <MotionBox>
                                    <EditInstructions
                                        selectedRecord={selectedRecord}
                                        setEditInstructionsOpen={setEditInstructionsOpen}
                                        selectedColor={selectedColor}
                                    />
                                </MotionBox>
                            )}
                        </Box>
                    </>
                )}
            </MotionBox>
        </Box>
    );
};

export default Records;