import { Box, Button, IconButton, HStack } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { GiSniffingDog } from "react-icons/gi";
import { LuCircleX } from "react-icons/lu";
import CreatePet from "./CreatePet";

const EmptyStateComponent = ({ createPetPressed, setCreatePetPressed, setShowEmptyState, closePetsPanel, customer, handleBack, reloadPets }) => (
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
                data-state="open"
                _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                }}
                _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                }}
                icon={<Box fontSize={"3.5rem"}><GiSniffingDog/></Box>}
                title={`Start tracking pets!`}
                description={`No pets are being tracked for ${customer.firstName} yet.
                You can either create a new pet or link customers together (for pets already in the system).`}
            >
                <HStack>
                    <Button>Link Customers</Button>
                    <Button onClick={() => { setCreatePetPressed(true); setShowEmptyState(false); }}>Create Pet</Button>
                </HStack>
            </EmptyState>
        ) : (
            <CreatePet customer={customer} onPetCreated={() => { setCreatePetPressed(false); reloadPets(); }} setCreatePetPressed={handleBack} />
        )}
    </Box>
);

export default EmptyStateComponent;
