// frontend\src\pages\Login.jsx
import { useState, useEffect } from 'react';
import { Button, Input, Box, VStack, Text, Spinner, Separator, Icon, Image } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { motion, spring } from "framer-motion"; // <-- fixed import
import { FaPaw } from "react-icons/fa6";
import google from "../assets/google.png"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login({ isLoggedIn, setIsLoggedIn, setUser }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/status`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.loggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const credentials = { email, password };

  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error || 'Login failed.');
      return;
    }
    
    const data = await response.json();
    console.log('Login response:', data); // For debugging
    
    // Only call setUser if it exists
    if (typeof setUser === 'function') {
      console.log("setUser exists")
      setUser(data.user || {
        id: data.userId,
        email: email,
        preferredColor: 'blue' // Default
      });
    }
    
    setError(null);
    setIsLoggedIn(true);
  } catch (error) {
    console.error('Login error:', error);
    setError('An error occurred during login.');
  } finally {
    setIsLoading(false);
  }
};

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const pawAnimations = {
    hidden: {
      opacity: 0,
      y: 10,
      rotate: -180
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0
      
    }
  }


  return (
<>
  <Box
  
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    w={"100svw"}
    h={"100svh"}
    gap={{ base: "3rem", md: "5rem" }}
    //backgroundImage={{base: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)", _dark: "linear-gradient(120deg,rgb(13, 13, 13) 0%,rgb(25, 25, 25) 100%)"}}
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
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        textAlign: "center",
        maxWidth: "100%",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.025 }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <VStack>
          <motion.div initial="hidden" animate="visible" variants={pawAnimations} transition={{duration: 1, ease: "backInOut"}}>
            <Icon alignSelf={"center"} color={{base: "primarySurface", _dark: "#eaeaea"}} size={{ base: "lg", md: "xl", lg: "2xl" }} scale={{ base: 1.5, md: 1.5, lg: 2 }} pb={1.5} rotate={35}><FaPaw/></Icon>
          </motion.div>
          <Text
            mt={{base: 0, lg: 4}}
            fontSize={{ base: "4xl", md: "6xl", lg: "6xl" }}
            color={{ base: "primarySurface", _dark: "#eaeaea" }}
            lineHeight={1} fontWeight={"medium"}
          >
            {"A Pet's Day Out".split('').map((char, index) => (
              <motion.span
                key={index}
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal'
                }}
                variants={defaultAnimations}
              >
                {char}
              </motion.span>
            ))}
          </Text>
          <Text
            fontWeight="light"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            color={{ base: "primarySurface", _dark: "#eaeaea" }}

          >
            {"Business Dashboard".split('').map((char, index) => (
              <motion.span
                key={index}
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal'
                }}
                variants={defaultAnimations}
              >
                {char}
              </motion.span>
            ))}
          </Text>
        </VStack>
      </motion.div>
    </motion.div>
      {/*      colors: {
        // Dark mode
        primary: { value: "#121212" },             // base dark bg
        primaryMidpoint: { value: "#1A1A1A" },      // for sections/cards
        primarySurface: { value: "#1F1F1F" },       // surfaces/panels
        primaryD: { value: "#2E2E2E" },             // borders or subtle dividers
        primaryDarkL: { value: "#E0E0E0" },         // light text on dark bg
  
        // Light mode
        primaryL: { value: "#F9FAFB" },             // light background
        primaryMidpointL: { value: "#F3F4F6" },     // section background
        primarySurfaceL: { value: "#FFFFFF" },      // card/surface (pure white)
      }, */}
    {!isLoggedIn ? (
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.25, duration: 1 }}
        variants={defaultAnimations}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          rounded={"lg"}
          p={{ base: 6, md: 8 }}
          width="90svw"
          maxWidth="360px"
          boxShadow="md"
          bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
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
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <VStack spacing={"1rem"}>
              <Field label="Email" required>
                <Input
                  size="lg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  variant="outline"
                  boxShadow="rgba(0, 0, 0, 0.1) 10px 18px 20px -15px inset"
                />
              </Field>
              <Field label="Password" required>
                <Input
                  size="lg"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  variant="outline"
                  boxShadow="rgba(0, 0, 0, 0.1) 10px 18px 20px -15px inset"
                />
              </Field>
              {error && (
                <Text color="red.500" fontSize="sm" mt={-2} width="100%">
                  {error}
                </Text>
              )}
              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                mt={4}
                isLoading={isLoading}
                rounded={"md"}
                size="lg"
              >
                Submit
              </Button>
            </VStack>
          </form>

          <Button
            as="a"
            href="/auth/google"
            variant="outline"
            width="100%"
            mt={4}
            rounded={"md"}
            size="lg"
            colorPalette={"bg"
            }
            color={{base: "primarySurface", _dark: "white"}}
          >
            <Image src={google} scale={.75}></Image>
            Sign in with Google
          </Button>
        </Box>
      </motion.div>
    ) : (
      <Box
        borderRadius="lg"
        p={6}
        width="90%"
        maxWidth="400px"
        boxShadow="lg"
        bg={{ base: "white", _dark: "primarySurface" }}
        color={{ base: "primarySurface", _dark: "white" }}
      >
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Welcome to the Dashboard!
          </Text>
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            colorScheme="blue"
            width="100%"
            size="lg"
          >
            {isLoggingOut ? 'Logging Out...' : 'Log Out'}
          </Button>
        </VStack>
      </Box>
    )}
        <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        textAlign: "center",
        maxWidth: "100%",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 2.5, staggerChildren: 0.025 }}
        style={{ display: "flex", flexDirection: "column" }}
      
      >
        <Text
          fontWeight="light"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          color={{ base: "rgba(0,0,0,.33)", _dark: "rgba(255,255,255,.25)" }}
          mt={2}
        >
          {"Made with ❤️ by Tristan".split('').map((char, index) => (
            <motion.span
              key={index}
              style={{
                display: 'inline-block',
                whiteSpace: char === ' ' ? 'pre' : 'normal'
              }}
              variants={defaultAnimations}
            >
              {char}
            </motion.span>
          ))}
        </Text>
      </motion.div>
    </motion.div>
  </Box>
</>
  );
}

export default Login;
