import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'; // Ensure this path is correct
import ProfileDetail from './components/ProfileDetail'; // Ensure this path is correct
import Favorites from './components/Favorites';
import './App.css';

function App() {

  const [theme, setTheme] = useState('light');

  // Effect to detect system preference and set initial theme
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      setTheme('dark');
    }

    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    prefersDark.addEventListener('change', handler);
    return () => prefersDark.removeEventListener('change', handler);
  }, []);

  // Effect to apply the theme class to the document body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

    return (
      <Router>
        <header className="site-header">
        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>
      </header>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileDetail />} /> */}

          
          <Route path="/" element={<Home toggleTheme={toggleTheme} theme={theme} />} />
          <Route path="/favorites" element={<Favorites toggleTheme={toggleTheme} theme={theme} />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
        </Routes>
      </Router>
    );
  }

export default App; // Ensure App is default exported