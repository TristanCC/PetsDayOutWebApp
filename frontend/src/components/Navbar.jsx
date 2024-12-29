import { Tabs } from "@chakra-ui/react"
import { useState } from "react"
import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

import { Button, Input, Text, Theme } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

function Navbar() {

    const [value, setValue] = useState("first")
    const [searchClicked, setSearchClicked] = useState(false)

    return (
        <>
            <div className="navbar">
                <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}
                size="lg"
                variant="line"
                >
                  <Tabs.List className="tabs">
                    <div className="tabs">
                        <Tabs.Trigger fontSize="2xl" letterSpacing="wider" value="first">All</Tabs.Trigger>
                        <Tabs.Trigger fontSize="2xl" letterSpacing="wider" value="second">Present</Tabs.Trigger>
                    </div>
                    <div className="tabs">
                    <PopoverRoot>
                      <PopoverTrigger asChild>
                        <IconButton aria-label="Search database" rounded="2xl">
                        <LuSearch />
                        </IconButton>
                      </PopoverTrigger>
                      <PopoverContent css={{ "--popover-bg": "rgba(250,250,250,0.95)" }}>
                        <PopoverArrow />
                        <PopoverBody>
                          <PopoverTitle my="4" fontWeight="medium" fontSize="lg">Find a customer</PopoverTitle>
                          <form action="" onSubmit={console.log('submitted')}>
                            <div className="flexCol">
                              <Input variant="subtle" color={"white"} placeholder="First name" size="md" />
                              <Input variant="subtle" color={"white"} placeholder="Last name" size="md" />
                              <Input variant="subtle" color={"white"} placeholder="Phone number" size="md" />
                              <Button colorPalette="blue" type="submit">Search</Button>
                            </div>
                          </form>

                        </PopoverBody>
                      </PopoverContent>
                    </PopoverRoot>
                    </div>
                  </Tabs.List>
                  <Tabs.Content value="first"></Tabs.Content>
                  <Tabs.Content value="second">Second panel</Tabs.Content>
                </Tabs.Root>
            </div>
        </>
    )
}

export default Navbar
