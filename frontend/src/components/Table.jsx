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
import CustomerInfoModal from "./CustomerInfoModal"

// Updated handleClickCustomer function
const handleClickCustomer = (customer) => {
  
}

const Demo = ({ customers }) => {
    const [selection, setSelection] = useState([]);

    const rows = customers.map((customer) => (
      <Table.Row
        key={customer.id}
        data-selected={selection.includes(customer.id) ? "" : undefined}
        className="cursor-pointer hover:bg-neutral-800 hover:text-white text-sm sm:text-base"
        // Pass the customer object to handleClickCustomer
        onClick={() => handleClickCustomer(customer)}
      >
        <Table.Cell>{customer.firstName} {customer.middleName ? customer.middleName[0] + '.' : ""} {customer.lastName}</Table.Cell>
        <Table.Cell>{customer.phoneNumber}</Table.Cell>
        <Table.Cell className="truncate">{customer.email ? customer.email : "N/A"}</Table.Cell>
        <Table.Cell>{customer.numberOfPets ?? "N/A"}</Table.Cell>
        <Table.Cell className="pr-0 mr-0 text-center">
          <Button variant="ghost" size="sm" colorPalette="pink">☰</Button>
        </Table.Cell>
      </Table.Row>
    ));
  
    return (
      <div className="overflow-x-auto">
        <Table.Root interactive showColumnBorder className="max-w-[1200px] table-fixed m-auto text-neutral-400">
          <Table.Header className="bg-gray-900 text-left text-sm sm:text-base">
            <Table.Row>
              <Table.ColumnHeader className="px-2 py-3">Name</Table.ColumnHeader>
              <Table.ColumnHeader className="px-2 py-3">Phone Number</Table.ColumnHeader>
              <Table.ColumnHeader className="px-2 py-3 overflow-hidden text-ellipsis">Email</Table.ColumnHeader>
              <Table.ColumnHeader className="px-2 py-3">Number of Pets</Table.ColumnHeader>
              <Table.ColumnHeader className="px-2 py-3"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table.Root>
      </div>
    );
};

export default Demo;
