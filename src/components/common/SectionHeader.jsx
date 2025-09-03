import React from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';

const SectionHeader = ({ 
  kicker, 
  title, 
  subtitle, 
  centered = false, 
  className = '' 
}) => {
  const alignment = centered ? 'text-center' : 'text-left';
  const subtitleClasses = centered 
    ? 'mx-auto max-w-2xl text-center' 
    : 'max-w-2xl text-left';

  return (
    <motion.div 
      className={`space-y-4 ${alignment} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {kicker && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Badge>{kicker}</Badge>
        </motion.div>
      )}
      
      {title && (
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary dark:text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h2>
      )}
      
      {subtitle && (
        <motion.p 
          className={`text-lg md:text-xl text-text-muted leading-relaxed ${subtitleClasses}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
