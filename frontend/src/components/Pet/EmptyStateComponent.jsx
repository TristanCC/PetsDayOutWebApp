import { Box, Button, IconButton, HStack, Input, Text } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { GiSniffingDog } from "react-icons/gi";
import { LuCircleX } from "react-icons/lu";
import CreatePet from "./CreatePet";

import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import { useState } from "react"
  import { withMask } from "use-mask-input"
  

import useLinkCustomers from "./useLinkCustomers";

const EmptyStateComponent = ({ createPetPressed, setCreatePetPressed, setShowEmptyState, closePetsPanel, customer, handleBack, reloadPets,
   preferredColors, didLinkCustomer, setDidLinkCustomer }) => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const { searchResults, handleSearch } = useLinkCustomers(didLinkCustomer, setDidLinkCustomer, reloadPets);
    return (
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
                <PopoverRoot>
  <PopoverTrigger asChild>
    <Button variant="solid" disabled={didLinkCustomer || customer.groupID}>
      Link to Household
    </Button>
  </PopoverTrigger>
  <PopoverContent colorPalette={preferredColors}>
    <PopoverArrow />
    <PopoverBody colorPalette={preferredColors}>
      <PopoverTitle fontSize={"md"} fontWeight="small">
        Linking to a Household
      </PopoverTitle>
      <Text my={2} fontSize="sm" color="gray.600" mb={2}>
        Search for the phone number of another customer to add to or create a new household.
      </Text>
      <Input
        my={2}
        fontSize={"md"}
        placeholder="(999) 999-9999"
        ref={withMask("(999) 999-9999")}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button
        disabled={phoneNumber.replace(/\D/g, "").length < 10}
        variant={"solid"}
        width={"100%"}
        onClick={() => handleSearch(customer, phoneNumber)}
      >
        Link
      </Button>
      {searchResults && searchResults.length > 0 ? (
        <Box mt={3} p={2} borderRadius="md">
          <Text fontSize="md" fontWeight="sm" color={"green.400"}>
            Matching Household found. Linking...
          </Text>
        </Box>
      ) : searchResults ? (
        <Text mt={2} fontSize="sm" color="red.500">
          No matching household found.
        </Text>
      ) : null}
    </PopoverBody>
  </PopoverContent>
  </PopoverRoot>
                    <Button onClick={() => { setCreatePetPressed(true); setShowEmptyState(false); }}>Create Pet</Button>
                </HStack>
            </EmptyState>
        ) : (
            <CreatePet customer={customer} onPetCreated={() => { setCreatePetPressed(false); reloadPets(); }} setCreatePetPressed={handleBack} />
        )}
    </Box>
    )
};

export default EmptyStateComponent;
