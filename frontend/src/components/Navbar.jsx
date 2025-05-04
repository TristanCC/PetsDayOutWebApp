import { Tabs, VStack, Box, Text, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import MyTable from '../components/MyTable';
import SearchPopup from './SearchPopup';
import Login from '../pages/Login';
import Present from './Present/Present'
import { useCustomers } from './context/CustomerContext'; // Import the context hook
import { Hand } from "lucide-react";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  preferredColors,
  setPreferredColors,
}) => {
  const [value, setValue] = useState("first");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchResults, setSearchResults] = useState([]);

  // Use the context
  const {
    customers,
    selectedCustomer,
    setSelectedCustomer,
    fetchCustomers,
    updateCustomerInState,
    deleteCustomerInState,
    limit,
    offset,
    setOffset,
  } = useCustomers();

  const handleRefresh = () => {
    setSearchResults(null)
  }


  useEffect(() => {
    handleRefresh()
  },[])

  return (
    <>
      {isLoggedIn ? (
        <Box colorPalette={preferredColors} zIndex="1000" bg={{ base: "primarySurfaceL", _dark: "primarySurface" }} borderRadius={"1rem"}
          position="relative" top={windowWidth > 800 ? "10%" : 0}
          
          data-state="open"
          _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "300ms",
          }}
          _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
          }}
          
          >
          <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)} size="sm" variant="line"> 
            <Tabs.List>
              <Box display={"flex"} justifyContent={"space-between"} w={"100%"} alignContent={"center"} p={4}>
                <Box className="tabs" display={"flex"}>
                  <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="first"
                    onClick={handleRefresh}>
                    <Text>Customers</Text>
                  </Tabs.Trigger>
                  <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="second">
                    <Text>Present</Text>
                  </Tabs.Trigger>
                </Box>
                <Box>
                  <SearchPopup preferredColors={preferredColors} setSearchResults={setSearchResults} setValue={setValue}
                  />
                </Box>
              </Box>
            </Tabs.List>

            <Tabs.Content
              value="first"
              display={"flex"}
              justifyContent={"center"}
              pt={"0"}
              w={"100%"}
              h={"80svh"}
              overflowY={"auto"}
              
            >
              <MyTable
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                customers={customers}
                preferredColors={preferredColors}
                updateCustomerInState={updateCustomerInState}
                deleteCustomerInState={deleteCustomerInState}
                limit={limit}
                offset={offset}
                setOffset={setOffset}
                searchResults={searchResults}
              />
            </Tabs.Content>

            <Tabs.Content
              value="second"
              display={"flex"}
              justifyContent={"center"}
              pt={"0"}
              w={"100%"}
              h={"70vh"}
              overflowY={"auto"}
              
            >
              <Present
                value={value}
                preferredColors={preferredColors}
                />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      ) : (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default Navbar;