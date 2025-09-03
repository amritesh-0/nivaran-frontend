
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapIcon, CpuChipIcon, PhotoIcon, BellIcon, LanguageIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Container from './common/Container';
import SectionHeader from './common/SectionHeader';

const Features = () => {
  const [activeTab, setActiveTab] = useState('Citizen');

  const features = [
    {
      icon: MapIcon,
      title: 'Real-time map & clustering',
      text: 'View city-wide issues with live clusters and filters.',
    },
    {
      icon: CpuChipIcon,
      title: 'Smart auto-routing',
      text: 'Assigns to the right team using rules and metadata.',
    },
    {
      icon: PhotoIcon,
      title: 'Photo & media pipeline',
      text: 'Fast uploads, thumbnails, and optimized storage.',
    },
    {
      icon: BellIcon,
      title: 'Notifications & SLAs',
      text: 'Clear SLAs with timely alerts and escalations.',
    },
    {
      icon: LanguageIcon,
      title: 'Accessibility & multilingual',
      text: 'Inclusive by design with WCAG-compliant UI.',
    },
    {
      icon: ChartBarIcon,
      title: 'Open analytics & exports',
      text: 'Trends, hotspots, and downloadable datasets.',
    },
  ];

  const tabs = [
    {
      id: 'Citizen',
      label: 'Citizen',
      content: 'Frictionless reporting, status tracking, and transparency.',
    },
    {
      id: 'Staff',
      label: 'Staff',
      content: 'Triage, assignment, and work-in-progress updates.',
    },
    {
      id: 'Supervisors',
      label: 'Supervisors',
      content: 'SLA oversight, routing rules, and citywide analytics.',
    },
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900" aria-label="Features">
      <Container>
        <SectionHeader
          kicker="Platform Features"
          title="Built for every stakeholder"
          subtitle="Comprehensive tools that serve citizens, staff, and supervisors equally well"
          centered
          className="mb-16"
        />
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-brand-blue-500 hover:border-opacity-30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02 }}
                aria-label={`Feature: ${feature.title}`}
              >
                <div className="absolute inset-0 bg-gradient-brand-primary opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-brand-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3 group-hover:text-brand-blue-500 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Pro Highlight Tabs */}
        <motion.div
          className="bg-bg-muted dark:bg-gray-800 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-4">
              Tailored for your role
            </h3>
            <p className="text-text-muted">
              Each interface is designed specifically for how you work
            </p>
          </div>
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-1 flex">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-text-muted hover:text-text-primary dark:hover:text-white'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Tab: ${tab.label}`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-brand-primary rounded-lg"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              aria-label={`Tab Content: ${activeTab}`}
            >
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                {tabs.find(tab => tab.id === activeTab)?.content}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

export default Features;