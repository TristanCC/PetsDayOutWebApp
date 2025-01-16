import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"


function Login({ isLoggedIn, setIsLoggedIn }) {
    
  const [error, setError] = useState(null); // For handling login errors

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        setIsLoggedIn(false); // Set state to false in case of error
      }
    };
  
    checkLoginStatus();
  }, []);
  


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
        const errorData = await response.text();
        console.error('Error response from server:', errorData);
        setError(errorData || 'Login failed.');
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
  try {
    const response = await fetch('/auth/logout', {
      method: 'GET',
      credentials: 'include',  // Ensure cookies are sent
    });

    if (response.ok) {
      setIsLoggedIn(false); // Update login status
      window.location.href = '/';  // Redirect to home or login page
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  return (
    <>
    { !isLoggedIn ? (
      <div className=' loginForm'>

        {/* Login form */}
        <form onSubmit={handleLogin} className=''>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=''
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=''
          />
          <br />
          <input type="submit" value="Submit" className='' />
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p></p>
        <a href="http://192.168.12.249:5000/auth/google" className="">
          Sign in with Google
        </a>
        <p></p>
        {/* Conditional rendering based on login status */}
      </div>
    )
    : (
      <div className=''>
        <h1>Welcome to the Dashboard!</h1>
        <Button onClick={handleLogout} >Log Out</Button>
      </div>
    )}
    </>
  );
}

export default Login;

