import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Theme } from '@chakra-ui/react';
import { Switch } from "@/components/ui/switch";
import { Icon } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [checked, setChecked] = useState(true); // Switch state, true for light, false for dark
  const [theme, setTheme] = useState('light'); // The current theme
  const [preferredColors, setPreferredColors] = useState('blue');

  // Update the theme whenever the switch state changes
  useEffect(() => {
    setTheme(checked ? 'light' : 'dark');
  }, [checked]); // This hook runs every time 'checked' state changes

  return (
    <>
      <Theme appearance={theme} colorPalette={preferredColors}>
        <div className='outerWrapper'>
          <div className='wrapperLeft'>
            <Navbar />
            <div className=''>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                  <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
          <div className='wrapperLeft'>
            <div className=''>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </div>
        <div className='themeToggle'>
          <Switch
            colorPalette={preferredColors}
            size="lg"
            variant="solid"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)} // Properly handle the change
            trackLabel={{
              on: (
                <Icon color="yellow.400">
                  <FaSun />
                </Icon>
              ),
              off: (
                <Icon color="gray.400">
                  <FaMoon />
                </Icon>
              ),
            }}
          />
        </div>
      </Theme>
    </>
  );
}

export default App;
