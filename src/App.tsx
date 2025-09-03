import React from 'react';
import { useState } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return <Auth />;
      default:
        return <Home onNavigateToAuth={() => setCurrentPage('auth')} />;
    }
  };

  return renderPage();
}

export default App;