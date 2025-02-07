import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Theme } from '@chakra-ui/react';
import { Switch } from "@/components/ui/switch";
import { Icon } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Box } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";

import Navbar from './components/Navbar';
import MyTable from './components/MyTable';
import CustomerInfo from './components/CustomerInfo';
import PetList from './components/Pet/PetList';
import MenuRoot1 from './components/MenuRoot1';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [checked, setChecked] = useState(true); // Switch state, true for light, false for dark
  const [preferredColors, setPreferredColors] = useState('blue');
  const [customers, setCustomers] = useState(() => {
    const cachedData = localStorage.getItem('customers');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const limit = window.innerHeight > 900 ? 15 : window.innerHeight > 700 ? 8 : window.innerHeight > 500 ? 6 : 3;

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`/db/getCustomers?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

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

  return (
    <>
      <Box
        colorPalette={preferredColors}
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
      </Box>
    </>
  );
}

export default App;
