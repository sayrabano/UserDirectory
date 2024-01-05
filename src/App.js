
import React from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetailsPage from './components/UserDetailsPage';

const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/userDetails/:userId" element={<UserDetailsPage/>}/>
        
      </Routes>
    </Router>
  );
};

export default App;
