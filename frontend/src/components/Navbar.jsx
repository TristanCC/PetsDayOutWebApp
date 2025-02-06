import { Tabs, VStack } from "@chakra-ui/react";
import { useState, useEffect, createContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import MyTable from '../components/MyTable';
import SearchPopup from './SearchPopup';
import Login from '../pages/Login'

function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  theme,
  preferredColors,
  setTheme,
  setPreferredColors,
  customers,
  selectedCustomer,
  setSelectedCustomer,
  updateCustomerInState,
  deleteCustomerInState,
  limit,
  offset,
  setOffset,
}) {
  const [value, setValue] = useState("first");
  const [searchClicked, setSearchClicked] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [lastNameSearch, setLastNameSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchResults, setSearchResults] = useState([]);

  // Debounced window resize handler
  useEffect(() => {
    const handleResize = () => {
      // Update the window width only after a delay
      const debounceTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 200); // 200ms debounce time

      // Clean up the previous timeout if it exists
      return () => clearTimeout(debounceTimeout);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (firstNameSearch || lastNameSearch) {
      setPhoneSearch('');
    }
  }, [firstNameSearch, lastNameSearch]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submit behavior
    await fetch(`/db/findCustomer?firstName=${firstNameSearch}&lastName=${lastNameSearch}&phoneNumber=${phoneSearch}`);
  };

  return (
    <>
      <Box colorPalette={preferredColors} zIndex="1000" bg={{ base: "primarySurfaceL", _dark: "primarySurface" }} borderRadius={"1rem"}
        position="relative" top={windowWidth > 800 ? "10%" : 0}>
        <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)} size="sm" variant="line">
          {isLoggedIn && (
            <Tabs.List className="tabs">
              <div className="tabs">
                <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="first">
                  <Text>Customers</Text>
                </Tabs.Trigger>
                <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="second">
                  <Text>Present</Text>
                </Tabs.Trigger>
              </div>
              <div className="tabs">
                <SearchPopup preferredColors={preferredColors} setSearchResults={setSearchResults}
                firstNameSearch={firstNameSearch} setFirstNameSearch={setFirstNameSearch}
                lastNameSearch={lastNameSearch} setLastNameSearch={setLastNameSearch} phoneSearch={phoneSearch} setPhoneSearch={setPhoneSearch}  />
              </div>
            </Tabs.List>
          )}

          {/* Ensure tab content has a fixed or min-height */}
          <Tabs.Content
            value="first"
            display={"flex"}
            justifyContent={"center"}
            pt={"0"}
            w={"100%"}
            maxH={"74vh"} // Ensure the tab content has a max height
            minH={"400px"} // Prevent collapse, set a min-height
          >
            {isLoggedIn ? (
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
            ) : (
              <VStack>
                            <Text>Please log in</Text>
                            <Login></Login>
              </VStack>
            )}
          </Tabs.Content>
          <Tabs.Content
            value="second"
            display={"flex"}
            justifyContent={"center"}
            pt={"0"}
            w={"100%"}
            maxH={"74vh"} // Ensure the tab content has a max height
            minH={"400px"} // Prevent collapse, set a min-height
          >
            <Text>Second panel</Text>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </>
  );
}

export default Navbar;
