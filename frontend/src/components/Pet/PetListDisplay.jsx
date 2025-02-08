import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import CreatePet from "./CreatePet";

const PetListDisplay = ({ pets, createPetPressed, setCreatePetPressed, closePetsPanel, customer, handleBack, reloadPets }) => (
    <Box
        bg={{ base: "primaryDarkL", _dark: "primarySurface" }}
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
            <div className="customerInfoHeader">
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
                    <AccordionRoot multiple variant={"enclosed"} bg={{ base: "primaryDarkL", _dark: "primarySurface" }}>
                        {pets.map((item, index) => (
                            <AccordionItem key={index} value={item.name}>
                                <AccordionItemTrigger>{item.name}</AccordionItemTrigger>
                                <AccordionItemContent>{item.breed}</AccordionItemContent>
                                <AccordionItemContent>{item.size}</AccordionItemContent>
                            </AccordionItem>
                        ))}
                    </AccordionRoot>
                    <Button>Link Customers</Button>
                    <Button onClick={() => setCreatePetPressed(true)}>Add Pet</Button>
                </Box>
            </div>
        ) : (
            <CreatePet customer={customer} setCreatePetPressed={handleBack} onPetCreated={() => { setCreatePetPressed(false); reloadPets(); }} />
        )}
    </Box>
);

export default PetListDisplay;
