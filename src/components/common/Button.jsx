import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primaryGradient', 
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2';
  
  const variants = {
    primaryGradient: 'bg-gradient-to-r from-[#5B9DFF] to-[#7CCBFF] text-white shadow-lg hover:shadow-xl',
    secondaryGradient: 'bg-gradient-to-r from-[#5B9DFF] to-[#A9BFFF] text-white shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent text-text-primary dark:text-white border border-transparent hover:border-brand-blue-500 hover:bg-brand-blue-500 hover:bg-opacity-10',
    outline: 'border border-brand-blue-500 text-text-primary dark:text-white hover:bg-brand-blue-500 hover:bg-opacity-10',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  return (
    <motion.button
      className={classes}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -2, scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;