
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import HowItWorks from '../../components/HowItWorks';
import Features from '../../components/Features';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
    const { login } = useAuth();
  const navigate = useNavigate();

  const handleSimulatedLogin = () => {
    // This is a dummy user object. In a real app, this data would come from an API.
    const mockUser = {
      id: 1,
      name: 'John Citizen',
      role: 'user',
      token: 'mock-token-123',
    };
    login(mockUser);
    navigate('/user/dashboard'); // Redirect to the user dashboard after logging in
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-bg-DEFAULT dark:bg-gray-900"
      aria-label="Home Page"
    >
      <Header />
      <main aria-label="Main Content">
        <Hero />
        <HowItWorks />
        <Features />
        <CallToAction />

        <div className="text-center mt-10">
        <button
          onClick={handleSimulatedLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Simulate User Login
        </button>
      </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;