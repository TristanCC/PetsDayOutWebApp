import React, { useEffect } from "react";

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

const MenuRoot1 = ({ customer, theme }) => {
  useEffect(() => {
    console.log("MenuRoot1 theme:", theme);
  }, [theme]);

  return (
    customer && (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
        ☰
        </Button>
      </MenuTrigger>
      <MenuContent className="menuContent">
        <MenuItemGroup p={"5px"}>{customer.firstName} {customer.lastName}</MenuItemGroup>
        <MenuSeparator />
        <MenuItem borderRadius={".75rem"} value="new-txt">✅ Mark Present</MenuItem>
        <MenuItem borderRadius={".75rem"} value="new-file">🐕 Pets</MenuItem>
        <MenuItem borderRadius={".75rem"} value="open-file">✎ Customer Info</MenuItem>
      </MenuContent>
    </MenuRoot>
    )
  );
};

export default MenuRoot1;
