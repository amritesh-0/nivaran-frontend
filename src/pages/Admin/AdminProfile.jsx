import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, ListTodo, CheckCircle, Clock, Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Placeholder for Mock Data ---
const userData = {
  id: 'user123',
  name: 'Anjali Sharma',
  email: 'anjali.sharma@example.com',
  phone: '+91 98765 43210',
  location: 'Nadbai, Bharatpur',
};

const allIssuesData = [
  { id: 'ROAD-2024-001', title: 'Large Pothole on Oak St', category: 'Road', status: 'pending', severity: 'high', date: '2024-01-15', reporter: 'Anjali Sharma' },
  { id: 'ELEC-2024-002', title: 'Streetlight out on Main Rd', category: 'Electricity', status: 'in-progress', severity: 'medium', date: '2024-01-16', reporter: 'Rohan Verma' },
  { id: 'WATER-2024-003', title: 'Burst water pipe near market', category: 'Water', status: 'resolved', severity: 'high', date: '2024-01-17', reporter: 'Anjali Sharma' },
  { id: 'SANI-2024-004', title: 'Garbage not collected on time', category: 'Sanitation', status: 'acknowledged', severity: 'low', date: '2024-01-18', reporter: 'Anjali Sharma' },
  { id: 'ROAD-2024-005', title: 'Blocked drain on Temple St', category: 'Road', status: 'assigned', severity: 'medium', date: '2024-01-19', reporter: 'Rohan Verma' },
  { id: 'SANI-2024-006', title: 'Broken swing in public park', category: 'Sanitation', status: 'pending', severity: 'low', date: '2024-01-20', reporter: 'Anjali Sharma' },
  { id: 'ELEC-2024-007', title: 'Power outage in a residential area', category: 'Electricity', status: 'in-progress', severity: 'high', date: '2024-01-21', reporter: 'Anjali Sharma' },
  { id: 'WATER-2024-008', title: 'Leaking tap at community center', category: 'Water', status: 'resolved', severity: 'low', date: '2024-01-22', reporter: 'Rohan Verma' },
];

const getStatusPill = (status) => {
  let colorClass = '';
  let icon = null;
  switch (status) {
    case 'pending':
      colorClass = 'bg-orange-100 text-orange-800';
      icon = <Clock className="w-4 h-4 mr-1" />;
      break;
    case 'acknowledged':
    case 'assigned':
      colorClass = 'bg-blue-100 text-blue-800';
      icon = <Loader className="w-4 h-4 mr-1" />;
      break;
    case 'in-progress':
      colorClass = 'bg-indigo-100 text-indigo-800';
      icon = <Loader className="w-4 h-4 mr-1" />;
      break;
    case 'resolved':
      colorClass = 'bg-green-100 text-green-800';
      icon = <CheckCircle className="w-4 h-4 mr-1" />;
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
      break;
  }
  return (
    <span className={`flex items-center px-3 py-1 text-xs font-semibold rounded-full capitalize ${colorClass}`}>
      {icon} {status.replace('-', ' ')}
    </span>
  );
};

const UserProfile = () => {
  const [filter, setFilter] = useState('all');

  const myIssues = allIssuesData.filter(issue => issue.reporter === userData.name);
  const filteredIssues = myIssues.filter(issue => {
    if (filter === 'all') return true;
    return issue.status === filter;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your details and track your reported issues.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Details Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-lg h-min"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-500">Citizen Reporter</p>
            </div>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{userData.location}</span>
            </div>
          </div>
        </motion.div>

        {/* My Reported Issues List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
          className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <ListTodo className="w-7 h-7 text-indigo-600 mr-3" />
              My Reported Issues ({myIssues.length})
            </h2>
            <div className="flex items-center gap-2">
              {['all', 'pending', 'in-progress', 'resolved'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm capitalize ${
                    filter === status
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <Link
                  key={issue.id}
                  to={`/user/issue/${issue.id}`}
                  className="block p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{issue.title}</h3>
                    {getStatusPill(issue.status)}
                  </div>
                  <p className="text-gray-600 text-sm">{issue.category} &bull; Reported on {issue.date}</p>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No issues found for this filter.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
