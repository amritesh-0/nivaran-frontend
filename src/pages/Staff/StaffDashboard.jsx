import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ListTodo, Clock, CheckCircle, Loader } from 'lucide-react';
import { staffIssuesData, STAFF_ID } from '../../data/mockData.js';
import { Link } from 'react-router-dom';

// --- Stat Card Component ---
const StatCard = ({ icon: Icon, title, value, color, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
    >
      <div className={`p-4 rounded-full bg-${color}-100`}>
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-gray-600">{title}</p>
      </div>
    </motion.div>
  );
};

const StaffDashboard = () => {
  const myIssues = staffIssuesData.filter(issue => issue.assigned === STAFF_ID);
  
  const totalAssignedIssues = myIssues.length;
  const inProgressIssues = myIssues.filter(i => i.status === 'in-progress').length;
  const pendingIssues = myIssues.filter(i => i.status === 'assigned' || i.status === 'acknowledged').length;
  const resolvedByMeIssues = myIssues.filter(i => i.status === 'resolved-by-staff').length;

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-lg"
      >
        <div className="bg-blue-50/50 rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {STAFF_ID}!</h1>
          <p className="text-gray-600 text-lg">
            Here's a quick overview of issues assigned to you.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={ListTodo} title="Total Assigned" value={totalAssignedIssues} color="blue" delay={0.1} />
        <StatCard icon={Loader} title="In Progress" value={inProgressIssues} color="purple" delay={0.2} />
        <StatCard icon={Clock} title="Pending" value={pendingIssues} color="orange" delay={0.3} />
        <StatCard icon={CheckCircle} title="Resolved By Me" value={resolvedByMeIssues} color="green" delay={0.4} />
      </div>

      {/* Recent Issues Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
        className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <ListTodo className="w-7 h-7 text-blue-600 mr-3" />
          My Recent Issues
        </h2>
        <div className="space-y-4">
          {myIssues.slice(0, 5).map(issue => (
            <Link 
              key={issue.id} 
              to={`/staff/issues/${issue.id}`}
              className="block p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${issue.status === 'in-progress' ? 'bg-indigo-100 text-indigo-800' : 'bg-orange-100 text-orange-800'}`}>
                  {issue.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{issue.description.substring(0, 80)}...</p>
            </Link>
          ))}
          {myIssues.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p>No issues are currently assigned to you.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StaffDashboard;
