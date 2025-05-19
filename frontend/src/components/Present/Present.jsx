import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox, Icon } from "@chakra-ui/react";
import { Popover, Portal } from "@chakra-ui/react"
import { motion, wrap } from "framer-motion";
import LoadingState from "../Pet/LoadingState";

import { LuFolderClock } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { LuArchive } from "react-icons/lu";
import { PiDog, PiDogBold } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { Toaster, toaster } from "@/components/ui/toaster"
import { EmptyState } from "@chakra-ui/react"
import { GiPartyPopper } from "react-icons/gi";

import Records from "./Records";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Present = ({ value, preferredColors, present, setPresent }) => {
    const [loading, setLoading] = useState(false);
    const [completePets, setCompletePets] = useState([])
    const [recordsOpen, setRecordsOpen] = useState(false)
    const [selectedPet, setSelectedPet] = useState({})
    const [openPopoverId, setOpenPopoverId] = useState(null) // Track which popover is open

    const MotionBox = motion(Box);

    const handleEndDay = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/db/archivePresentCustomers`, {
          method: "PATCH",
        });
    
        if (!response.ok) throw new Error("Failed to archive customers");
    
        setPresent([]);
        toaster.create({
          title: "Day completed!",
          type: "success"
        })
        
        console.log("Day ended successfully, all customers archived");
    
      } catch (error) {
        console.error("Error archiving present customers", error);
      }
    };

    const handleRecords = (pet) => {
      setOpenPopoverId(null); // Close the popover when opening records
      setRecordsOpen(!recordsOpen)
      setSelectedPet(pet)
    }
    
    const handlePopoverToggle = (petId, isOpen) => {
      setOpenPopoverId(isOpen ? petId : null);
    }

    useEffect(() => {
        const fetchPresent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/db/getPresent`);
                if (!response.ok) throw new Error("Network error");
                const data = await response.json();
                setPresent(data || []); 
                console.log(present)
            } catch (error) {
                console.error("Error fetching present customers:", error);
                setPresent([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPresent();
    }, [value]);

    const markPetComplete = useCallback(async (petId) => {
      try {
        const res = await fetch('/db/togglePetComplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ petID: petId })
        });
        if (!res.ok) throw new Error('Network error');
      
        const { record } = await res.json();
      
        setPresent(prev =>
          prev.map(customer => ({
            ...customer,
            pets: customer.pets.map(p =>
              p.id === petId
                ? { ...p, completed: record.completed }
                : p
            )
          }))
        );
      } catch (err) {
        console.error('Failed to toggle complete:', err);
      }
    }, [setPresent]);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (openPopoverId && !e.target.closest('[data-popover]')) {
          setOpenPopoverId(null);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openPopoverId]);

    return (
      <VStack w={"100%"} h={"100%"}  overflowY="auto" rounded={"md"} bg={{ base: "primaryL", _dark: "primaryMidpoint" }} display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"} m={"1rem"} position={"relative"}>
          {loading ? (
              <HStack justifyContent="center" justifyItems="center">
                <Spinner />
                <LoadingState loadingText="Fetching Present..." />
              </HStack>
          ) : (
            <VStack w={"100%"} gap={4} p={4} alignItems={"self-end"}>
              {present && present.length > 0 ? present.map((customer) => {
                if (!customer || !customer.customer || !customer.pets) return null;
                
                const allComplete = customer.pets.every(p => p.completed);
                
                return (
                <Box
                  key={customer.customer.id}
                  w="100%"
                  bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
                  p={4}
                  rounded="lg"
                  position="relative"
                  boxShadow="md"
                  transition="all 0.2s"
                  _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
                >
                  <VStack gap={1} align={"start"} mb={"1rem"}>
                    <HStack w={"70%"}>
                      <Box w={"100%"}>
                        <HStack align={"start"}>
                          <HStack wrap={"wrap"} w={"100%"} align={"start"} justify={"start"} alignItems={"end"}>
                            <Text fontSize="lg" fontWeight="medium">
                              {customer.customer.firstName} {customer.customer.lastName}
                            </Text>
                            <Text>
                            {customer.customer.phoneNumber && `(${customer.customer.phoneNumber.slice(0,3)}) ${customer.customer.phoneNumber.slice(3,6)}-${customer.customer.phoneNumber.slice(6,10)}`}
                            </Text>
                          </HStack>
                            {allComplete ? (
                              <MotionBox
                              boxSize={4}
                              bg={allComplete ? "green.500" : "yellow.500"}
                              borderRadius="full"
                              position="absolute"
                              top="1rem"
                              right="1rem"
                              boxShadow="0px 0px 5px rgb(40, 229, 40)"
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.8, 1, 0.8],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            
                          ) :
                          <MotionBox
                          boxSize={4}
                          bg={allComplete ? "green.500" : "yellow.500"}
                          borderRadius="full"
                          position="absolute"
                          top="1rem"
                          right="1rem"
                          boxShadow="0 0px 5px orange"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                          }
  
                        </HStack>
                      </Box>
                    </HStack>
                    <Separator w={"100%"} mt={0}/>
                  </VStack>
              
                  <HStack wrap="wrap">
                    {customer.pets.map((pet) => (
                        pet && 
<Popover.Root 
  key={pet.id} 
  open={openPopoverId === pet.id}
  onOpenChange={(isOpen) => handlePopoverToggle(pet.id, isOpen)}
  closeOnInteractOutside={true}
  closeOnEsc={true}
>
  <Popover.Trigger>
    <Box
      as="button"
      position="relative"
      px={"1rem"}
      py={1}
      bg={{ base: "primaryMidpointL", _dark: "primaryMidpoint" }}
      opacity={pet.completed ? 0.5 : 1}
      cursor="pointer"
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
      borderRadius={".5rem"}
    >
      <HStack>
        <Icon as={FaCircle}
          boxSize={4}
          color={pet.completed ? "green.500" : "yellow.500"}
          position="absolute"
          top={0}
          right={0}
          scale={.5}
        />
        <Text>{pet.name} ({pet.breed})</Text>
      </HStack>
    </Box>
  </Popover.Trigger>
                        <Portal>
                          <Popover.Positioner>
                            <Popover.Content w={"100%"} rounded={"lg"} bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}>
                              
                              <Popover.Body p={"1rem"} >
                              <HStack wrap={"wrap"} maxW={"33vw"} flex={1}>
                              <Button variant={"subtle"} flex={"min-content"} bg={{ base: "primaryMidpointL", _dark: "primaryMidpoint" }} _hover={{ bg: {base: "primaryL", _dark: "primary"}}} onClick={() => {
                                markPetComplete(pet.id);
                                setOpenPopoverId(null); // Close after clicking
                              }}>              
                                <HStack justify={"flex-start"} w={"100%"}>
                                  <Icon fontSize={"1.25rem"} color={"green.500"}>
                                    <LuCheck />
                                  </Icon>
                                  <Text>{"Complete"}</Text>
                                </HStack>
                              </Button>
                              <Button variant={"subtle"} flex={"min-content"} bg={{ base: "primaryMidpointL", _dark: "primaryMidpoint" }} _hover={{ bg: {base: "primaryL", _dark: "primary"}}} onClick={() => handleRecords(pet)}> 
                                  <HStack justify={"flex-start"} w={"100%"}>
                                    <Icon fontSize={"1.25rem"} color={"purple.500"}>
                                      <LuFolderClock />
                                    </Icon>
                                    <Text>Records</Text>
                                  </HStack>
                              </Button>
                              </HStack>
                              </Popover.Body>
                            </Popover.Content>
                          </Popover.Positioner>
                        </Portal>
                      </Popover.Root>
                    ))}
                  </HStack>
                </Box>
              )}) : 
              <EmptyState.Root>
                <EmptyState.Content>
                  <EmptyState.Indicator> <GiPartyPopper/> </EmptyState.Indicator>
                  <EmptyState.Title >No more pets!</EmptyState.Title>
                  <EmptyState.Description mt={-3} textAlign={"center"} justifySelf={"center"} >Enjoy the rest of your day or mark some pets present.</EmptyState.Description>
                </EmptyState.Content>
              </EmptyState.Root>}
              <Button position={"relative"} m={"1rem"} visibility={present? present.length >= 1 ? "visible" : "hidden" : "hidden"} onClick={() => handleEndDay()}>End Day</Button>

            </VStack>
          )}
          {recordsOpen && (
            <Records selectedPet={selectedPet} preferredColors={preferredColors} setRecordsOpen={setRecordsOpen}/>
          )}
      </VStack>
  );
};

export default Present;