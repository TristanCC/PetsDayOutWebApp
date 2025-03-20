"use client"

import { Box, Table, Text, Button } from "@chakra-ui/react"
import { EmptyState, List, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"
import { useState, useEffect, useRef } from "react"
import MenuRoot1 from "./MenuRoot1"
import { motion } from "framer-motion";
import { Box as ChakraBox } from "@chakra-ui/react";
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
  searchResults, // will be null when no search is active, otherwise an array (empty or with data)
}) => {
  
  const MotionBox = motion(ChakraBox);

  const [selection, setSelection] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [customers, searchResults])

  // Check if we are in search mode by testing for null.
  const isSearchActive = searchResults !== null

  // Ensure validSearchResults is always an array when in search mode.
  const validSearchResults = isSearchActive && Array.isArray(searchResults) ? searchResults : []

  // Render the empty state for searches (or no customers)
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

  // Map customer rows
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
          <Text zIndex={200} pos={"relative"}>
            {`(${customer.phoneNumber.slice(0, 3)}) ${customer.phoneNumber.slice(3, 6)}-${customer.phoneNumber.slice(6, 10)}`}
          </Text>
        </Table.Cell>
        <Table.Cell className="email">
          <Text zIndex={200} pos={"relative"}>
            {customer.email ?? "N/A"}
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

  // Determine rows to display based on search mode.
  let tableBodyContent = null
  if (isSearchActive) {
    tableBodyContent = validSearchResults.length > 0 ? renderRows(validSearchResults) : emptyResults
  } else {
    tableBodyContent = customers.length > 0 ? renderRows(customers) : emptyResults
  }

  return (
    <MotionBox className="table" ref={scrollRef} 
    initial={{ opacity: 0}}
    animate={{ opacity: 1 }}>
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
      {/* Pagination Controls: only render if not in search mode */}
      {!isSearchActive && (
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            m={"1rem"}
            variant={"outline"}
            onClick={() => setOffset((prevOffset) => Math.max(prevOffset - limit, 0))}
            disabled={offset === 0}
          >
            Previous
          </Button>
          <Button
            m={"1rem"}
            variant={"outline"}
            onClick={() => setOffset((prevOffset) => prevOffset + limit)}
            disabled={customers.length < limit}
          >
            Next
          </Button>
        </Box>
      )}
    </MotionBox>
  )
}

export default MyTable
