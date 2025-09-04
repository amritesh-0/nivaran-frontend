import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, MessageCircle, Filter, Map, List, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LocalIssues = () => {
  const [viewMode, setViewMode] = useState('list');
  const [filterPriority, setFilterPriority] = useState('all');
  const [localIssues] = useState([
    {
      id: 'CIT-2024-005',
      title: 'Fallen Tree - Elm Street',
      category: 'Road & Infrastructure',
      criticality: 'high',
      status: 'pending',
      location: 'Elm Street, Downtown',
      upvotes: 35,
      comments: 8,
      distance: '0.2 km away',
      timeAgo: '2 hours ago',
      hasUpvoted: false
    },
    {
      id: 'CIT-2024-006',
      title: 'Graffiti - Tree Park Avenue',
      category: 'Public Safety',
      criticality: 'medium',
      status: 'acknowledged',
      location: 'Tree Park Avenue',
      upvotes: 18,
      comments: 3,
      distance: '0.5 km away',
      timeAgo: '1 day ago',
      hasUpvoted: true
    },
    {
      id: 'CIT-2024-007',
      title: 'Broken Bench - Central Park',
      category: 'Public Infrastructure',
      criticality: 'low',
      status: 'resolved',
      location: 'Central Park',
      upvotes: 5,
      comments: 2,
      distance: '0.8 km away',
      timeAgo: '3 days ago',
      hasUpvoted: false
    }
  ]);

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'acknowledged': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // 1. Filtering logic added here
  const filteredIssues = localIssues.filter(issue => 
    filterPriority === 'all' || issue.criticality === filterPriority
  );

  const MapView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-4 shadow-lg"
    >
      <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
        {/* Simulated Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-lg">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Your Area</span>
            </div>
          </div>
          
          {/* Simulated issue markers */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute top-32 right-24 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-green-500 rounded-full" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <p className="text-gray-600">Interactive map showing local issues</p>
              <p className="text-sm text-gray-500 mt-1">Red: High Priority • Orange: Medium • Green: Resolved</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Local Issues</h1>
          <p className="text-gray-600 text-lg">See what's happening in your neighborhood</p>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <motion.button
              onClick={() => setViewMode('map')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'map' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </motion.button>
          </div>

          {/* Priority Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'high', 'medium', 'low'].map((priority) => (
              <motion.button
                key={priority}
                onClick={() => setFilterPriority(priority)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  filterPriority === priority
                    ? priority === 'high'
                      ? 'bg-red-500 text-white shadow-md'
                      : priority === 'medium'
                      ? 'bg-orange-500 text-white shadow-md'
                      : priority === 'low'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {priority === 'all' ? 'All' : `${priority.charAt(0).toUpperCase() + priority.slice(1)}`}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      {viewMode === 'map' ? (
        <MapView />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <motion.div
                key={issue.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      issue.criticality === 'high' ? 'bg-red-500' :
                      issue.criticality === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{issue.timeAgo}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{issue.title}</h3>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{issue.location}</span>
                  <span className="text-sm">• {issue.distance}</span>
                </div>

                <p className="text-gray-600 mb-4">Ticket ID: #{issue.id}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                        issue.hasUpvoted
                          ? 'bg-red-100 text-red-600 shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${issue.hasUpvoted ? 'fill-current' : ''}`} />
                      <span className="font-medium">Upvote ({issue.upvotes})</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">Comment ({issue.comments})</span>
                    </motion.button>
                  </div>
                  
                  <Link
                    to={`/user/report/${issue.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300"
                  >
                    View <span className="hidden sm:inline">Details</span>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-12">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Issues Found</h3>
              <p className="text-gray-600">There are no reported issues with this priority level.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LocalIssues;