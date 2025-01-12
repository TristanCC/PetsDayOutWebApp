import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import MyTable from '../components/MyTable';
import Login from './Login';
import CustomerInfo from '../components/CustomerInfo';

import MenuRoot1 from '@/components/MenuRoot1';

function Home({ isLoggedIn, setIsLoggedIn, theme, preferredColors, setTheme, setPreferredColors }) {
  const [customers, setCustomers] = useState([]);
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
        console.log('frontend trying to fetch /auth/status');
        const response = await fetch('/auth/status', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.loggedIn);

          if (data.loggedIn) {
            console.log('trying to fetch /db/getCustomers');
            const customerResponse = await fetch('/db/getCustomers', {
              method: 'GET',
              credentials: 'include',
            });

            if (!customerResponse.ok) {
              console.error('Failed to fetch users:', customerResponse.status, customerResponse.statusText);
              const errorText = await customerResponse.text();
              console.error('Error response body:', errorText);
            } else {
              const customers = await customerResponse.json();
              setCustomers(customers);
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

    if (isLoggedIn) {
      fetchCustomers();
    }
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <MyTable
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            customers={customers}
            theme={theme}
            preferredColors={preferredColors}
          />
          {selectedCustomer && (
            <div ref={customerInfoRef}>
              <CustomerInfo
                selectedCustomer={selectedCustomer}
              />
            </div>
            
          )}

          
          <a href="/login">
            <Button mt="5" variant="surface">
              Log Out
            </Button>
          </a>
        </>
      ) : (
        <>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </>
      )}
    </>
  );
}

export default Home;
