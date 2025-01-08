import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Theme } from '@chakra-ui/react';
import { Switch } from "@/components/ui/switch";
import { Icon } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Box } from "@chakra-ui/react";

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [checked, setChecked] = useState(true); // Switch state, true for light, false for dark
  const [theme, setTheme] = useState('light'); // The current theme
  const [preferredColors, setPreferredColors] = useState('blue');

  // Load theme and preferred colors from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedColors = localStorage.getItem('preferredColors');
    
    if (savedTheme) {
      setTheme(savedTheme);
      setChecked(savedTheme === 'light'); // Set the checked state based on the saved theme
    }

    if (savedColors) {
      setPreferredColors(savedColors);
    }
  }, []);

  // Update the theme whenever the checked state changes
  useEffect(() => {
    const newTheme = checked ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save to localStorage
  }, [checked]);

  // Save preferred colors to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('preferredColors', preferredColors);
  }, [preferredColors]);

  return (
    <>
      <Theme appearance={theme} colorPalette={preferredColors}>
        <Box>
          <div className='outerWrapper'>
            <div className='wrapperLeft'>
              <Navbar theme={theme} preferredColors={preferredColors} setTheme={setTheme} setPreferredColors={setPreferredColors} />
              <div className=''>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} theme={theme} preferredColors={preferredColors} setTheme={setTheme} setPreferredColors={setPreferredColors} />} />
                    <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} theme={theme} preferredColors={preferredColors} setTheme={setTheme} setPreferredColors={setPreferredColors} />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </div>
            <div className='wrapperRight'>
              <div className=''>
                {/* Remove the CustomerInfo route */}
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
        </Box>
      </Theme>
    </>
  );
}

export default App;
