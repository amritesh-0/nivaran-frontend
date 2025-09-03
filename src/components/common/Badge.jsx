import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gradient-to-r from-brand-violet to-brand-blue-400 text-white',
    outline: 'border border-brand-violet text-brand-violet bg-transparent',
    muted: 'bg-bg-muted text-text-muted',
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;