import { Tabs } from "@chakra-ui/react"
import { useState } from "react"
import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { Box, Stack } from "@chakra-ui/react"

import { Button, Input, Text, Theme } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

function Navbar({theme, preferredColors, setTheme, setPreferredColors}) {

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
                      <PopoverRoot >
                        <PopoverTrigger asChild>
                          <IconButton aria-label="Search database" rounded="xl">
                            <LuSearch />
                          </IconButton>
                        </PopoverTrigger>
                        <PopoverContent asChild>
                          <div>
                            <PopoverArrow />
                            <PopoverBody color="blue.600" shadow={"rgba(50, 50, 250, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
                              <PopoverTitle my="4" fontWeight="medium" fontSize="lg">Find a customer</PopoverTitle>
                              <Stack>
                                <form action="" onSubmit={(e) => {e.preventDefault(); setSearchClicked(true)}}>
                                  <div className="flexCol">
                                    <Input variant="subtle"  placeholder="First name" size="md" />
                                    <Input variant="subtle"  placeholder="Last name" size="md" />
                                    <Input variant="subtle"  placeholder="Phone number" size="md" />
                                    <Button type="submit">Search</Button>
                                  </div>
                                </form>
                              </Stack>
                            </PopoverBody>
                          </div>

                      
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
