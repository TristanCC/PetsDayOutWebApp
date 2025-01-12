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
import { Icon } from "@chakra-ui/react"

import { LuBookOpenCheck } from "react-icons/lu";
import { PiDog, PiDogBold } from "react-icons/pi";
import { LuCircleUser } from "react-icons/lu";

import { Box } from "@chakra-ui/react"
import CustomerInfo from './CustomerInfo';

const MenuRoot1 = ({ customer, preferredColors }) => {

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
          <MenuItem borderRadius={".75rem"} value="mark-present"> <div>
            <Icon fontSize={"1.25rem"} color={"green.500"}>
              <LuBookOpenCheck />
            </Icon>
          </div>
            <div>
              Mark Present
            </div>
          </MenuItem>
          <MenuItem borderRadius={".75rem"} value="pets"> <div>
            <Icon fontSize={"1.25rem"} color={"yellow.500"}>
              <PiDogBold />
            </Icon>
          </div>
            <div>
              Pets
            </div>
          </MenuItem>
          <MenuItem borderRadius={".75rem"} value="customer-info" onClick={(e) => {handleCustomerInfo()}}> <div>
            <Icon fontSize={"1.25rem"} color={"purple.500"}>
              <LuCircleUser />
            </Icon>
          </div>
            <div>
              Customer Info
            </div>
          </MenuItem>
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
