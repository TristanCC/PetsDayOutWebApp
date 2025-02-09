"use client"

import { Box, Kbd, Table, Theme, Text, Button } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@/components/ui/action-bar"

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"


import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import MenuRoot1 from "./MenuRoot1"
import CreateCustomer from "./CreateCustomer"

const MyTable = ({ selectedCustomer, setSelectedCustomer, customers, preferredColors, updateCustomerInState,
   deleteCustomerInState, limit, offset, setOffset, searchResults }) => {
  const [selection, setSelection] = useState([])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < customers.length

  // Ensure searchResults is an array
  const validSearchResults = Array.isArray(searchResults) ? searchResults : [];

  const rows = customers.map((customer) => (
    <Table.Row
      key={customer.id}
      data-selected={selection.includes(customer.id) ? "" : undefined}
      className="tableRow"
      bg={{ base: "white", _dark: "primary" }}
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
      {/* <Table.Cell>
        <Checkbox className="checkbox"
        variant="subtle"
          aria-label="Select row"
          checked={selection.includes(customer.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, customer.id]
                : selection.filter((id) => id !== customer.id)
            )
          }}
        />
      </Table.Cell> */}
      <Table.Cell className=""><Text zIndex={200} pos={"relative"}>{customer.firstName} {customer.middleName ? customer.middleName[0] + '.' : ""} {customer.lastName}</Text></Table.Cell>
      <Table.Cell className=""><Text zIndex={200} pos={"relative"}>{customer.phoneNumber}</Text></Table.Cell>
      <Table.Cell className="email"><Text zIndex={200} pos={"relative"}>{customer.email ?? "N/A"}</Text></Table.Cell>
      <Table.Cell className="" zIndex={200}>
        <MenuRoot1 customer={customer} preferredColors={preferredColors} setSelectedCustomer={setSelectedCustomer}
        updateCustomerInState={updateCustomerInState} deleteCustomerInState={deleteCustomerInState} />
      </Table.Cell>
    </Table.Row>
  ))

  const searchRows = validSearchResults.map((customer) => (
    <Table.Row
      key={customer.id}
      data-selected={selection.includes(customer.id) ? "" : undefined}
      className="tableRow"
      bg={{ base: "white", _dark: "primary" }}
      w={"100%"}
      
    >
      {/* <Table.Cell>
        <Checkbox className="checkbox"
        variant="subtle"
          aria-label="Select row"
          checked={selection.includes(customer.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, customer.id]
                : selection.filter((id) => id !== customer.id)
            )
          }}
        />
      </Table.Cell> */}
      <Table.Cell className=""><Text zIndex={200} pos={"relative"}>{customer.firstName} {customer.middleName ? customer.middleName[0] + '.' : ""} {customer.lastName}</Text></Table.Cell>
      <Table.Cell className=""><Text zIndex={200} pos={"relative"}>{customer.phoneNumber}</Text></Table.Cell>
      <Table.Cell className="email"><Text zIndex={200} pos={"relative"}>{customer.email ?? "N/A"}</Text></Table.Cell>
      <Table.Cell className="" zIndex={200}>
        <MenuRoot1 customer={customer} preferredColors={preferredColors} setSelectedCustomer={setSelectedCustomer}
        updateCustomerInState={updateCustomerInState} deleteCustomerInState={deleteCustomerInState} />
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <Box className="table">
      <Table.Root interactive stickyHeader striped scrollBehavior={"smooth"} overflow={"hidden"} >
        <Table.Header bg={{ base: "white", _dark: "primary" }}>
          <Table.Row alignItems={"center"} bg={{ base: "white", _dark: "primaryMidpoint" }}>
            <Table.ColumnHeader className="columnHeader"><Text>Name</Text></Table.ColumnHeader>
            <Table.ColumnHeader className="columnHeader"><Text>Phone Number</Text></Table.ColumnHeader>
            <Table.ColumnHeader className="columnHeader email"><Text>Email</Text></Table.ColumnHeader>
            <Table.ColumnHeader w={"6"} className="columnHeader"/>
          </Table.Row>
        </Table.Header>
        <Table.Body >
          {validSearchResults.length > 0 ? searchRows : rows}
        </Table.Body>
      </Table.Root>
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
    </Box>
  )
}

export default MyTable

// Add the following CSS to your stylesheet or in a style tag
// .email {
//   display: table-cell;
// }
// @media (max-width: 768px) {
//   .email {
//     display: none;
//   }
// }
