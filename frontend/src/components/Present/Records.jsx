import {useState, useEffect} from "react"
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox, Icon } from "@chakra-ui/react";
import { AbsoluteCenter, Accordion, Span } from "@chakra-ui/react"
import { motion } from "framer-motion";
import { LuFolderClock, LuCircleX } from "react-icons/lu";
import { LuFolder } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { Textarea } from "@chakra-ui/react"

import EditInstructions from "./EditInstructions";

const Records = ({ selectedPet, preferredColors, setRecordsOpen }) => {
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [editInstructionsOpen, setEditInstructionsOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");

    const catppuccinPastelRainbow = [
        "#89b4fa", // blue
        "#74c7ec", // sky
        "#94e2d5", // teal
        "#a6e3a1", // green
        "#f9e2af", // yellow
        "#fab387", // peach
        "#eba0ac", // rose
        "#f5c2e7", // pink
        "#cba6f7", // mauve
    ];

    const MotionBox = motion(Box);

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
        setSelectedColor(color); // Set the color when editing a record
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
                ):
                (
                    <>
                        <Accordion.Root variant="enclosed" collapsible overflow={"auto"} cursor={"pointer"} rounded={"lg"} multiple>
                            {!editInstructionsOpen ? records.map((record, idx) => (
                                <Accordion.Item
                                    key={idx}
                                    value={record.id}
                                    p={".25rem"}
                                    py={".5rem"}
                                    cursor={"pointer"}
                                    bg={`${catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}99`}
                                    borderLeft="5px solid"
                                    borderColor={catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}
                                    _hover={{
                                        base: { bg: `${catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}33` },
                                        _dark: { bg: `${catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}33` },
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box position="relative" cursor={"pointer"}>
                                        <Accordion.ItemTrigger cursor={"pointer"}>
                                            <HStack flex="1" cursor={"pointer"} gap={"1rem"}>
                                                <Icon><LuFolder /></Icon>
                                                <Text>
                                                    {(() => {
                                                        const [year, month, day] = record.date.split("-");
                                                        return `${month}/${day}/${year}`;
                                                    })()}

                                                    {record.status === "present" ? " - Newest": ""}
                                                </Text>
                                            </HStack>

                                            <Accordion.ItemIndicator />
                                        </Accordion.ItemTrigger>
                                        <AbsoluteCenter axis="vertical" insetEnd="0">
                                            <IconButton
                                                variant="ghost"
                                                onClick={() => { handleEditClick(record, catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]) }}
                                            >
                                                <FaRegEdit />
                                            </IconButton>
                                        </AbsoluteCenter>
                                    </Box>
                                    <Accordion.ItemContent>
                                        <Accordion.ItemBody>
                                            <Text>{record.instructions ? record.instructions : "No information from this visit."}</Text>
                                        </Accordion.ItemBody>
                                    </Accordion.ItemContent>
                                </Accordion.Item>
                            )) : (
                                <EditInstructions selectedRecord={selectedRecord} setEditInstructionsOpen={setEditInstructionsOpen} selectedColor={selectedColor} />
                            )}
                        </Accordion.Root>
                    </>
                )}
            </MotionBox>
        </Box>
    );
};

export default Records;
