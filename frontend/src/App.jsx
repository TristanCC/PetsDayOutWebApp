// frontend/src/App.jsx
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase"; // Firebase configuration import
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <>
          <h1>Login or Signup</h1>
          <Login />
          <Signup />
        </>
      )}
    </div>
  );
};

export default App;
