import { useState, useEffect } from 'react';

function Home() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Check if the user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('frontend trying to fetch /auth/status')
        const response = await fetch('/auth/status', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent
        });
      
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.loggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        //setIsLoggedIn(false);
      }
    };
  
    checkLoginStatus();
}, []);


  return (
    <>
      <div className=''>
        <h1>A Pet&apos;s Day Out</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <>
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
      </div>
    </>
  );
}

export default Home;