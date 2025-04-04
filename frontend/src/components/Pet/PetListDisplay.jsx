import { useEffect, useState } from "react";
import { Box, Button, Input, IconButton, Text, HStack, Textarea, VStack, Card, Image } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react"
import { LuCircleX } from "react-icons/lu";
import CreatePet from "./CreatePet2";
import { Separator } from "@chakra-ui/react";
import SearchPopup from "../SearchPopup";
import { LuTrash2 } from "react-icons/lu";
import placeholderAvatar from "../../assets/Dogavi.png"


import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PiDogBold } from "react-icons/pi";

import { withMask } from "use-mask-input"

import useLinkCustomers from "./useLinkCustomers";
import { Dog } from "lucide-react";

const PetListDisplay = ({ pets, setPets, createPetPressed, setCreatePetPressed, closePetsPanel, customer,
   handleBack, reloadPets, preferredColors, didLinkCustomer, setDidLinkCustomer }) => {
    const [hasGroup, setHasGroup] = useState(false)
    const [petToEdit, setPetToEdit] = useState({})
    const [phoneNumber, setPhoneNumber] = useState("");
    
    const { searchResults, handleSearch } = useLinkCustomers(didLinkCustomer, setDidLinkCustomer, reloadPets);
    
    const handleDeletion = async (petID) => {
      try {
        alert(petID)
        fetch(`/db/deletePet/${petID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const newPets = 
          pets.filter((pet) => {
            return pet.id !== petID
          })
        setPets(newPets)
      } catch(error) {
        console.error("error:",error)
      }
    }

    return (
    <Box
      bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
      borderRadius={"1rem"}
      p={4}
      w={!createPetPressed ? { base: "90vw", md: "80vw", lg: "1100px" } : { base: "90vw", md: "50vw", lg: "25vw" }}
      minW={"350px"}
      
      maxH={"90vh"}
      overflowY={"auto"}
      cursor={"radio"}
      display={"flex"}
      flexDir={"column"}
      justifyItems={"center"}
      alignItems={"start"}
    >
      <HStack w={"100%"} top={0} zIndex={9999} justify={"space-between"}>
        <HStack w="100%" justifyContent="space-between" p={2}>
            <HStack>
                <IconButton 
                variant={"plain"}
                pointerEvents={"none"}
                scale={"125%"}
                colorPalette={preferredColors}>
                    <PiDogBold />
                </IconButton>
                <Text fontSize="2xl" fontWeight="medium">Pets</Text>
            </HStack>
            <IconButton aria-label="Close" size="lg" variant="ghost" onClick={() => closePetsPanel()}>
                <LuCircleX />
            </IconButton>
        </HStack>
        </HStack>
        <Separator w={"100%"} mb={"1rem"}></Separator>
      <Box className="customerInfoHeader" flex={1} w="100%">
        <Box 
          
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
                <HStack gap={4} w="100%" flexWrap="wrap" justify="center" justifyItems={"center"}>

                  {pets.map((item, index) => (
                    <Card.Root key={index} w="300px" variant="outline">
                      <Card.Body>
                        <VStack>
                          
                          <HStack align={"start"} w={"100%"} justify={"space-between"}>
                            <VStack align={"start"}>
                              <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                              <Text>{item.breed}</Text>
                              <Text>{item.size}</Text>
                            </VStack>

                            <Avatar.Root shape="full" size="2xl">
                              <Avatar.Fallback name="Segun Adebayo" />
                              <Avatar.Image src={placeholderAvatar} />
                            </Avatar.Root>

                            </HStack>
                            <Textarea
                              readOnly
                              resize={"none"}
                              placeholder="Preferred services and cut:&#10;Behavioral notes, special handling instructions:&#10;Payment history:"
                              minH={"5lh"}
                              maxH={"15lh"}
                              value={item.notes}
                            />
                            <HStack justify={"center"} w={"full"}>
                            <Button w={"100%"} variant={"ghost"} colorPalette={"red"} mt={2} flex={"1 1 0"}
                            onClick={() => handleDeletion(item.id)}><LuTrash2 /></Button>
                            <Button w={"100%"} variant={"subtle"} mt={2} flex={"3 1 0"}
                            onClick={() => {setCreatePetPressed(true); setPetToEdit(item)}}>Edit</Button>
                            </HStack>
                            
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </HStack>
                </Box>
                <HStack justify={"center"}  w="100%">
                <PopoverRoot>
  <PopoverTrigger asChild>
    <Button variant="surface" disabled={customer.groupID} display={customer.groupID ? "none" : "block"}>
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
                  <Button onClick={() => { setCreatePetPressed(true); setPetToEdit(null); }} variant={"ghost"}>Add Pet</Button>
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
