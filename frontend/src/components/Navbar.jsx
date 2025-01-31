import { Tabs } from "@chakra-ui/react"
import { useState } from "react"
import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { Box, Stack } from "@chakra-ui/react"
import MyTable from '../components/MyTable';

import { Button, Input, Text, Theme } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

function Navbar({isLoggedIn, setIsLoggedIn ,theme, preferredColors, setTheme, 
  setPreferredColors, customers, selectedCustomer, setSelectedCustomer, updateCustomerInState, 
  deleteCustomerInState,limit, offset, setOffset }) {

    const [value, setValue] = useState("first")
    const [searchClicked, setSearchClicked] = useState(false)
    const [filtered, setFiltered] = useState([])

    return (
        <>
              <Box colorPalette={preferredColors} zIndex="1000" 
              bg={{ base: "white", _dark: "primarySurface" }} borderRadius={"1rem"}
              >
                  <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}
                  size="sm"
                  variant="line"

                  >
                    {isLoggedIn && (
                      <Tabs.List className="tabs">
                      <div className="tabs">
                          <Tabs.Trigger fontSize={window.innerWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="first"><Text>Customers</Text></Tabs.Trigger>
                          <Tabs.Trigger fontSize={window.innerWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="second"><Text>Present</Text></Tabs.Trigger>
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
                            <PopoverBody colorPalette={preferredColors} color="blue.600" shadow={"rgba(50, 50, 250, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
                              <PopoverTitle my="4" fontWeight="medium" fontSize="lg">Find a customer {value === "first"?"":"in Present"}</PopoverTitle>
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
                    )}
                    <Tabs.Content value="first" display={"flex"} justifyContent={"center"} pt={"0"} w={"100%"}
                    maxH={"74vh"}>
                    {isLoggedIn ? <MyTable
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    customers={customers}
                    preferredColors={preferredColors}
                    updateCustomerInState={updateCustomerInState} // Pass the function here
                    deleteCustomerInState={deleteCustomerInState}
                    limit={limit}
                    offset={offset}
                    setOffset={setOffset}
                    />
                    : <Text>Please log in</Text>}
                    </Tabs.Content>
                    <Tabs.Content value="second" >Second panel</Tabs.Content>
                  </Tabs.Root>
              </Box>
        </>
    )
}

export default Navbar
