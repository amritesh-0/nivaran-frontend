import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Edit3, 
  Eye,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Mock data for issues
const allIssuesData = [
  { id: 'ROAD-2024-001', title: 'Large Pothole on Oak St', category: 'Road', status: 'pending', severity: 'high', assigned: 'Unassigned', date: '2024-01-15' },
  { id: 'ELEC-2024-002', title: 'Streetlight out on Main Rd', category: 'Electricity', status: 'in-progress', severity: 'medium', assigned: 'Amit Sharma', date: '2024-01-16' },
  { id: 'WATER-2024-003', title: 'Burst water pipe near market', category: 'Water', status: 'resolved', severity: 'high', assigned: 'Priya Singh', date: '2024-01-17' },
  { id: 'SANI-2024-004', title: 'Garbage not collected on time', category: 'Sanitation', status: 'acknowledged', severity: 'low', assigned: 'Rajesh Kumar', date: '2024-01-18' },
  { id: 'ROAD-2024-005', title: 'Blocked drain on Temple St', category: 'Road', status: 'assigned', severity: 'medium', assigned: 'Rohan Verma', date: '2024-01-19' },
  { id: 'SANI-2024-006', title: 'Broken swing in public park', category: 'Sanitation', status: 'pending', severity: 'low', assigned: 'Unassigned', date: '2024-01-20' },
  { id: 'ELEC-2024-007', title: 'Power outage in a residential area', category: 'Electricity', status: 'in-progress', severity: 'high', assigned: 'Priya Singh', date: '2024-01-21' },
  { id: 'WATER-2024-008', title: 'Leaking tap at community center', category: 'Water', status: 'resolved', severity: 'low', assigned: 'Amit Sharma', date: '2024-01-22' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-orange-100 text-orange-800';
    case 'acknowledged': return 'bg-blue-100 text-blue-800';
    case 'assigned': return 'bg-purple-100 text-purple-800';
    case 'in-progress': return 'bg-indigo-100 text-indigo-800';
    case 'resolved': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'low': return 'bg-green-500 text-white';
    case 'medium': return 'bg-orange-500 text-white';
    case 'high': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const IssueManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    severity: 'all',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredIssues = allIssuesData.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || issue.status === filters.status;
    const matchesCategory = filters.category === 'all' || issue.category === filters.category;
    const matchesSeverity = filters.severity === 'all' || issue.severity === filters.severity;
    return matchesSearch && matchesStatus && matchesCategory && matchesSeverity;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <BarChart className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Issue Management</h1>
      </div>

      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full sm:w-auto px-4 py-2 pr-8 rounded-xl border border-gray-300 appearance-none bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full sm:w-auto px-4 py-2 pr-8 rounded-xl border border-gray-300 appearance-none bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="all">All Categories</option>
                <option value="Road">Road</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Sanitation">Sanitation</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <select
                name="severity"
                value={filters.severity}
                onChange={handleFilterChange}
                className="w-full sm:w-auto px-4 py-2 pr-8 rounded-xl border border-gray-300 appearance-none bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="all">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{issue.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{issue.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(issue.status)}`}>
                        {issue.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{issue.assigned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{issue.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button className="text-purple-600 hover:text-purple-900 transition-colors p-2 rounded-lg hover:bg-purple-50">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 transition-colors p-2 rounded-lg hover:bg-green-50">
                          <Check className="w-5 h-5" />
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No issues found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default IssueManagement;
