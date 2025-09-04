import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Container from '../components/common/Container';
import SectionHeader from '../components/common/SectionHeader';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you create an account or submit a report, we collect information such as your name, email address, and contact details. This information is necessary to process your civic reports and communicate updates.'
        },
        {
          subtitle: 'Location Data',
          text: 'To accurately route your civic reports, we collect location information when you submit a report. This data is used solely for the purpose of directing your report to the appropriate municipal department.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We collect information about how you use our platform, including pages visited, features used, and time spent on the platform. This helps us improve our services and user experience.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your information to process civic reports, route them to appropriate departments, and provide status updates on resolution progress.'
        },
        {
          subtitle: 'Communication',
          text: 'We may send you notifications about your reports, platform updates, and important service announcements. You can opt out of non-essential communications at any time.'
        },
        {
          subtitle: 'Platform Improvement',
          text: 'Aggregated, anonymized data helps us identify trends, improve our routing algorithms, and enhance the overall platform experience.'
        }
      ]
    },
    {
      title: 'Data Sharing and Disclosure',
      content: [
        {
          subtitle: 'Municipal Partners',
          text: 'We share relevant report information with municipal departments and authorized personnel to facilitate issue resolution. This sharing is limited to information necessary for addressing your specific report.'
        },
        {
          subtitle: 'Public Records',
          text: 'Some civic reports may become part of public records as required by local transparency laws. Personal contact information is typically redacted from public records.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law, court order, or to protect the rights, property, or safety of our users or the public.'
        }
      ]
    },
    {
      title: 'Data Security',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmission is encrypted using industry-standard TLS protocols. Personal information is encrypted at rest using AES-256 encryption.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls and authentication measures to ensure only authorized personnel can access user data.'
        },
        {
          subtitle: 'Regular Audits',
          text: 'Our security practices are regularly audited by third-party security firms to ensure compliance with industry standards.'
        }
      ]
    },
    {
      title: 'Your Rights',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access, update, or correct your personal information at any time through your account settings or by contacting us.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You may request deletion of your personal information, subject to legal requirements for record retention in civic reporting systems.'
        },
        {
          subtitle: 'Data Portability',
          text: 'You can request a copy of your data in a machine-readable format. Contact us to initiate a data export request.'
        }
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'We use essential cookies to maintain your session and ensure platform functionality. These cookies are necessary for the service to work properly.'
        },
        {
          subtitle: 'Analytics',
          text: 'We use analytics tools to understand how users interact with our platform. This data is aggregated and anonymized to protect individual privacy.'
        },
        {
          subtitle: 'Cookie Management',
          text: 'You can manage cookie preferences through your browser settings. Note that disabling essential cookies may impact platform functionality.'
        }
      ]
    }
  ];

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <ShieldCheckIcon className="h-12 w-12 text-brand-blue-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-text-muted mt-4">
              Last updated: January 15, 2025
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {sections.map((section, sectionIndex) => (
              <motion.section
                key={section.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-6">
                  {section.title}
                </h2>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <motion.div
                      key={item.subtitle}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                    >
                      <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            className="mt-12 bg-gradient-brand-primary rounded-2xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Questions about our privacy practices?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              We're here to help. Contact our privacy team for any questions or concerns.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-brand-blue-500 px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Privacy;