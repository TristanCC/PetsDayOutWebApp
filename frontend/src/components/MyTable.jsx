"use client"

import { Box, Table, Text, Button, Flex } from "@chakra-ui/react"
import { EmptyState, List, VStack, HStack, IconButton } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"
import { useState, useEffect, useRef } from "react"
import MenuRoot1 from "./MenuRoot1"
import { motion } from "framer-motion";
import { Box as ChakraBox } from "@chakra-ui/react";
import CreateCustomer from "./CreateCustomer"
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const MyTable = ({
  selectedCustomer,
  setSelectedCustomer,
  customers,
  preferredColors,
  updateCustomerInState,
  deleteCustomerInState,
  limit,
  offset,
  setOffset,
  searchResults,
}) => {
  
  const MotionBox = motion(ChakraBox);
  const [selection, setSelection] = useState([])
  const scrollRef = useRef(null)
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)

  const handleAddCustomer = () => {
    setAddCustomerOpen(!addCustomerOpen)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [customers, searchResults])

  const isSearchActive = searchResults !== null
  const validSearchResults = isSearchActive && Array.isArray(searchResults) ? searchResults : []

  const emptyResults = (
    <Box display={"flex"} position={"absolute"} w={"100%"}>
      <EmptyState.Root>
        <EmptyState.Content mt={"5rem"}>
          <EmptyState.Indicator>
            <HiColorSwatch size={32} />
          </EmptyState.Indicator>
          <VStack textAlign="center" spacing={3}>
            <EmptyState.Title>No results found</EmptyState.Title>
            <EmptyState.Description>Try adjusting your search or adding a new customer.</EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </Box>
  )

  const renderRows = (data) =>
    data.map((customer) => (
      <Table.Row
        key={customer.id}
        data-selected={selection.includes(customer.id) ? "" : undefined}
        className="tableRow"
        bg={{ base: "white", _dark: "primary" }}
        w={"100%"}
      >
        <Table.Cell>
          <Text fontWeight={"medium"} zIndex={200} pos={"relative"}>
            {customer.firstName} {customer.middleName ? customer.middleName[0] + "." : ""} {customer.lastName}
          </Text>
        </Table.Cell>
        <Table.Cell>
          <Text zIndex={200} pos={"relative"} fontWeight={"inherit"}>
            {`(${customer.phoneNumber.slice(0, 3)}) ${customer.phoneNumber.slice(3, 6)}-${customer.phoneNumber.slice(6, 10)}`}
          </Text>
        </Table.Cell>
        <Table.Cell className="email">
          <Text zIndex={200} pos={"relative"}>
            {customer.email ?? ""}
          </Text>
        </Table.Cell>
        <Table.Cell zIndex={200}>
          <MenuRoot1
            customer={customer}
            preferredColors={preferredColors}
            setSelectedCustomer={setSelectedCustomer}
            updateCustomerInState={updateCustomerInState}
            deleteCustomerInState={deleteCustomerInState}
          />
        </Table.Cell>
      </Table.Row>
    ))

  let tableBodyContent = null
  if (isSearchActive) {
    tableBodyContent = validSearchResults.length > 0 ? renderRows(validSearchResults) : emptyResults
  } else {
    tableBodyContent = customers.length > 0 ? renderRows(customers) : emptyResults
  }

  return (
    <Flex 
      direction="column" 
      height="100%"
      position="relative"
      w={"100%"}
    >
      <MotionBox 
        className="table" 
        ref={scrollRef} 
        initial={{ opacity: 0, y: "20px"}}
        animate={{ opacity: 1, y: 0 }}
        w={"100%"} 
        flex="1"
        overflow="auto"
      >
        <Table.Root interactive stickyHeader striped scrollBehavior={"smooth"} overflow={"hidden"}>
          <Table.Header bg={{ base: "white", _dark: "primary" }}>
            <Table.Row alignItems={"center"} bg={{ base: "white", _dark: "primaryMidpoint" }}>
              <Table.ColumnHeader className="columnHeader">
                <Text>Name</Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader className="columnHeader">
                <Text>Phone Number</Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader className="columnHeader email">
                <Text>Email</Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader w={"6"} className="columnHeader" />
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableBodyContent}</Table.Body>
        </Table.Root>
      </MotionBox>

      {/* Fixed controls at the bottom */}
      <Box 
        position="sticky"
    rounded={"lg"}
    w={"100%"}
    alignSelf={"center"}
        bottom="0"
        bg={{ base: "white", _dark: "primary" }}
        p={4}
       
        borderColor={{ base: "gray.100", _dark: "gray.700" }}
        zIndex={1}
      >
        {!isSearchActive && (
          <HStack justify={"space-between"} align={"center"} w="full">
            <IconButton
              ml={"1rem"}
              variant={"ghost"}
              onClick={() => setOffset((prevOffset) => Math.max(prevOffset - limit, 0))}
              disabled={offset === 0}
            >
              	<FaArrowLeft/>
            </IconButton>
            <Button variant="ghost" onClick={handleAddCustomer}>
              Add Customer
            </Button>
            <IconButton
              mr={"1rem"}
              variant={"ghost"}
              onClick={() => setOffset((prevOffset) => prevOffset + limit)}
              disabled={customers.length < limit}
            >
              	<FaArrowRight/>
            </IconButton>
          </HStack>
        )}
      </Box>

      {addCustomerOpen && (
        <Box pos={"fixed"} zIndex={9999} left={0} right={0} margin={"auto"} top={0} bottom={0} justifySelf={"center"} alignSelf={"center"}>
          <CreateCustomer setCustomerInfoOpen={setAddCustomerOpen}/>
        </Box>
      )}
    </Flex>
  )
}

export default MyTable