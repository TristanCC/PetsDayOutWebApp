"use client"

import { Kbd, Table } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@/components/ui/action-bar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

// Updated handleClickCustomer function
const handleClickCustomer = (customer) => {
  // You can add functionality here if needed for customer row click
}

const Demo = ({ customers, theme, preferredColors }) => {
  const [selection, setSelection] = useState([])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < customers.length

  const rows = customers.map((customer) => (
    <Table.Row
      key={customer.id}
      data-selected={selection.includes(customer.id) ? "" : undefined}
      className="tableRow"
      onClick={() => handleClickCustomer(customer)}
    >
      <Table.Cell>
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
      </Table.Cell>
      <Table.Cell>{customer.firstName} {customer.middleName ? customer.middleName[0] + '.' : ""} {customer.lastName}</Table.Cell>
      <Table.Cell>{customer.phoneNumber}</Table.Cell>
      {/* <Table.Cell className="email">{customer.email ? customer.email : "N/A"}</Table.Cell> */}
      <Table.Cell>{customer.numberOfPets ?? "N/A"}</Table.Cell>
      <Table.Cell className="">
        <Button variant="outline" size="sm" w="1">☰</Button>
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <div className="table">
      <Table.Root interactive >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox className="checkbox"
                variant="subtle"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? customers.map((customer) => customer.id) : []
                  )
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
            {/* <Table.ColumnHeader>Email</Table.ColumnHeader> */}
            <Table.ColumnHeader>Number of Pets</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>

      </Table.Root>

      <ActionBarRoot open={hasSelection} className="actionBar">
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete <Kbd>⌫</Kbd>
          </Button>
          <Button variant="outline" size="sm">
            Share <Kbd>T</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
      <Button mt="5" className="addCustomerButton" pos="relative" bottom="0" variant="surface">
          Create Customer
        </Button>
    </div>
  )
}

export default Demo
