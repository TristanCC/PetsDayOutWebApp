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
import { Icon, Text } from "@chakra-ui/react"

import { LuBookOpenCheck } from "react-icons/lu";
import { PiDog, PiDogBold } from "react-icons/pi";
import { LuCircleUser } from "react-icons/lu";

import { Box } from "@chakra-ui/react"
import CustomerInfo from './CustomerInfo';

const MenuRoot1 = ({ customer, preferredColors, setSelectedCustomer, updateCustomerInState }) => {

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
      <MenuRoot size={"md"}>
        <MenuTrigger asChild>
          <Button variant="outline" size="md">
          ☰
          </Button>
        </MenuTrigger>
        <MenuContent className="menuContent">
          <MenuItemGroup p={"0.5rem"}>{customer.firstName} {customer.lastName}</MenuItemGroup>
          <MenuSeparator />
          <MenuItem borderRadius={".75rem"} value="pets"> <div>
            <Icon fontSize={"1.25rem"} color={"yellow.500"}>
              <PiDogBold />
            </Icon>
          </div>
          <Text fontSize={"1rem"}>Pets</Text>
          </MenuItem>
          <MenuItem borderRadius={".75rem"} value="mark-present"> <div>
            <Icon fontSize={"1.25rem"} color={"green.500"}>
              <LuBookOpenCheck />
            </Icon>
          </div>
            <Text fontSize={"1rem"}>Mark Present</Text>
          </MenuItem>
          <MenuItem borderRadius={".75rem"} value="customer-info" onClick={(e) => {handleCustomerInfo()}}> <div>
            <Icon fontSize={"1.25rem"} color={"purple.500"}>
              <LuCircleUser />
            </Icon>
          </div>
          <Text fontSize={"1rem"}>Customer Info</Text>
          </MenuItem>
        </MenuContent>
      </MenuRoot>
      {customerInfoOpen && (
        <div ref={customerInfoRef}>
          <CustomerInfo selectedCustomer={customer} setCustomerInfoOpen={setCustomerInfoOpen}
          setSelectedCustomer={setSelectedCustomer}
          updateCustomerInState={updateCustomerInState}
                />
        </div>)}
    </Box>
  );
};

export default MenuRoot1;
