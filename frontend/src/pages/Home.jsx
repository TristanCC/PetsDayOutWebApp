import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import MyTable from '../components/MyTable';
import Login from './Login';

function Home({ isLoggedIn, setIsLoggedIn, preferredColors }) {
  const [customers, setCustomers] = useState(() => {
    const cachedData = localStorage.getItem('customers');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const customerInfoRef = useRef(null);

  // Close CustomerInfo when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (customerInfoRef.current && !customerInfoRef.current.contains(event.target)) {
        setSelectedCustomer(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch customers when logged in
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log('Checking login status...');
        const response = await fetch('/auth/status', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.loggedIn);

          if (data.loggedIn) {
            console.log('Fetching customers...');
            const customerResponse = await fetch('/db/getCustomers', {
              method: 'GET',
              credentials: 'include',
            });

            if (!customerResponse.ok) {
              console.error('Failed to fetch customers:', customerResponse.status, customerResponse.statusText);
            } else {
              const customers = await customerResponse.json();
              setCustomers(customers);
              localStorage.setItem('customers', JSON.stringify(customers));
            }
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    if (isLoggedIn && customers.length === 0) {
      fetchCustomers();
    }
  }, [isLoggedIn, setIsLoggedIn, customers.length]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <MyTable
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            customers={customers}
            preferredColors={preferredColors}
          />
          
          <a href="/login">
            <Button mt="5" variant="surface">
              Log Out
            </Button>
          </a>
        </>
      ) : (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default Home;
