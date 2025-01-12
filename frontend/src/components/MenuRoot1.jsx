import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu"

import { Box } from "@chakra-ui/react"

const MenuRoot1 = ({ customer, theme }) => {
  useEffect(() => {
    console.log("MenuRoot1 theme:", theme);
  }, [theme]);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </MenuTrigger>
      <MenuContent className="menuContent">
        <MenuItem value="new-txt">✅ Mark Present</MenuItem>
        <MenuItem value="new-file">🐕 Edit Pets</MenuItem>
        <MenuItem value="open-file">✎ Edit Customer Info</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default MenuRoot1;
