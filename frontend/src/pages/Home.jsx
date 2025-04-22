import { Button, Center, HStack } from "@chakra-ui/react";
import { useState, useRef, useEffect } from 'react';
import Login from './Login';
import CreateCustomer from "@/components/CreateCustomer";

function Home({ isLoggedIn, setIsLoggedIn, preferredColors, customers, selectedCustomer, setSelectedCustomer, updateCustomerInState, createCustomerRef }) {
  const [customerInfoOpen, setCustomerInfoOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const localCreateCustomerRef = useRef(null); // Local ref to track the CustomerInfo modal

  const handleFormOpen = () => {
    setCustomerInfoOpen(!customerInfoOpen);
    console.log("Customer Info Open: ", customerInfoOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        localCreateCustomerRef.current &&
        !localCreateCustomerRef.current.contains(event.target)
      ) {
        setCustomerInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      {isLoggedIn && (
        <>
          <HStack flex={1} justifyContent={"space-between"}>
            <Button mt="5" ml="5" variant="ghost" onClick={handleLogout}>
              Log Out
            </Button>
          </HStack>
          {customerInfoOpen && (
            <div ref={localCreateCustomerRef}>
              <CreateCustomer setCustomerInfoOpen={setCustomerInfoOpen} preferredColors={preferredColors}/>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
