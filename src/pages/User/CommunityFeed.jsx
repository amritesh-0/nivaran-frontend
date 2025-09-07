import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, MessageCircle, MessageCirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const CommunityFeed = () => {
  const [issues, setIssues] = useState([
    {
      id: 'CIT-2024-001',
      user: 'John Citizen',
      location: '123 Oak St, Springfield',
      image: 'https://images.pexels.com/photos/163016/crash-test-collision-60-km-h-distraction-163016.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Large Pothole on Oak Street',
      criticality: 'high',
      upvotes: 47,
      comments: 5,
      hasUpvoted: true,
      timeAgo: '2 hours ago'
    },
    {
      id: 'CIT-2024-002',
      user: 'Anonymous',
      location: '456 Main St, Springfield',
      image: 'https://images.pexels.com/photos/33827/street-light-lamp-post-lighting.jpg?auto=compress&cs=tinysrgb&w=800',
      title: 'Street light out - Main Street',
      criticality: 'medium',
      upvotes: 21,
      comments: 8,
      hasUpvoted: false,
      timeAgo: '5 hours ago'
    },
    {
      id: 'CIT-2024-003',
      user: 'Jane Doe',
      location: '789 Park Ave, Springfield',
      image: 'https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Illegal dumping site',
      criticality: 'low',
      upvotes: 12,
      comments: 3,
      hasUpvoted: false,
      timeAgo: '1 day ago'
    },
    {
      id: 'CIT-2024-004',
      user: 'Bob Smith',
      location: '321 Elm St, Springfield',
      image: 'https://images.pexels.com/photos/2265005/pexels-photo-2265005.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Broken water pipe',
      criticality: 'high',
      upvotes: 34,
      comments: 10,
      hasUpvoted: false,
      timeAgo: '3 days ago'
    },
  ]);

  const handleUpvote = (issueId) => {
    setIssues(issues.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          hasUpvoted: !issue.hasUpvoted,
          upvotes: issue.hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1
        };
      }
      return issue;
    }));
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        {/* Integrated Welcome Header - Slightly refined shadow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hello, John!</h1>
            <p className="text-gray-500 text-lg">Your community's feed at a glance.</p>
          </div>
          <Link
            to="/user/raise-problem"
            className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <MessageCirclePlus className="w-5 h-5" />
            <span className="hidden sm:inline">Raise a Problem</span>
          </Link>
        </motion.div>

        {/* Community Feed Posts */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {issues.map((issue) => (
              <motion.div
                key={issue.id}
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                {/* User Info Header */}
                <div className="flex items-center p-6">
                  {/* User avatar with a gradient for a more modern look */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {issue.user === 'Anonymous' ? '?' : issue.user.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900 text-lg">{issue.user}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <span>{issue.location}</span>
                    </div>
                  </div>
                </div>

                {/* Post Image with title overlay */}
                <Link to={`/user/report/${issue.id}`} className="block relative">
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-80 object-cover"
                  />
                  {/* Subtle gradient overlay for better text readability */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-xl font-extrabold text-white leading-tight">{issue.title}</h3>
                  </div>
                  <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-semibold shadow-md ${
                    issue.criticality === 'high' ? 'bg-red-500 text-white' :
                    issue.criticality === 'medium' ? 'bg-orange-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {issue.criticality.charAt(0).toUpperCase() + issue.criticality.slice(1)} Priority
                  </div>
                </Link>
                
                {/* Action Bar - Re-aligned for better spacing and visual hierarchy */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <motion.button
                      onClick={() => handleUpvote(issue.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-2 text-gray-600 transition-colors duration-200 ${
                        issue.hasUpvoted ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${issue.hasUpvoted ? 'fill-red-500' : ''}`} />
                      <span className="font-semibold text-lg">{issue.upvotes}</span>
                    </motion.button>
                    <Link
                      to={`/user/report/${issue.id}`}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors duration-200"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">{issue.comments}</span>
                    </Link>
                  </div>
                  <span className="text-md font-medium text-gray-400">{issue.timeAgo}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityFeed;