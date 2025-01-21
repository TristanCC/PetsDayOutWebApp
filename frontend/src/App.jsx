import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Theme } from '@chakra-ui/react';
import { Switch } from "@/components/ui/switch";
import { Icon } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Box } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode"

import Navbar from './components/Navbar';
import MyTable from './components/MyTable';
import CustomerInfo from './components/CustomerInfo';
import PetList from './components/PetList';
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

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/db/getCustomers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const updateCustomerInState = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  return (
    <>
        <Box colorPalette={preferredColors} bg={{ base: "white", _dark: "black" }}>
          <div className='outerWrapper'>
            <div className='wrapperLeft'>
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} preferredColors={preferredColors} setPreferredColors={setPreferredColors} customers={customers} selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} updateCustomerInState={updateCustomerInState} />
              <div className='wrapperInner'>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} preferredColors={preferredColors} setPreferredColors={setPreferredColors} customers={customers} selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} updateCustomerInState={updateCustomerInState} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} preferredColors={preferredColors} setPreferredColors={setPreferredColors} />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </div>
            <div className='wrapperRight'>
              <div className=''>
                {selectedCustomer && (
                  <CustomerInfo
                    selectedCustomer={selectedCustomer}
                    setCustomerInfoOpen={setSelectedCustomer}
                  />
                )}
              </div>
            </div>
          </div>
          <ColorModeButton position={"fixed"} bottom={"0"}></ColorModeButton>
        </Box>
    </>
  );
}

export default App;
