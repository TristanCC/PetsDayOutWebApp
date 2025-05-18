import { Tabs, VStack, Box, Text, IconButton, Icon, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import MyTable from '../components/MyTable';
import SearchPopup from './SearchPopup';
import Login from '../pages/Login';
import Present from './Present/Present'
import { useCustomers } from './context/CustomerContext';
import { PresentCountContext } from './context/PresentCountContext';
import { FaTableList } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  preferredColors,
  setPreferredColors,
}) => {
  const [value, setValue] = useState("first");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchResults, setSearchResults] = useState([]);
  const [present, setPresent] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Customer context
  const {
    customers,
    selectedCustomer,
    setSelectedCustomer,
    updateCustomerInState,
    deleteCustomerInState,
    limit,
    offset,
    setOffset,
  } = useCustomers();

  const handleRefresh = () => {
    setSearchResults(null);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  // Calculate present count whenever present changes
  useEffect(() => {
    if (present && Array.isArray(present)) {
      const count = present.reduce((total, entry) => {
        return total + (entry.pets ? entry.pets.length : 0);
      }, 0);
      setPresentCount(count);
    }
  }, [present]);

  useEffect(() => {
    const fetchPresent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/db/getPresent`);
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setPresent(data || []);
      } catch (error) {
        console.error("Error fetching present customers:", error);
        setPresent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPresent();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Box 
          colorPalette={preferredColors} 
          zIndex="1000" 
          bg={{ base: "primarySurfaceL", _dark: "primarySurface" }} 
          rounded={"2xl"} 
          maxW={"800px"} 
          justifySelf={"center"} 
          w={"100%"}
          position="relative" 
          top={windowWidth > 800 ? "10%" : 0}
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
                  <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="first" onClick={handleRefresh}>
                    <HStack>
                      <Icon size={"xl"}><FaTableList/></Icon>
                      <Text display={{smDown: "none", md: "block", lg: "block"}}>Customers</Text>
                    </HStack>
                  </Tabs.Trigger>
                  <Tabs.Trigger fontSize={windowWidth > 500 ? "2xl" : "xl"} letterSpacing="wider" value="second">
                    <HStack>
                      <Icon size={"xl"}><FaUserClock/></Icon>
                      <Text display={{smDown: "none", md: "block", lg: "block"}}>Present </Text>
                        <IconButton
                          size={"sm"}
                          scale={0.6}
                          pos={"absolute"}
                          justifyContent={"center"}
                          alignSelf={"center"}
                          right={-5}
                          top={-3}
                          rounded={"3xl"}
                          display={presentCount? "flex" : "none"}
                        >
                          <Text  color={"white"} fontSize={"xl"} alignSelf={"center"}>{presentCount}</Text>
                        </IconButton>
                      
                    </HStack>
                  </Tabs.Trigger>
                </Box>
                <Box>
                  <SearchPopup 
                    preferredColors={preferredColors} 
                    setSearchResults={setSearchResults} 
                    setValue={setValue}
                  />
                </Box>
              </Box>
            </Tabs.List>

            <Tabs.Content
              value="first"
              display={"flex"}
              justifyContent={"center"}
              p={0}
              w={"100%"}
              h={"80svh"}
              overflowY={"auto"}
            >
              <PresentCountContext.Provider value={{ presentCount, setPresentCount }}>
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
              </PresentCountContext.Provider>
            </Tabs.Content>

            <Tabs.Content
              value="second"
              display={"flex"}
              justifyContent={"center"}
              p={0}
              w={"100%"}
              h={"80svh"}
              overflowY={"auto"}
            >
              <Present
                value={value}
                preferredColors={preferredColors}
                present={present}
                setPresent={setPresent}
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