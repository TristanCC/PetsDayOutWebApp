import { useEffect, useState } from "react";
import { Box, Button, Input, IconButton, Text, HStack, Textarea, VStack, Card, Image } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react"
import { LuCircleX } from "react-icons/lu";
import CreatePet from "./CreatePet2";
import { Separator } from "@chakra-ui/react";
import SearchPopup from "../SearchPopup";
import { LuTrash2 } from "react-icons/lu";
import placeholderAvatar from "../../assets/Dogavi.png"
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { LuFolderClock } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";


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

import Records from "../Present/Records";
import { useCustomers } from "../context/CustomerContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const PetListDisplay = ({ pets, setPets, createPetPressed, setCreatePetPressed, closePetsPanel, customer,
   handleBack, reloadPets, preferredColors, didLinkCustomer, setDidLinkCustomer }) => {
    const [hasGroup, setHasGroup] = useState(false)
    const [petToEdit, setPetToEdit] = useState({})
    const [phoneNumber, setPhoneNumber] = useState("");
    const [open, setOpen] = useState(false)
    const [recordsOpen, setRecordsOpen] = useState(false)
    const [selectedPet, setSelectedPet] = useState({})
    
    const { searchResults, handleSearch } = useLinkCustomers(didLinkCustomer, setDidLinkCustomer, reloadPets);
    const { updateCustomerInState } = useCustomers()
    
// In PetListDisplay.jsx
const handleDeletion = async (petID) => {
  // Optimistically update
  const updatedCustomer = {
    ...customer,
    pets: customer.pets.filter(p => p.id !== petID)
  };
  updateCustomerInState(updatedCustomer);

  try {
    await fetch(`${BACKEND_URL}/db/deletePet/${petID}`, { method: "DELETE" });
  } catch (error) {
    // Rollback on error
    updateCustomerInState(customer);
  }
};

    const handleRecords = (pet) => {
      setSelectedPet(pet)
      setRecordsOpen(true)
    }

    return (
    <Box
      visibility={recordsOpen ? "hidden" : "visible"}
      bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
      borderRadius={"1rem"}
      p={4}
      w={!createPetPressed ? { base: "90vw", md: "80vw", lg: "800px" } : { base: "90vw", md: "50vw", lg: "370px" }}
      minW={"350px"}
      
      maxH={"80vh"}
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
            recordsOpen ? (
              <Box visibility={recordsOpen ? "visible" : "hidden"}>
                <Records selectedPet={selectedPet} preferredColors={preferredColors} setRecordsOpen={setRecordsOpen}/>
              </Box>
            ) :
            <>
                <Box  w={"100%"} p={4} bg={{ base: "primaryMidpointL", _dark: "primaryMidpoint" }} rounded={"lg"}>
                <HStack gap={4} w="100%" flexWrap="wrap" justify="center" justifyItems={"center"}>

                  {pets.map((item, index) => (
                    <Card.Root key={index} w="300px" variant={"outline"} bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}>
                      <Card.Body p={4}>
                        <VStack>
                          
                          <HStack alignItems={"center"} w={"100%"} justify={"space-between"}>
                            
                          <Avatar.Root shape="rounded" size="2xl">
                              <Avatar.Fallback name={item.name} />
                              <Avatar.Image src={item.photoUrl} />
                            </Avatar.Root>
                            <VStack align={"start"} flex={1}>
                              <Text fontSize="2xl" fontWeight="light"><HStack>{item.name} {item.sex === "male" ? <BsGenderMale/> : <BsGenderFemale/>} </HStack></Text>
                              <Text fontSize="lg" fontWeight="light">{item.breed} {item.size == "small" ? "(sm)" : item.size == "medium" ? "(md)" : "(lg)"}</Text>
                            </VStack>

                            </HStack>
                            <Textarea
                            variant={"subtle"}
                            bg={{ base: "primaryMidpointL", _dark: "primaryMidpoint" }} 
                              readOnly
                              resize={"none"}
                              placeholder="Preferred services and cut:&#10;Behavioral notes, special handling instructions:"
                              minH={"4lh"}
                              value={item.notes}
                              rounded={"sm"}
                            />
                            <HStack justify={"center"} align={"center"} mt={2} justifyItems={"center"} w={"full"} h={"100%"}>
                              <Button w={"100%"} variant={"ghost"} colorPalette={"red"} flex={"1 1 0"}
                              onClick={() => handleDeletion(item.id)}><LuTrash2 /></Button>
                              <Separator display={"block"} alignSelf={"center"} justifyContent={"center"} justifySelf={"center"}  h={"2rem"} variant={"solid"} orientation={"vertical"} />
                              <Button w={"100%"} variant={"ghost"} flex={"3 1 0"}
                              onClick={() => {handleRecords(item);}}><LuFolderClock/></Button>
                              <Button w={"100%"} variant={"ghost"}  flex={"3 1 0"}
                              onClick={() => {setCreatePetPressed(true); setPetToEdit(item)}}><FaRegEdit/></Button>
                            </HStack>
                            
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </HStack>
                </Box>
                <HStack justify={"center"}   w="100%" mt={"1rem"}>
                <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
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
                  <Button onClick={() => { setCreatePetPressed(true); setPetToEdit(null); }} variant={"ghost"}>+ Add Pet</Button>
                </HStack>
            </>
            
          ) : (
<CreatePet 
  customer={customer}
  setCreatePetPressed={handleBack}
  onPetCreated={() => {
    setCreatePetPressed(false);
    reloadPets(); // Simply refresh the pet list
  }}
  petToEdit={petToEdit}
  setPetToEdit={setPetToEdit}
/>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PetListDisplay;