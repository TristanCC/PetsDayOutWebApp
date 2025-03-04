import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, chakra, IconButton } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { LuPaintbrushVertical } from "react-icons/lu";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover"

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

function colorSwatch(color) {
  return (
    <Box
    ></Box>
  )
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(true);
  const [preferredColors, setPreferredColors] = useState('blue');
  const [customers, setCustomers] = useState(() => {
    const cachedData = localStorage.getItem('customers');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const limit = window.innerHeight > 900 ? 15 : window.innerHeight > 700 ? 8 : window.innerHeight > 500 ? 6 : 3;

  const [offset, setOffset] = useState(0)

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`/db/getCustomers?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      data.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()))
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };


  useEffect(() => {
    fetchCustomers();
  }, [limit, offset, setOffset]);

  const updateCustomerInState = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  const deleteCustomerInState = (deletedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== deletedCustomer.id)
    );
  };

  const handleColorModeChange = (colorMode) => {
    setPreferredColors(colorMode)
  }

  const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'].map((color) => (
    <Box
      display={"inline-block"}
      key={color}
      onClick={() => handleColorModeChange(color)}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      w={10}
      p={2}
      m={1}
      bg={`${color}.600`}
    />
  ));

  return (
    <>
      <Box
        colorPalette={preferredColors}
        color={{ base: "primary", _dark: "primaryL"}}
        bg={{ base: "primaryL", _dark: "primary" }}
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        alignSelf={"center"}
        alignItems={"center"}
      >
        <Box className='outerWrapper'>
          <Box className='wrapperLeft' w="100%">
            <Navbar
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              preferredColors={preferredColors}
              setPreferredColors={setPreferredColors}
              customers={customers}
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              updateCustomerInState={updateCustomerInState}
              deleteCustomerInState={deleteCustomerInState}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
            <Box className='wrapperInner'>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        preferredColors={preferredColors}
                        setPreferredColors={setPreferredColors}
                        customers={customers}
                        selectedCustomer={selectedCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                        updateCustomerInState={updateCustomerInState}
                        deleteCustomerInState={deleteCustomerInState}
                        limit={limit}
                        offset={offset}
                        setOffset={setOffset}
                      />
                    }
                  />
                  <Route
                    path='/login'
                    element={
                      <Login
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        preferredColors={preferredColors}
                        setPreferredColors={setPreferredColors}
                      />
                    }
                  />
                </Routes>
              </BrowserRouter>
            </Box>
          </Box>
        </Box>
        <ColorModeButton position={"absolute"} bottom={"0"} left={"0"} />
        <PopoverRoot positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }}>
          <PopoverTrigger asChild>
            <IconButton size="md" variant="ghost" position={"absolute"} bottom={0} right={0}>
              <LuPaintbrushVertical></LuPaintbrushVertical>
            </IconButton>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              {colors}
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      </Box>
    </>
  );
}

export default App;

// | "transparent"
// | "current"
// | "black"
// | "white"
// | "whiteAlpha"
// | "blackAlpha"
// | "gray"
// | "red"
// | "orange"
// | "yellow"
// | "green"
// | "teal"
// | "blue"
// | "cyan"
// | "purple"
// | "pink"
// | "bg"
// | "fg"
// | "border"
