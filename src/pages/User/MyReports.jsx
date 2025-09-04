import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertCircle, Eye, ChevronRight } from 'lucide-react';

const MyReports = () => {
  const [reports] = useState([
    {
      id: 'CIT-2024-001',
      title: 'Pothole on Oak Street',
      category: 'Road & Infrastructure',
      criticality: 'medium',
      status: 'in-progress',
      date: '2024-01-15',
      progress: 60,
      upvotes: 12,
      location: '123 Oak St, Springfield'
    },
    {
      id: 'CIT-2024-002', 
      title: 'Street Light Outage',
      category: 'Street Lighting',
      criticality: 'high',
      status: 'resolved',
      date: '2024-01-12',
      progress: 100,
      upvotes: 8,
      location: '456 Main St, Springfield'
    },
    {
      id: 'CIT-2024-003',
      title: 'Illegal Dumping Site',
      category: 'Waste Management',
      criticality: 'low',
      status: 'pending',
      date: '2024-01-10',
      progress: 20,
      upvotes: 15,
      location: '789 Park Ave, Springfield'
    },
    {
      id: 'CIT-2024-004',
      title: 'Broken Water Pipe',
      category: 'Water Supply',
      criticality: 'high',
      status: 'acknowledged',
      date: '2024-01-08',
      progress: 40,
      upvotes: 25,
      location: '321 Elm St, Springfield'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'acknowledged': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-orange-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'acknowledged': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Reports</h1>
        <p className="text-gray-600 text-lg">Track the status of your submitted issues</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {reports.map((report) => (
          <motion.div
            key={report.id}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getCriticalityColor(report.criticality)}`} />
                <span className="text-xs font-medium text-gray-600">
                  {report.criticality.toUpperCase()} PRIORITY
                </span>
              </div>
              <Link
                to={`/user/report/${report.id}`}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Eye className="w-5 h-5" />
              </Link>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-4">Ticket ID: #{report.id}</p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>{report.category}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {getStatusIcon(report.status)}
                  <span className="capitalize">{report.status.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{report.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${report.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Submitted {new Date(report.date).toLocaleDateString()}</span>
                <span>{report.upvotes} upvotes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Reports Yet</h3>
          <p className="text-gray-600 mb-6">Start by reporting your first civic issue</p>
          <Link
            to="/user/raise-problem"
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            <span>Raise a Problem</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyReports;