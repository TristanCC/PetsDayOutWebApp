import { useState, useEffect } from "react"
import { FaRegEdit } from "react-icons/fa";
import { Button, Input, IconButton, Text, Theme } from "@chakra-ui/react"

const fetchPets = async (customerId) => {
  const response = await fetch(`http://localhost:5000/api/customers/${customerId}/pets`)
  const data = await response.json()
  return data
}


const CustomerInfo = ({ customers, theme, preferredColors }) => {

//TODO: split customer information (edit info vs pet list) based on dropdown button selection
//TODO: split customer information (edit info vs pet list) based on dropdown button selection
//TODO: split customer information (edit info vs pet list) based on dropdown button selection
//TODO: split customer information (edit info vs pet list) based on dropdown button selection
//TODO: split customer information (edit info vs pet list) based on dropdown button selection
//TODO: split customer information (edit info vs pet list) based on dropdown button selection
//TODO: split customer information (edit info vs pet list) based on dropdown button selection
//TODO: split customer information (edit info vs pet list) based on dropdown button selection
// this way we can fetch pets only when needed

  return (
    <div className="petList">
        <Text>Pet List:</Text>
        <div className="petListInner">
            <div className="petListHeader">
                <div className="petListHeaderInner">
                <Text>Species</Text>
                <Text>Name</Text>
              
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomerInfo
 