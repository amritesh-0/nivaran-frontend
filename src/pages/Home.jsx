
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToAuth = () => {
    navigate('/auth');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-bg-DEFAULT dark:bg-gray-900"
      aria-label="Home Page"
    >
      <Header onNavigateToAuth={handleNavigateToAuth} />
      <main aria-label="Main Content">
        <Hero onNavigateToAuth={handleNavigateToAuth} />
        <HowItWorks />
        <Features />
        <CallToAction onNavigateToAuth={handleNavigateToAuth} />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;