import { Tabs, VStack } from "@chakra-ui/react";
import { useState, useEffect, createContext } from "react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import MyTable from '../components/MyTable';
import SearchPopup from './SearchPopup';
import Login from '../pages/Login';

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

  useEffect(() => {
    const handleResize = () => {
      const debounceTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 200);

      return () => clearTimeout(debounceTimeout);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (firstNameSearch || lastNameSearch) {
      setPhoneSearch('');
    }
  }, [firstNameSearch, lastNameSearch]);

  return (
    <>
      {isLoggedIn ? (
        <Box colorPalette={preferredColors} zIndex="1000" bg={{ base: "primarySurfaceL", _dark: "primarySurface" }} borderRadius={"1rem"}
          position="relative" top={windowWidth > 800 ? "10%" : 0}>
          <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)} size="sm" variant="line">
            <Tabs.List className="tabs">
              <Box className="tabs">
                <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="first">
                  <Text>Customers</Text>
                </Tabs.Trigger>
                <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="second">
                  <Text>Present</Text>
                </Tabs.Trigger>
              </Box>
              <Box className="tabs">
                <SearchPopup preferredColors={preferredColors} setSearchResults={setSearchResults}
                  firstNameSearch={firstNameSearch} setFirstNameSearch={setFirstNameSearch}
                  lastNameSearch={lastNameSearch} setLastNameSearch={setLastNameSearch} phoneSearch={phoneSearch} setPhoneSearch={setPhoneSearch} />
              </Box>
            </Tabs.List>

            <Tabs.Content
              value="first"
              display={"flex"}
              justifyContent={"center"}
              pt={"0"}
              w={"100%"}
              h={"70vh"}
              maxH={"70vh"}
              minH={"70vh"}
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
              maxH={"70vh"}
              minH={"70vh"}
              overflowY={"auto"}
            >
              <Text>Second panel</Text>
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
