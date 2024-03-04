import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // import Routes
import App from './App.jsx';
import './index.css';
import Football from './Football.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes> 
      <Route path="/" element={<App />} /> 
      <Route path="/football" element={<Football />} />
    </Routes>
  </Router>
);
