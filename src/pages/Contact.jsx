import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email us',
      content: 'hello@civicreport.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: PhoneIcon,
      title: 'Call us',
      content: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri, 9am-6pm EST'
    },
    {
      icon: MapPinIcon,
      title: 'Visit us',
      content: '123 Civic Center Blvd',
      subtitle: 'San Francisco, CA 94102'
    },
    {
      icon: ClockIcon,
      title: 'Office hours',
      content: 'Monday - Friday',
      subtitle: '9:00 AM - 6:00 PM EST'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'demo', label: 'Schedule Demo' },
    { value: 'press', label: 'Press & Media' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Contact form submitted:', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        });
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-bg-DEFAULT dark:bg-gray-900 flex items-center justify-center">
        <Container>
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl font-bold text-text-primary dark:text-white mb-4">
              Message sent successfully!
            </h1>
            <p className="text-text-muted mb-8">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-DEFAULT dark:bg-gray-900">
      {/* Header */}
      <motion.div 
        className="p-6 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-text-muted hover:text-text-primary dark:hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to home</span>
          </button>
        </Container>
      </motion.div>

      <Container className="py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <SectionHeader
              kicker="Get in Touch"
              title="Contact us"
              subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            />

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-12 h-12 bg-gradient-brand-primary rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-text-primary dark:text-white font-medium mb-1">
                      {info.content}
                    </p>
                    <p className="text-text-muted text-sm">
                      {info.subtitle}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <motion.div
              className="bg-bg-muted dark:bg-gray-800 rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text-primary dark:text-white mb-1">
                    How quickly are issues typically resolved?
                  </h4>
                  <p className="text-text-muted text-sm">
                    Most issues are acknowledged within 2 hours and resolved within 5-7 business days, depending on complexity.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary dark:text-white mb-1">
                    Is CivicReport available in my city?
                  </h4>
                  <p className="text-text-muted text-sm">
                    We're expanding rapidly. Contact us to discuss bringing CivicReport to your municipality.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                  Inquiry Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {inquiryTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-text-primary dark:text-white placeholder-text-muted focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-text-primary dark:text-white placeholder-text-muted focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-text-primary dark:text-white placeholder-text-muted focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.subject ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-text-primary dark:text-white placeholder-text-muted focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.message ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;