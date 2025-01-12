import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
  MenuItemGroup,
  MenuSeparator
} from "@/components/ui/menu"

import { Box } from "@chakra-ui/react"

import CustomerInfo from './CustomerInfo';

const MenuRoot1 = ({ customer }) => {

  const [customerInfoOpen, setCustomerInfoOpen] = useState(false);
  const customerInfoRef = useRef(null); // Ref to track the CustomerInfo modal

  const handleCustomerInfo = () => {
    setCustomerInfoOpen(!customerInfoOpen);
    console.log("Customer Info Open: ", customerInfoOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        customerInfoRef.current &&
        !customerInfoRef.current.contains(event.target)
      ) {
        setCustomerInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant="outline" size="sm">
          ☰
          </Button>
        </MenuTrigger>
        <MenuContent className="menuContent">
          <MenuItemGroup p={"5px"}>{customer.firstName} {customer.lastName}</MenuItemGroup>
          <MenuSeparator />
          <MenuItem borderRadius={".75rem"} value="mark-present">✅ Mark Present</MenuItem>
          <MenuItem borderRadius={".75rem"} value="pets">🐕 Pets</MenuItem>
          <MenuItem borderRadius={".75rem"} value="customer-info" onClick={(e) => {handleCustomerInfo()}}>✎ Customer Info</MenuItem>
        </MenuContent>
      </MenuRoot>
      {customerInfoOpen && (
        <div ref={customerInfoRef}>
          <CustomerInfo selectedCustomer={customer} 
                />
        </div>)}
    </Box>
  );
};

export default MenuRoot1;
