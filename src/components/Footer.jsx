import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Container from './common/Container';
import Button from './common/Button';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const footerSections = [
    {
      title: 'Product',
      links: ['How it works', 'Features', 'Mobile App', 'Roadmap'],
    },
    {
      title: 'Municipalities',
      links: ['Admin Portal', 'SLAs', 'Integrations', 'Security'],
    },
    {
      title: 'Resources',
      links: ['Docs', 'Open Data', 'API', 'Support'],
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Contact', 'Privacy Policy'],
    },
  ];

  const socialLinks = [
    { name: 'X', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'GitHub', href: '#' },
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailValid(isValid);
    if (isValid) {
      // Here you would send the email to your backend/newsletter service
      setEmail('');
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <footer className="bg-bg-muted dark:bg-gray-900 pt-20 pb-8" aria-label="Footer">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ShieldCheckIcon className="h-8 w-8 text-brand-blue-500" aria-hidden="true" />
              <span className="text-xl font-bold text-text-primary dark:text-white">
                Nivaran
              </span>
            </motion.div>
            <motion.p 
              className="text-text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering communities through transparent, efficient civic engagement.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-text-primary dark:text-white mb-4">
                Stay updated
              </h4>
              <form onSubmit={handleEmailSubmit} className="space-y-3" aria-label="Newsletter Signup">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailValid(true);
                    }}
                    className={`flex-1 px-4 py-3 rounded-xl border ${
                      emailValid ? 'border-gray-300 dark:border-gray-600' : 'border-red-400'
                    } bg-white dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-colors`}
                    aria-label="Email for newsletter"
                    required
                  />
                  <Button type="submit" size="md" aria-label="Subscribe">
                    Subscribe
                  </Button>
                </div>
                {!emailValid && (
                  <p className="text-red-500 text-sm" role="alert">Please enter a valid email address</p>
                )}
              </form>
            </motion.div>
          </div>
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
            >
              <h4 className="text-lg font-semibold text-text-primary dark:text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => {
                  const isContact = link === 'Contact';
                  const isPrivacy = link === 'Privacy Policy';
                  const href = isContact ? '/contact' : isPrivacy ? '/privacy-policy' : '#';

                  return (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * sectionIndex + 0.1 * linkIndex }}
                    >
                      {isContact || isPrivacy ? (
                        <Link
                          to={href}
                          className="text-text-muted hover:text-brand-blue-500 transition-colors duration-200 relative group"
                          aria-label={link}
                        >
                          {link}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-blue-500 transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="text-text-muted hover:text-brand-blue-500 transition-colors duration-200 relative group"
                          aria-label={link}
                        >
                          {link}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-blue-500 transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                        </a>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center space-x-6">
            <p className="text-text-muted text-sm">
              © 2025 CivicReport. All rights reserved.
            </p>
            <div className="relative">
              <button className="flex items-center space-x-2 text-text-muted hover:text-text-primary dark:hover:text-white transition-colors duration-200" aria-label="Language Selector">
                <span className="text-sm">English</span>
                <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-text-muted hover:text-brand-blue-500 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  aria-label={social.name}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-bg-DEFAULT dark:bg-gray-800 text-text-primary dark:text-white hover:bg-brand-blue-500 hover:bg-opacity-10 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;