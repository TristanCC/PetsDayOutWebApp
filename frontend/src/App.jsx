import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Box, chakra, IconButton } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { LuPaintbrushVertical } from "react-icons/lu";
import { Toaster, toaster } from "@/components/ui/toaster"

import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { CustomerProvider } from './components/context/CustomerContext'; // Import the provider

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [preferredColors, setPreferredColors] = useState('blue');

  const handleColorModeChange = (colorMode) => {
    setPreferredColors(colorMode);
  };

  

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
    <CustomerProvider> {/* Wrap your app with the provider */}
      <Box
        colorPalette={preferredColors}
        color={{ base: "primary", _dark: "primaryL" }}
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
              <Toaster />
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
    </CustomerProvider>
  );
}

export default App;