import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token && user) {
      setIsLoggedIn(true);
      setUserName(user.displayName || user.email);
    }
  }, []);

  const logout = async () => {
    try {
      await axios.post("https://url-shortner-opxv.onrender.com/logout");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUserName('');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  console.log("Is Logged In (Header):", isLoggedIn); // Debugging log

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <span>Welcome, {userName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
