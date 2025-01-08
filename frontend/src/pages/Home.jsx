import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Demo from '../components/Table';
import Login from './Login';

function Home({ isLoggedIn, setIsLoggedIn, theme, preferredColors, setTheme, setPreferredColors }) {
  const [customers, setCustomers] = useState([]);

  // This useEffect will run every time `isLoggedIn` changes
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
  }, [isLoggedIn, setIsLoggedIn]); // Dependency array: Runs when `isLoggedIn` changes

  return (
    <>
      {isLoggedIn ? (
        <>
          <Demo customers={customers} theme={theme} preferredColors={preferredColors} /> {/* Pass the customers prop here */}
          <a href="/login">
            <Button mt="5" variant="surface">Log Out</Button>
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
