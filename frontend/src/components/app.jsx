import React from 'react';
import Input from './input';

import Header from './header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./login";
import Signup from "./signup";
function App(){
    return(<div>
        <Router>
        <Header/>
        
        <Routes>
        <Route path="/" element={<Input/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
        </Router>
    </div>)
}
export default App