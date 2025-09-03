import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Container from './common/Container';
import Button from './common/Button';

const Header = ({ onNavigateToAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Privacy Policy', href: '#privacy-policy' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label="Header"
    >
      <Container>
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          aria-label="Main Navigation"
        >
          {/* LOGO */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            aria-label="Logo"
          >
            <ShieldCheckIcon
              className="h-8 w-8 text-brand-blue-500"
              aria-hidden="true"
            />
            <span className="text-xl font-bold text-text-primary dark:text-white">
              Nivaran
            </span>
          </motion.div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-text-primary dark:text-white hover:text-brand-blue-500 transition-colors duration-200 relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                aria-label={link.label}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue-500 transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              aria-label="Admin Sign In"
              onClick={onNavigateToAuth}
            >
              Admin Sign In
            </Button>
            <Button
              size="sm"
              aria-label="Report an Issue"
              onClick={onNavigateToAuth}
            >
              Report an Issue
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button
            className="md:hidden p-2 text-text-primary dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </motion.button>
        </nav>
      </Container>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 inset-x-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-white/20 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-label="Mobile Menu"
          >
            <Container>
              <div className="py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="block text-text-primary dark:text-white hover:text-brand-blue-500 transition-colors duration-200 py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={link.label}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* MOBILE BUTTONS */}
                <div className="pt-4 space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    aria-label="Admin Sign In"
                    onClick={onNavigateToAuth}
                  >
                    Admin Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="w-full"
                    aria-label="Report an Issue"
                    onClick={onNavigateToAuth}
                  >
                    Report an Issue
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
