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
      <MenuContent>
        <MenuItem value="new-txt">New Text File</MenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
          <MenuTriggerItem value="open-recent">Open Recent</MenuTriggerItem>
          <MenuContent>
            <MenuItem value="panda">Panda</MenuItem>
            <MenuItem value="ark">Ark UI</MenuItem>
            <MenuItem value="chakra">Chakra v3</MenuItem>
          </MenuContent>
        </MenuRoot>
        <MenuItem value="open-file">Open File...</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default MenuRoot1;
