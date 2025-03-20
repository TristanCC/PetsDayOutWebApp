import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Box as ChakraBox } from "@chakra-ui/react";

import { FaRegEdit } from "react-icons/fa";
import { Button, Input, IconButton, HStack, Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import { Separator } from "@chakra-ui/react";
import { withMask } from "use-mask-input";

import LoadingState from './Pet/LoadingState';

const Household = ({customer, closeHouseholdPanel, preferredColors}) => {

    const MotionBox = motion(ChakraBox);

    const [loading, setLoading] = useState(false)
    const [groupID, setGroupID] = useState(customer.groupID)
    const [householdMembers, setHouseholdMembers] = useState([])

    useEffect(() => {
        // on mount get data from /db/getHousehold route
        const fetchHouseholdMembers = async () => {
            try{
                setLoading(true)
                const response = await fetch(`/db/getHousehold/${groupID}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  const data = await response.json()
                  setHouseholdMembers(data)
                  setLoading(false)
                  
                
            } catch(error) {
                console.error('error fetching household', error)
            }
        }
        fetchHouseholdMembers()
    },[groupID])

    const renderHousehold = (data) => {
        return data.map((member) => {
            return (
                <Box key={member.id}>
                    <Text>{member.firstName}</Text>
                </Box>
            )
        })
    }
    

    return (
                <Box
                    
                    position="fixed"
                    top={0}
                    left={0}
                    bottom={0}
                    w="100vw"
                    h="100vh"
                    bg="rgba(18, 18, 18, 0.5)"
                    backdropFilter="blur(1px)"
                    zIndex={1000}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    margin={"auto"}
                >
<MotionBox
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    borderRadius="lg"
    display={"flex"}
    flexDir={"column"}
    justifyContent={"center"}
    alignContent={"center"}
    alignItems={"center"}
    p={6}
    boxShadow="lg"
    position="fixed"
    bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
>
    {!loading ? (
        <>
            <Box
                minW={"259px"}
                maxW={"400px"}
                w="100%"
                borderRadius={"lg"}
                p={2}
                py={0}
                display={"flex"}
                gap={"3"}
                lineHeight={"2rem"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Text fontSize="2xl" fontWeight="medium">
                    Household
                </Text>
                <IconButton
                    aria-label="Close"
                    size="xl"
                    variant="ghost"
                    rounded={"1"}
                    padding={0}
                    onClick={() => closeHouseholdPanel()}
                >
                    <LuCircleX />
                </IconButton>
            </Box>
            <Separator mb={4} w={"80%"} alignSelf={"start"} />
            {householdMembers?.length > 0 && renderHousehold(householdMembers)}
        </>
    ) : (
        <LoadingState loadingText={"Fetching Household..."} />
    )}
</MotionBox>

                </Box>
    )
}

export default Household