import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from './table';

function Input() {
  const [value, setValue] = useState('');
  const [check, setCheck] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token in useEffect:", token); // Debugging log
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    const url = 'http://localhost:5000/shorturl';
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        url,
        { value, check },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data posted", response.data);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const handleCheck = () => {
    if(check===true){setCheck(false)}
    else{setCheck(true)}
    console.log(check)
  };

  console.log("Is Logged In (input):", isLoggedIn); // Debugging log

  return (
    <div>
      <h2>Enter URL</h2>
      <input
        required
        placeholder="Enter your URL"
        onChange={handleChange}
        value={value}
      />
      {isLoggedIn && (
        <label>
          Permanent
          <input type="checkbox" checked={check} onChange={handleCheck} />
        </label>
      )}
      <button onClick={handleSubmit} disabled={value.trim() === ''}>Shrink</button>
      <Table />
    </div>
  );
}

export default Input;
