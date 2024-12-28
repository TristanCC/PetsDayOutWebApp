import { useState, useEffect } from 'react';
import Demo from '../components/Table'
import CustomerInfoModal from '@/components/CustomerInfoModal';

function Home() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
  const checkLoginStatus = async () => {
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
          try {
            console.log('trying to fetch /db/getCustomers');
            const customerResponse = await fetch('/db/getCustomers', {
              method: 'GET',
              credentials: 'include',
            });

            if (!customerResponse.ok) {
              console.error('Failed to fetch users:', customerResponse.status, customerResponse.statusText);
              const errorText = await customerResponse.text();  // Read error body if exists
              console.error('Error response body:', errorText);
            } else {
              const customers = await customerResponse.json();
              setCustomers(customers);
            }
          } catch (error) {
            console.error('Error fetching users:', error);
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

  checkLoginStatus();
}, []);

  return (
    <>
      <h1>A Pet&apos;s Day Out</h1>
      <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
      </div>
      <CustomerInfoModal></CustomerInfoModal>
      {isLoggedIn ? (
        <>
          <Demo customers={customers}/> {/* Pass the customers prop here */}
          <div>
            <p>You are logged in!</p>
          </div>
          <a href="/login">Log out</a>
        </>
        ) : (
        <>
          <div>
            <p>You are not logged in.</p>
          </div>
          <a href="/login">Log in</a>
        </>
      )}
      <div>
      
        {/* {customers?.map((customer) => (
          <p key={customer.id}>{customer.firstName} {customer.lastName} {customer.phoneNumber}</p>
        ))} */}

    </div>
    </>
  );
}

export default Home;
