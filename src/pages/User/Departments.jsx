import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Phone, Mail, Globe } from 'lucide-react';

const departmentsData = [
  {
    id: 'road',
    name: 'Road & Infrastructure',
    shortDescription: 'Report issues related to roads, bridges, and public infrastructure.',
    longDescription: 'This department handles maintenance and construction of all public roads, including fixing potholes, repairing damaged pavements, and ensuring proper signage. They also manage public buildings and infrastructure projects.',
    contactInfo: {
      phone: '1-800-ROAD-FIX',
      email: 'roads@municipality.gov',
      website: 'www.roads.gov'
    },
    icon: '🛣️'
  },
  {
    id: 'lighting',
    name: 'Street Lighting',
    shortDescription: 'Report broken or malfunctioning street lights in your area.',
    longDescription: 'Responsible for the installation, maintenance, and repair of all street lighting systems. Their work ensures public safety and visibility after dark by keeping all streetlights operational.',
    contactInfo: {
      phone: '1-800-LIGHT-UP',
      email: 'lighting@municipality.gov',
      website: 'www.lighting.gov'
    },
    icon: '💡'
  },
  {
    id: 'waste',
    name: 'Waste Management',
    shortDescription: 'Report issues with garbage collection or public sanitation.',
    longDescription: 'This department manages all aspects of waste collection, recycling programs, and public cleanliness. They are responsible for keeping our community clean and healthy.',
    contactInfo: {
      phone: '1-800-CLEAN-UP',
      email: 'waste@municipality.gov',
      website: 'www.waste.gov'
    },
    icon: '🗑️'
  },
  {
    id: 'water',
    name: 'Water Supply',
    shortDescription: 'Report problems with water leaks, burst pipes, or supply issues.',
    longDescription: 'Manages the public water supply system, including pipe maintenance, water quality testing, and infrastructure repairs to ensure a safe and consistent supply of water to all residents.',
    contactInfo: {
      phone: '1-800-WATER-HLP',
      email: 'water@municipality.gov',
      website: 'www.water.gov'
    },
    icon: '💧'
  }
];

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const detailVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Departments</h1>
        <p className="text-gray-600 mb-8">
          Select a department to view their details and contact information.
        </p>

        <AnimatePresence mode="wait">
          {selectedDepartment ? (
            <motion.div
              key="details"
              variants={detailVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-6"
            >
              <button
                onClick={() => setSelectedDepartment(null)}
                className="flex items-center space-x-2 text-blue-600 font-semibold mb-6 hover:text-blue-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Departments</span>
              </button>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl">{selectedDepartment.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment.name}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedDepartment.longDescription}
                </p>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{selectedDepartment.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{selectedDepartment.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <span>{selectedDepartment.contactInfo.website}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
            >
              {departmentsData.map((department) => (
                <motion.div
                  key={department.id}
                  variants={itemVariants}
                  onClick={() => setSelectedDepartment(department)}
                  className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 flex flex-col items-center text-center"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-5xl mb-4" role="img" aria-label={department.name}>
                    {department.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {department.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {department.shortDescription}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Departments;