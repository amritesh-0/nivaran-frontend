import React from 'react';

const Container = ({ children, className = '', maxWidth = '7xl', ...props }) => {
  return (
    <div 
      className={`mx-auto px-4 sm:px-6 lg:px-8 max-w-${maxWidth} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;