import { useState, useEffect } from 'react';

function Login() {
    
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
      <div className=' flex flex-col gap-3'>
        
        <h1 className='text-3xl'>A Pet's Day Out Dashboard</h1>
        {/* Login form */}
        <form onSubmit={handleLogin} className='flex flex-col w-1/2 self-center gap-2 mt-2 max-w-96'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-neutral-300 p-2 rounded-lg'
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
            className='bg-neutral-300 p-2 rounded-lg'
          />
          <br />
          <input type="submit" value="Submit" className='btn' />
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
      </div>
    </>
  );
}

export default Login;