import { Tabs } from "@chakra-ui/react"
import { useState, useEffect } from "react"
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

import SearchPopup from './SearchPopup';


function Navbar({isLoggedIn, setIsLoggedIn ,theme, preferredColors, setTheme, 
  setPreferredColors, customers, selectedCustomer, setSelectedCustomer, updateCustomerInState, 
  deleteCustomerInState,limit, offset, setOffset }) {

    const [value, setValue] = useState("first")
    const [searchClicked, setSearchClicked] = useState(false)
    const [filtered, setFiltered] = useState([])

    //search functionality

    const [firstNameSearch, setFirstNameSearch] = useState("")
    const [lastNameSearch, setlastNameSearch] = useState("")
    const [phoneNumberSearch, setPhoneNumberSearch] = useState("")

    useEffect(() => {
      if (firstNameSearch || lastNameSearch) {
        setPhoneNumberSearch('');
      }
    }, [firstNameSearch, lastNameSearch]);
  

    const handleSearch = async (e) => {
      e.preventDefault(); // Prevent the form from submitting and reloading the page
      // Your search logic here
      await fetch(`/db/findCustomer?firstName=${firstNameSearch}&lastName=${lastNameSearch}&phoneNumber=${phoneNumberSearch}`)
    };

    return (
        <>
              <Box colorPalette={preferredColors} zIndex="1000" 
              bg={{ base: "primarySurfaceL", _dark: "primarySurface" }} borderRadius={"1rem"}
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
                      <SearchPopup 
                        preferredColors={preferredColors}
                        onSearch={() => {/* Handle search results */}} 
                      />
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
