"use client"

import { Box, Kbd, Table, Theme } from "@chakra-ui/react"
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


import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import MenuRoot1 from "./MenuRoot1"

const MyTable = ({ selectedCustomer, setSelectedCustomer, customers, preferredColors }) => {
  const [selection, setSelection] = useState([])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < customers.length

  const rows = customers.map((customer) => (
    <Table.Row
      key={customer.id}
      data-selected={selection.includes(customer.id) ? "" : undefined}
      className="tableRow"
      paddingBlock={"0"}
      onClick={() => {setSelectedCustomer(customer)}}
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
      <Table.Cell className="tableRow">{customer.firstName} {customer.middleName ? customer.middleName[0] + '.' : ""} {customer.lastName}</Table.Cell>
      <Table.Cell className="tableRow">{customer.phoneNumber}</Table.Cell>
      {/* <Table.Cell className="email">{customer.email ? customer.email : "N/A"}</Table.Cell> */}
      <Table.Cell className="tableRow">{customer.numberOfPets ?? "N/A"}</Table.Cell>
      <Table.Cell className="tableRow">
        <MenuRoot1 customer={customer} preferredColors={preferredColors} />
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <div className="table">
      <Table.Root interactive stickyHeader scrollBehavior={"smooth"} >
        <Table.Header bg={{ base: "white", _dark: "black" }}>
          <Table.Row alignItems={"center"}>
            {/* <Table.ColumnHeader w="6" className="columnHeader">
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
            </Table.ColumnHeader> */}
            <Table.ColumnHeader className="columnHeader">Name</Table.ColumnHeader>
            <Table.ColumnHeader className="columnHeader">Phone Number</Table.ColumnHeader>
            {/* <Table.ColumnHeader>Email</Table.ColumnHeader> */}
            <Table.ColumnHeader className="columnHeader">Number of Pets</Table.ColumnHeader>
            <Table.ColumnHeader w={"6"} className="columnHeader"/>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>

      </Table.Root>

      {/* <Theme asChild hasBackground={false} appearance={theme} colorPalette={preferredColors}>
        <ActionBarRoot open={hasSelection} closeOnInteractOutside={true}  className="actionBar">
          <ActionBarContent>
            <ActionBarSelectionTrigger>
              {selection.length} selected
            </ActionBarSelectionTrigger>
            <ActionBarSeparator />
            <Button variant="outline" colorPalette={preferredColors} size="sm">
              Mark Present <Kbd>✓</Kbd>
            </Button>
            <Button variant="outline" colorPalette={preferredColors} size="sm">
              Cancel
            </Button>
          </ActionBarContent>
        </ActionBarRoot>
      </Theme> */}
    </div>
  )
}

export default MyTable
