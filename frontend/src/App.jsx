import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [error, setError] = useState(null); // For handling login errors

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      window.location.href = '/'; // Redirect to home page
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Login form */}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
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
        />
        <br />
        <input type="submit" value="Submit" />
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p></p>
      <a href="http://localhost:5000/auth/google" className="btn btn-primary">
        Sign in with Google
      </a>
      <p></p>

      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout} className="btn btn-primary">Log out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
        </div>
      )}
    </>
  );
}

export default App;
