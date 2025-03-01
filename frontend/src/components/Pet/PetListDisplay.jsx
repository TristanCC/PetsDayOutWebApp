import { useEffect, useState } from "react";
import { Box, Button, Input, IconButton, Text, HStack, Textarea, VStack, Card, Image } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import CreatePet from "./CreatePet2";
import { Separator } from "@chakra-ui/react";
import SearchPopup from "../SearchPopup";

import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import { withMask } from "use-mask-input"

import useLinkCustomers from "./useLinkCustomers";

const PetListDisplay = ({ pets, createPetPressed, setCreatePetPressed, closePetsPanel, customer, handleBack, reloadPets, preferredColors }) => {
    const [hasGroup, setHasGroup] = useState(false)
    const [petToEdit, setPetToEdit] = useState({})
    const { phoneNumber, setPhoneNumber, searchResults, handleSearch } = useLinkCustomers();
    

    return (
    <Box
      bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
      borderRadius={"1rem"}
      p={"2rem"}
      w={createPetPressed ? "25" : "50vw"}
      minW={"350px"}
      maxW={"1200px"}
      maxH={"90vh"}
      overflowY={"auto"}
      cursor={"radio"}
      display={"flex"}
      flexDir={"column"}
      justifyItems={"center"}
      alignItems={"start"}
    >
      <HStack w={"100%"} top={0} zIndex={9999} justify={"space-between"}>
        <Box display={!createPetPressed ? "flex" : "none"} >
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

          <Text></Text>
        </Box>
        <IconButton
          aria-label="close update customer"
          size={"lg"}
          variant={"ghost"}
          borderRadius={"1rem"}
          display={createPetPressed ? "none" : "flex"}
          onClick={() => closePetsPanel()}
          zIndex={100000}
        >
          <LuCircleX />
        </IconButton>
      </HStack>
      <Box className="customerInfoHeader" flex={1} w="100%" >
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
          {!createPetPressed ? (
            <>
                <Box w={"100%"} p={2} bg={{ base: "primarySurfaceL", _dark: "transparent" }} rounded={"lg"}>
                <VStack gap={4} w="100%" flexDir={"row"} flexWrap={"wrap"} justifyContent={"center"}>
                  {pets.map((item, index) => (
                    <Card.Root key={index} w="350px" variant="outline">
                      <Card.Body>
                        <VStack>
                            <Text alignSelf={"start"} fontSize="lg" fontWeight="bold">{item.name}</Text>
                            <Text alignSelf={"start"}>Breed: {item.breed}</Text>
                            <Text alignSelf={"start"}>Size: {item.size}</Text>
                            <Textarea
                              readOnly
                              resize={"none"}
                              placeholder="Preferred services and cut:&#10;Behavioral notes, special handling instructions:&#10;Payment history:"
                              minH={"5lh"}
                              maxH={"15lh"}
                              value={item.notes}
                            />
                            <Button w={"100%"} variant={"outline"} mt={2}
                            onClick={() => {setCreatePetPressed(true); setPetToEdit(item)}}>Edit</Button>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </VStack>
                </Box>
                <HStack justify={"center"}  w="100%">
                <PopoverRoot>
  <PopoverTrigger asChild>
    <Button variant="surface" disabled={hasGroup}>
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
        onClick={() => handleSearch()}
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
                  <Button onClick={() => { setCreatePetPressed(true); setPetToEdit(null); }} variant={"surface"}>Add Pet</Button>
                </HStack>
            </>
            
          ) : (
            <CreatePet customer={customer} setCreatePetPressed={handleBack} onPetCreated={() => { setCreatePetPressed(false); reloadPets(); }}
             petToEdit={petToEdit} setPetToEdit={setPetToEdit}/>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PetListDisplay;
