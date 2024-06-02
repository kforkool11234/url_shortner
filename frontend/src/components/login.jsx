import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function send(e) {
    e.preventDefault();
    const url = 'http://localhost:5000/login';
    try {
      const response = await axios.post(url, { email, password });
      const { token, user } = response.data;
      console.log("Data posted", response.data);
      if (response.status === 200) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={send}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
