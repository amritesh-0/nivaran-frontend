import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Navigate } from 'react-router-dom';
import Container from '../components/common/Container';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

const Lottie = lazy(() => import('lottie-react'));

const Auth = () => {
  const [animationData, setAnimationData] = useState(null);
  const [animationError, setAnimationError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch('/lottie/auth.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load animation');
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          setAnimationData(data.default ? data.default : data);
          setAnimationError(false);
        }
      })
      .catch(() => {
        if (isMounted) setAnimationError(true);
      });
    return () => { isMounted = false; };
  }, []);
  return (
    <div className="min-h-screen bg-bg-DEFAULT dark:bg-gray-900 flex">
      {/* Left Side - Animation and Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-blue-500 to-brand-blue-400 relative overflow-hidden">
        {/* Background Grain */}
        <div className="absolute inset-0 grain opacity-30" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <ShieldCheckIcon className="h-10 w-10" />
            <span className="text-2xl font-bold">Nivaran</span>
          </motion.div>

          {/* Lottie Animation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <Suspense fallback={
              <div className="w-80 h-80 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <div className="w-80 h-80 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              {animationError ? (
                <div className="w-64 h-64 flex items-center justify-center text-red-500">
                  Animation unavailable
                </div>
              ) : animationData ? (
                <Lottie
                  animationData={animationData}
                  className="w-64 h-64"
                  loop={true}
                />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              </div>
            </Suspense>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Building better communities together
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Join thousands of citizens making their cities more responsive and transparent through civic engagement.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-12 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: '50+', label: 'Cities' },
              { value: '10K+', label: 'Reports' },
              { value: '98%', label: 'Resolved' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-75">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-white bg-opacity-20 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-12 h-12 bg-white bg-opacity-15 rounded-full"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-32 w-8 h-8 bg-white bg-opacity-10 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Back Button */}
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-text-muted hover:text-text-primary dark:hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to home</span>
          </button>
        </motion.div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <Container maxWidth="md" className="w-full">
            <AuthForm />
          </Container>
        </div>

        {/* Mobile Branding */}
        <div className="lg:hidden p-6 bg-bg-muted dark:bg-gray-800">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-brand-blue-500" />
              <span className="text-xl font-bold text-text-primary dark:text-white">
                Nivaran
              </span>
            </div>
            <p className="text-text-muted">
              Building better communities together
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;