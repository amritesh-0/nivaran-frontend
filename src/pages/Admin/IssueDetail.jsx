import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Circle,
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Mock data for issues and staff
const allIssuesData = [
    { id: 'ROAD-2024-001', title: 'Large Pothole on Oak St', description: 'There is a massive pothole in the middle of Oak St, near the cross-section with Elm St. It is causing traffic jams and is dangerous for two-wheelers. It has been there for over a week.', category: 'Road', status: 'pending', severity: 'high', assigned: 'Unassigned', date: '2024-01-15' },
    { id: 'ELEC-2024-002', title: 'Streetlight out on Main Rd', description: 'The streetlight in front of house number 123 on Main Road has been off for three nights now, making the area very dark and unsafe.', category: 'Electricity', status: 'in-progress', severity: 'medium', assigned: 'Amit Sharma', date: '2024-01-16' },
    { id: 'WATER-2024-003', title: 'Burst water pipe near market', description: 'A water pipe has burst near the central market, leading to a large amount of water being wasted and flooding the area. It needs urgent attention.', category: 'Water', status: 'resolved', severity: 'high', assigned: 'Priya Singh', date: '2024-01-17' },
    { id: 'SANI-2024-004', title: 'Garbage not collected on time', description: 'The weekly garbage collection has been delayed for the past two weeks. The bins are overflowing and it is causing a foul smell in the neighborhood.', category: 'Sanitation', status: 'acknowledged', severity: 'low', assigned: 'Rajesh Kumar', date: '2024-01-18' },
    { id: 'ROAD-2024-005', title: 'Blocked drain on Temple St', description: 'A drain on Temple Street is completely blocked, causing water to pool on the road during rain. This is a recurring issue in this area.', category: 'Road', status: 'assigned', severity: 'medium', assigned: 'Rohan Verma', date: '2024-01-19' },
];

const staffData = [
  { id: 'staff1', name: 'Amit Sharma', department: 'Electricity' },
  { id: 'staff2', name: 'Priya Singh', department: 'Water' },
  { id: 'staff3', name: 'Rajesh Kumar', department: 'Sanitation' },
  { id: 'staff4', name: 'Rohan Verma', department: 'Road' },
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

const IssueDetail = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const issue = allIssuesData.find(i => i.id === issueId);

  const [selectedStaff, setSelectedStaff] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  if (!issue) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Issue Not Found</h2>
          <p className="text-gray-600 mt-2">The issue you are looking for does not exist.</p>
          <button onClick={() => navigate(-1)} className="mt-6 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">Go Back</button>
        </div>
      </div>
    );
  }

  const handleAssign = () => {
    // In a real app, this would update the issue in Firestore
    console.log(`Assigning issue ${issue.id} to staff with ID: ${selectedStaff}`);
    setMessage(`Issue successfully assigned to staff!`);
    setShowMessage(true);
  };

  const handleResolve = () => {
    // In a real app, this would update the issue status to 'resolved' in Firestore
    console.log(`Resolving issue ${issue.id}`);
    setMessage(`Issue successfully marked as resolved!`);
    setShowMessage(true);
  };

  const statusTimeline = [
    { date: '2024-01-15', status: 'Pending', description: 'Issue reported by a user.' },
    { date: '2024-01-16', status: 'Acknowledged', description: 'Admin acknowledged the issue.' },
    { date: '2024-01-17', status: 'Assigned', description: `Assigned to ${issue.assigned}.` },
  ];

  if (issue.status === 'resolved') {
      statusTimeline.push({
          date: issue.date,
          status: 'Resolved',
          description: 'The issue was confirmed as resolved by the admin.'
      });
  }

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Issue Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Issue Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">{issue.title}</h2>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(issue.status)}`}>
              {issue.status.replace('-', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-semibold text-gray-900">Issue ID:</span> {issue.id}</p>
            <p><span className="font-semibold text-gray-900">Category:</span> {issue.category}</p>
            <p><span className="font-semibold text-gray-900">Reported On:</span> {issue.date}</p>
            <div className="flex items-center space-x-2">
                <p className="font-semibold text-gray-900">Severity:</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                    {issue.severity}
                </span>
            </div>
            <p><span className="font-semibold text-gray-900">Assigned To:</span> {issue.assigned}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{issue.description}</p>
          </div>
          
          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            {issue.status !== 'resolved' && (
              <button
                onClick={handleResolve}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark as Resolved</span>
              </button>
            )}
            <Link
              to="/admin/issue-management"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Back to Issues</span>
            </Link>
          </div>
        </div>

        {/* Sidebar: Assign Staff & Timeline */}
        <div className="lg:col-span-1 space-y-8">
          {/* Assign Staff Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-purple-600" />
              <span>Assign Staff</span>
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <select
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none"
                >
                  <option value="" disabled>Select a staff member</option>
                  {staffData.map(staff => (
                    <option key={staff.id} value={staff.id}>{staff.name} ({staff.department})</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <span className="w-4 h-4">▼</span>
                </div>
              </div>
              <button
                onClick={handleAssign}
                disabled={!selectedStaff}
                className={`w-full px-4 py-3 text-white rounded-lg shadow-md transition-colors font-medium flex items-center justify-center space-x-2 ${
                  selectedStaff ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Assign Issue</span>
              </button>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>Status Timeline</span>
            </h3>
            <div className="relative pl-4">
              {statusTimeline.map((item, index) => (
                <div key={index} className="flex items-start mb-6 last:mb-0">
                  <div className="absolute left-0 top-0 h-full w-px bg-gray-300" />
                  <div className="absolute left-0 -translate-x-1/2 rounded-full p-1 bg-white border-2 border-indigo-500">
                    <Circle className="w-2 h-2 fill-indigo-500 text-transparent" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-900">{item.status}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowMessage(false)}
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-sm w-full space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">Success!</h3>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => setShowMessage(false)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IssueDetail;
