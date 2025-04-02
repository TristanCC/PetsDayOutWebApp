import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box as ChakraBox } from "@chakra-ui/react";
import { LuHouse } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";

import { FaRegEdit } from "react-icons/fa";
import {
  Button,
  Input,
  IconButton,
  HStack,
  Box,
  Text,
  VStack,
  useBreakpointValue,
  Icon
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import { Separator } from "@chakra-ui/react";
import { withMask } from "use-mask-input";

import LoadingState from "./Pet/LoadingState";
import { Spinner } from "@chakra-ui/react";

const Household = ({ customer, closeHouseholdPanel, preferredColors }) => {
  const MotionBox = motion(ChakraBox);

  const [loading, setLoading] = useState(false);
  const [groupID, setGroupID] = useState(customer.groupID);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [householdPets, setHouseholdPets] = useState([]);

  const handleOwnerDelete = async () => {

    // handle case where 
    try {
        const response = await fetch('/db/deleteOwner')
    } catch (error) {
        console.error("error deleting owner", error)
    }
  }

  useEffect(() => {
    // on mount get data from /db/getHousehold route
    const fetchHouseholdMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/db/getHousehold/${groupID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHouseholdMembers(data.groupMembers);
        setHouseholdPets(data.groupPets);
        setLoading(false);
      } catch (error) {
        console.error("error fetching household", error);
      }
    };
    fetchHouseholdMembers();
  }, [groupID]);

  const renderHousehold = (data) => {
    return data.map((member) => {
      return (
        <HStack key={member.id} w="100%" justify="space-between" align="center">
          <Text flex="1" textAlign="start">
            {member.firstName} {member.lastName}
          </Text>
          <Text
            flex="1 0 140px" // Keeps phone number fixed width and prevents resizing
            textAlign="center"
            whiteSpace="nowrap" // Prevents text from wrapping
          >
            {`(${customer.phoneNumber.slice(0, 3)}) ${customer.phoneNumber.slice(3,6)}-${customer.phoneNumber.slice(6, 10)}`}
          </Text>
          <IconButton
            size="xs"
            aria-label="Remove"
            flexShrink={0} // Prevents button from shrinking
          >
            x
          </IconButton>
        </HStack>
      );
    });
  };
  

  const renderHouseholdPets = (data) => {
    return data.map((member) => {
      return (
        <HStack key={member.id} w={"100%"} justify={"space-between"}>
          <Text>
            {member.name} {member.breed}
          </Text>
        </HStack>
      );
    });
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="rgba(18, 18, 18, 0.5)"
      backdropFilter="blur(1px)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor={"default"}
      overflow={"auto"} // Ensure scrollable modal on smaller screens
    >
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        borderRadius="lg"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        p={6}
        boxShadow="lg"
        bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
        maxH="90vh" // Keep modal within bounds
        w={{ base: "90vw", md: "80vw", lg: "600px" }}
        overflowY="auto" // Make modal scrollable when needed
      >
        {!loading ? (
          <>
            <Box
              w="100%"
              borderRadius={"lg"}
              p={2}
              display="flex"
              gap={3}
              justifyContent="space-between"
              alignItems="center"
              colorPalette={"red"}
            >
            <HStack gap={".5rem"}>
                              <IconButton variant={"plain"}
                               pointerEvents={"none"}
                                scale={"125%"}
                               colorPalette={preferredColors}>
                                
                                <LuHouse/>
                                
                              </IconButton>
                  <Text fontSize="2xl" fontWeight="medium">
                    Household
                  </Text>
            </HStack>
              <IconButton
                aria-label="Close"
                size="lg"
                variant="ghost"
                rounded={"1"}
                padding={0}
                onClick={() => closeHouseholdPanel()}
              >
                <LuCircleX />
              </IconButton>
            </Box>

            <VStack
              maxH="80vh" // Ensures scroll inside the content area
              w="100%"
              align="stretch"
              spacing={4}
              overflowY="auto"
            >
              <Separator mb={4} w={"80%"} alignSelf={"start"} />

              <HStack
                gap={4}
                flexWrap="wrap"
                w="100%"
                align="stretch"
                flexDir={{ base: "column", md: "row" }} 
              >
                <VStack
                  w={{ base: "100%", md: "calc(50% - 1rem)" }}
                  bg={{ base: "primarySurfaceL", _dark: "primary" }}
                  p="1rem"
                  align="start"
                  rounded="md"
                  flex="2 1 0"
                >

                  <Text>Owners:</Text>
                  <Separator mb={2} w="80%" alignSelf="start" />
                  {householdMembers?.length > 0 &&
                    renderHousehold(householdMembers)}
                </VStack>

                <VStack
                  w={{ base: "100%", md: "calc(50% - 1rem)" }}
                  bg={{ base: "primarySurfaceL", _dark: "primary" }}
                  p="1rem"
                  align="start"
                  rounded="md"
                  flex={"1 1 0"}
                >
                  <Text>Pets:</Text>
                  <Separator mb={2} w="80%" alignSelf="start" />
                  {householdPets?.length > 0 &&
                    renderHouseholdPets(householdPets)}
                </VStack>
              </HStack>
            </VStack>
          </>
        ) : (
          <HStack justifyContent="center" justifyItems="center">
            <Spinner />
            <LoadingState loadingText="Fetching Household..." />
          </HStack>
        )}
      </MotionBox>
    </Box>
  );
};

export default Household;
