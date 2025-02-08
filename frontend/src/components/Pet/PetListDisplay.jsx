import { Box, Button, IconButton, Text, HStack } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import CreatePet from "./CreatePet";

const PetListDisplay = ({ pets, createPetPressed, setCreatePetPressed, closePetsPanel, customer, handleBack, reloadPets }) => (
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
        {!createPetPressed ? (
            <Box className="customerInfoHeader" boxShadow={"xl"}>
                <Box display={"flex"} flexDir={"column"} gap={"1rem"}
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
                        fontSize={"xl"}
                        fontWeight={"medium"}
                        position={"relative"}
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
                    <HStack justify={"space-between"}>
                        <Button>Link Customers</Button>
                        <Button onClick={() => setCreatePetPressed(true)}>Add Pet</Button>
                    </HStack>
                </Box>
            </Box>
        ) : (
            <CreatePet customer={customer} setCreatePetPressed={handleBack} onPetCreated={() => { setCreatePetPressed(false); reloadPets(); }} />
        )}
    </Box>
);

export default PetListDisplay;
