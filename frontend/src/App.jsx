import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Box, chakra, IconButton, HStack } from "@chakra-ui/react";
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
        <Box className='outerWrapper' 
                  css={{
                    base: {
                    backgroundColor: "#efefef",
                    backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #efefef 5px), repeating-linear-gradient(#ffffff55, #ffffff)`,
                  },
                    _dark: {
                      backgroundColor: "#1e1e1e",
                      backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #1e1e1e 5px), repeating-linear-gradient(#33333355, #222222)`
                    }
                  }}
        >
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
        <HStack pos={"fixed"} bottom={0} justify={"space-between"} w={"100%"}>
          <ColorModeButton/>
          <Home
                          isLoggedIn={isLoggedIn}
                          setIsLoggedIn={setIsLoggedIn}
                          preferredColors={preferredColors}
                          setPreferredColors={setPreferredColors}
                        />
          <PopoverRoot >
            <PopoverTrigger asChild>
              <IconButton size="md" variant="ghost" >
                <LuPaintbrushVertical></LuPaintbrushVertical>
              </IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                {colors}
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </HStack>
      </Box>
    </CustomerProvider>
  );
}

export default App;