import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Auth = lazy(() => import('./pages/Auth'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-bg-DEFAULT dark:bg-gray-900 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-brand-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          {/* Catch all route for 404 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
