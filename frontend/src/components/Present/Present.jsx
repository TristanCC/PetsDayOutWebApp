import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox, Icon } from "@chakra-ui/react";
import { Popover, Portal } from "@chakra-ui/react"
import { motion } from "framer-motion";
import LoadingState from "../Pet/LoadingState";

import { LuFolderClock } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { LuArchive } from "react-icons/lu";
import { PiDog, PiDogBold } from "react-icons/pi";

const Present = ({ value, preferredColors }) => {
    const [present, setPresent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [completePets, setCompletePets] = useState([])

    useEffect(() => {
        const fetchPresent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/db/getPresent`);
                if (!response.ok) throw new Error("Network error");
                const data = await response.json();

                // Assuming the response contains an object with 'presentCustomers' property
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

    return (
        <Box w={"100%"} display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"} m={"1rem"}>
            {loading ? (
                <HStack justifyContent="center" justifyItems="center">
                  <Spinner />
                  <LoadingState loadingText="Fetching Present..." />
                </HStack>
            ) : (
              <VStack w={"100%"} spacing={4}>
                <Button position={"absolute"} bottom={0} right={0} m={"2rem"}>End Day</Button>
                {present.map((customer) => (
                  <Box
                    key={customer.customer.id}
                    w="100%"
                    bg={{ base: "white", _dark: "primary" }}
                    p={4}
                    rounded="lg"
                    boxShadow="md"
                    transition="all 0.2s"
                    _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
                  >
                    <VStack gap={1} align={"start"} mb={"1rem"}>
                      <HStack>
                        <Box w={"100%"}>
                          <HStack align={"start"}>
                            <Text fontSize="lg" fontWeight="medium">
                              {customer.customer.firstName} {customer.customer.lastName}
                            </Text>
                            <Text>
                            {`(${customer.customer.phoneNumber.slice(0,3)})-${customer.customer.phoneNumber.slice(3,6)}-${customer.customer.phoneNumber.slice(6,10)}`}
                            </Text>
                          </HStack>
                        </Box>
                        {/* <Button>Info</Button> */}
                      </HStack>
                      <Separator w={"100%"} mt={0}/>
                    </VStack>
                
                    <HStack wrap="wrap">
                      {customer.pets.map((pet) => (
                      
                          <Popover.Root key={pet.id} >
                          <Popover.Trigger asChild>
                            <Button size={"lg"} variant="plain" p={0}>
                            <Box
                          key={pet.id}
                        
                          px={3}
                          py={1}
                         
                          colorPalette={preferredColors}
                          bg={{ base: "primaryL", _dark: "primarySurface" }}
                          borderRadius="full"
                          fontSize="sm"
                          fontWeight="medium"
                        >
                        
                          
                            <HStack>
                              <Icon><PiDogBold/></Icon> <Text>{pet.name} ({pet.breed})</Text>
                            </HStack>
                            </Box>
                            </Button>
                          </Popover.Trigger>
                          <Portal>
                            <Popover.Positioner>
                              <Popover.Content w={"100%"} rounded={"lg"}>
                                <Popover.Arrow />
                                <Popover.Body p={"1rem"}>
                                <HStack wrap={"wrap"} maxW={"33vw"} flex={1}>
                                  <Button variant={"subtle"} flex={"min-content"} >              
                                    <HStack justify={"flex-start"}  w={"100%"}>
                                      <Icon fontSize={"1.25rem"} color={"green.500"}>
                                        <LuCheck />
                                      </Icon>
                                      <Text>Complete</Text>
                                    </HStack>
                                  </Button>
                                <Button variant={"subtle"} flex={"min-content"} > 
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
                ))}
              </VStack>

            )}
        </Box>
    );
};

export default Present;

//bg={{ base: "white", _dark: "primary" }}
//bg={{ base: "white", _dark: "primaryMidpoint" }