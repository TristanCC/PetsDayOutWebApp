import { useState, useEffect } from 'react';
import { Button, Input, Box, VStack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [error, setError] = useState(null); // For handling login errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/auth/status', {
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
        setIsLoading(false); // Set loading to false after the check
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse as JSON
        setError(errorData.error || 'Login failed.');
        return;
      }

      setError(null);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/auth/logout', {
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

  return (
    <>
      {!isLoggedIn ? (
        <Box
          borderRadius="lg"
          p={6}
          maxW="350px"
          w="90%"
          boxShadow="lg"
          position="fixed"
          rounded={"2xl"}
          bg={{ base: "white", _dark: "primarySurface" }}
          color={{ base: "black", _dark: "white" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <VStack spacing={2} >
            <Box display={"flex"} flexDir={"column"}>
              <Text fontSize="2xl" fontWeight="bold">
                Sign in
              </Text>
            </Box>
            <form onSubmit={handleLogin}>
              <Box display={"flex"} flexDir={"column"} gap={3}>
                <Field label="Email" required>
                  <Input
                    size="lg"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Field>
                <Field label="Password" required>
                  <Input
                    size="lg"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Field>
                {error && <Text color="red.500">{error}</Text>}
                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                  mt={4}
                >
                  Submit
                </Button>
              </Box>
            </form>
            <Button as="a" href="/auth/google" variant="outline" width="100%" mt={4}>
              Sign in with Google
            </Button>
          </VStack>
        </Box>
      ) : (
        <Box
          borderRadius="lg"
          p={6}
          maxW="400px"
          w="90%"
          boxShadow="lg"
          position="fixed"
          bg={{ base: "white", _dark: "primarySurface" }}
          color={{ base: "black", _dark: "white" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <VStack spacing={4} justifySelf={"center"}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
              Welcome to the Dashboard!
            </Text>
            <Button onClick={handleLogout} disabled={isLoggingOut} colorScheme="blue" width="100%">
              {isLoggingOut ? 'Logging Out...' : 'Log Out'}
            </Button>
          </VStack>
        </Box>
      )}
    </>
  );
}

export default Login;

