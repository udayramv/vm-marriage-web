import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Ensure this path is correct
import ProfileDetail from './components/ProfileDetail'; // Ensure this path is correct

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
        </Routes>
      </Router>
    );
  }

export default App; // Ensure App is default exported