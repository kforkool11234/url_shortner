import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
function Signup(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function send(e){
      e.preventDefault();
      const url = 'https://url-shortner-opxv.onrender.com/signup';
      try {
        const response = await axios.post(url, { email, password });
        console.log("Data posted", response.data);
        if(response.status===200){
          localStorage.setItem('token', response.data.token);
          navigate("/")}
        else if(response.status===201){navigate("/login")}
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    }
    return(
        <div>
      <h1>sign-up</h1>
      <form onSubmit={send}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" >Sign Up</button>
      </form>
    </div>
    )
}
export default Signup