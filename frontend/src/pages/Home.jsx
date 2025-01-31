import { Button, Center, HStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Login from './Login';
import CreateCustomer from "@/components/CreateCustomer";

function Home({ isLoggedIn, setIsLoggedIn, preferredColors, customers, selectedCustomer, setSelectedCustomer, updateCustomerInState, createCustomerRef }) {
  const [customerInfoOpen, setCustomerInfoOpen] = useState(false);
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

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login')
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <HStack flex={1} justifyContent={"space-between"}>
            <Button mt="5" ml="5" variant="ghost" onClick={handleNavigate}>
              Log Out
            </Button>
            <Button mt="5" mr="5" variant="surface" onClick={handleFormOpen}>
              Add Customer
            </Button>
          </HStack>
          {customerInfoOpen && (
            <div ref={localCreateCustomerRef}>
              <CreateCustomer setCustomerInfoOpen={setCustomerInfoOpen}/>
            </div>
          )}
        </>
      ) : (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default Home;
