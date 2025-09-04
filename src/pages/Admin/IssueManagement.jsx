import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allIssuesData } from '../../data/mockData';
import { getStatusPill, getSeverityPill } from '../../utils/styleUtils.jsx';

const IssueManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', category: 'all', severity: 'all' });

  // ... (rest of the component logic remains the same) ...

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredIssues = allIssuesData.filter((issue) => {
    return (
      (issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.status === 'all' || issue.status === filters.status) &&
      (filters.category === 'all' || issue.category === filters.category) &&
      (filters.severity === 'all' || issue.severity === filters.severity)
    );
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-gray-900">Issue Management</h1>
        <p className="text-gray-600 font-medium">{filteredIssues.length} issues found</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        className="bg-white rounded-3xl p-6 shadow-lg"
      >
        {/* Filter and Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or ID..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 border bg-gray-50 focus:ring-2 focus:ring-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {['status', 'category', 'severity'].map((filterName) => (
            <div key={filterName} className="relative">
              <select
                name={filterName}
                value={filters[filterName]}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 pr-8 rounded-xl border-gray-200 border bg-gray-50 appearance-none focus:ring-2 focus:ring-blue-500 transition capitalize"
              >
                <option value="all">All {filterName}</option>
                {[...new Set(allIssuesData.map((item) => item[filterName]))].map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Issues Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Issue', 'Category', 'Severity', 'Status', 'Assigned To', 'Date', ''].map((header) => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{issue.title}</div>
                      <div className="text-xs text-gray-500">{issue.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getSeverityPill(issue.severity)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(issue.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.assigned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        to={`/admin/issue/${issue.id}`}
                        className="inline-flex items-center p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    No issues found matching your criteria.
                  </td>
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