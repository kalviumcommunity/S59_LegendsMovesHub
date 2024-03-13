import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import App from './App.jsx';
import Football from './Football.jsx';
import Cricket from './Cricket.jsx'
import Data from './dataForm.jsx'
import User from './login/login.jsx'
import SignUp from './login/signIn.jsx'
import SignOut from './login/signOut.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes> 
      <Route path="/" element={<App />} /> 
      <Route path="/football" element={<Football />} />
      <Route path="/cricket" element={<Cricket />} />
      <Route path="/data" element={<Data />} />
      <Route path="/user" element={<User />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signout" element={<SignOut />} />

    </Routes>
  </Router>
);
