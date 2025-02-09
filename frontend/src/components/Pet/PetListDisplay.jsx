import { useState } from "react"
import { Box, Button, IconButton, Text, HStack, Textarea, VStack } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import CreatePet from "./CreatePet";

const PetListDisplay = ({ pets, createPetPressed, setCreatePetPressed, closePetsPanel, customer, handleBack, reloadPets }) => {
    

    return (
    <Box
        bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
        borderRadius={"1rem"}
        p={"2rem"}
        w={"100%"}
        h={"clamp(300px, auto, 650px)"}
        cursor={"radio"}
        display={"flex"}
        flexDir={"column"}
        justifyItems={"center"}
        alignItems={"start"}
    >
        <IconButton
            position={"absolute"}
            top={0}
            right={0}
            aria-label="close update customer"
            size={"lg"}
            variant={"ghost"}
            borderRadius={"1rem"}
            onClick={() => closePetsPanel()}
            zIndex={100000}
        >
            <LuCircleX />
        </IconButton>
        <Box className="customerInfoHeader" flex={1} w="100%">
            <Box display={"flex"} flexDir={"column"} gap={"1rem"}
                justifyItems={"start"} alignItems={"start"}
                w={"100%"}
                data-state="open"
                _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                }}
                _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                }}
            >
                <Text
                    fontSize={"2xl"}
                    fontWeight={"medium"}
                    position={"relative"}
                >
                    {customer.firstName} {customer.lastName}
                    {customer.lastName.charAt(customer.lastName.length - 1) === "s"
                        ? "'"
                        : "'s"}{" "}
                    Pets
                </Text>
                {!createPetPressed ? (
                    <>
                        <Box w={"100%"} p={2} bg={{ base: "primarySurfaceL", _dark: "primary" }} rounded={"lg"}>
                            <AccordionRoot collapsible variant={"subtle"} w="100%">
                                {pets.map((item, index) => (
                                    <AccordionItem key={index} value={item.name}>
                                        <AccordionItemTrigger>{item.name} - {item.breed}</AccordionItemTrigger>
                                        <AccordionItemContent>size: {item.size}</AccordionItemContent>
                                        <AccordionItemContent>
                                            <Textarea
                                            placeholder="Preferred services and cut: &#10;&#10;Behavioral notes, special handling instructions:"
                                            minH={"8lh"}
                                            maxH={"15lh"}
                                            value={item.notes} onChange={e => setFirstName(e.target.value)}
                                            >
                                            </Textarea>
                                        </AccordionItemContent>
                                    </AccordionItem>
                                ))}
                            </AccordionRoot>
                        </Box>
                        <HStack justify={"space-between"} w="100%">
                            <Button variant={"surface"}>Link Customers</Button>
                            <Button onClick={() => setCreatePetPressed(true)} variant={"surface"}>Add Pet</Button>
                        </HStack>
                    </>
                ) : (
                    <CreatePet customer={customer} setCreatePetPressed={handleBack} onPetCreated={() => { setCreatePetPressed(false); reloadPets(); }} />
                )}
            </Box>
        </Box>
    </Box>
);
}
export default PetListDisplay;
