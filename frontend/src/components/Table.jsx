"use client"

import { Kbd, Table, Theme } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@/components/ui/action-bar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

// Updated handleClickCustomer function
const handleClickCustomer = (customer) => {
  // You can add functionality here if needed for customer row click
}

const Demo = ({ customers, theme, preferredColors }) => {
  const [selection, setSelection] = useState([])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < customers.length

  useEffect(() => {
    const onThemeChange = async () => {

    };
  }, [theme, preferredColors]);

  const rows = customers.map((customer) => (
    <Table.Row
      key={customer.id}
      data-selected={selection.includes(customer.id) ? "" : undefined}
      className="tableRow"
      onClick={() => handleClickCustomer(customer)}
      paddingBlock={"0"}
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
        <Button variant="outline" size="sm" w="1">☰</Button>
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <div className="table">
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
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
      <Button mt="5" className="addCustomerButton" pos="sticky" bottom="1rem" variant="solid">
          Create Customer
        </Button>
    </div>
  )
}

export default Demo
