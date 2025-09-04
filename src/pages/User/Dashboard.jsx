import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, TrendingUp, Camera, MapPin, Clock } from 'lucide-react';

const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-8 shadow-lg"
      >
        <div className="bg-blue-50/50 rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, John!</h1>
          <p className="text-gray-600 text-lg">Your city dashboard at a glance</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">12</h3>
              <p className="text-gray-600">Problems Reported</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">8</h3>
              <p className="text-gray-600">Problems Resolved</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">47</h3>
              <p className="text-gray-600">Upvotes Given</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Section */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-3xl p-8 text-center shadow-lg"
      >
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">See something? Say something!</h2>
          <p className="text-gray-600 text-lg mb-8">Help make your community better by reporting issues</p>
          <Link
            to="/user/raise-problem"
            className="inline-flex items-center space-x-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Camera className="w-6 h-6" />
            <span>Raise a Problem</span>
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Pothole reported on Oak Street</p>
              <p className="text-sm text-gray-600">2 hours ago • Ticket #CIT-2024-001</p>
            </div>
            <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              Medium Priority
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Street light fixed on Main St</p>
              <p className="text-sm text-gray-600">1 day ago • Ticket #CIT-2024-002</p>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Resolved
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Garbage collection delay reported</p>
              <p className="text-sm text-gray-600">3 days ago • Ticket #CIT-2024-003</p>
            </div>
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              In Progress
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;