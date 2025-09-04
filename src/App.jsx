import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-bg-DEFAULT dark:bg-gray-900 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-brand-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
