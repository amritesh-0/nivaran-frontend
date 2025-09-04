import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, BarChart2, Users, Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Mock data for issues with added latitude and longitude
const allIssuesData = [
  { id: 'ROAD-2024-001', title: 'Large Pothole on Oak St', description: 'Massive pothole causing traffic jams.', category: 'Road', status: 'pending', severity: 'high', assigned: 'Unassigned', date: '2024-01-15', lat: 26.8500, lng: 75.8300 },
  { id: 'ELEC-2024-002', title: 'Streetlight out on Main Rd', description: 'Streetlight has been off for three nights.', category: 'Electricity', status: 'in-progress', severity: 'medium', assigned: 'Amit Sharma', date: '2024-01-16', lat: 26.8550, lng: 75.8450 },
  { id: 'WATER-2024-003', title: 'Burst water pipe near market', description: 'A water pipe has burst near the central market.', category: 'Water', status: 'resolved', severity: 'high', assigned: 'Priya Singh', date: '2024-01-17', lat: 26.8400, lng: 75.8200 },
  { id: 'SANI-2024-004', title: 'Garbage not collected on time', description: 'Bins are overflowing in the neighborhood.', category: 'Sanitation', status: 'acknowledged', severity: 'low', assigned: 'Rajesh Kumar', date: '2024-01-18', lat: 26.8650, lng: 75.8550 },
  { id: 'ROAD-2024-005', title: 'Blocked drain on Temple St', description: 'A drain is completely blocked, causing water to pool on the road.', category: 'Road', status: 'assigned', severity: 'medium', assigned: 'Rohan Verma', date: '2024-01-19', lat: 26.8480, lng: 75.8380 },
  { id: 'SANI-2024-006', title: 'Broken swing in public park', description: 'A swing in the public park has a broken chain.', category: 'Sanitation', status: 'pending', severity: 'low', assigned: 'Unassigned', date: '2024-01-20', lat: 26.8600, lng: 75.8400 },
  { id: 'ELEC-2024-007', title: 'Power outage in a residential area', description: 'Power is out in a large residential block.', category: 'Electricity', status: 'in-progress', severity: 'high', assigned: 'Priya Singh', date: '2024-01-21', lat: 26.8520, lng: 75.8350 },
  { id: 'WATER-2024-008', title: 'Leaking tap at community center', description: 'Leaking tap causing a lot of water wastage.', category: 'Water', status: 'resolved', severity: 'low', assigned: 'Amit Sharma', date: '2024-01-22', lat: 26.8450, lng: 75.8250 },
];

// Custom icons for map markers based on severity
const createSeverityIcon = (severity) => {
  let colorClass = '';
  switch (severity) {
    case 'high':
      colorClass = 'bg-red-500';
      break;
    case 'medium':
      colorClass = 'bg-orange-500';
      break;
    case 'low':
      colorClass = 'bg-green-500';
      break;
    default:
      colorClass = 'bg-gray-500';
  }
  return new Icon({
    iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/%3E%3Ccircle cx='12' cy='9' r='3'/%3E%3C/svg%3E`,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    className: `${colorClass} p-1 rounded-full border-2 border-white shadow-lg`,
  });
};

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


const AdminDashboard = () => {
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredIssues = allIssuesData.filter(issue => {
    return severityFilter === 'all' || issue.severity === severityFilter;
  });

  // Calculate issue counts for stats
  const totalIssues = allIssuesData.length;
  const pendingIssues = allIssuesData.filter(issue => issue.status === 'pending').length;
  const resolvedIssues = allIssuesData.filter(issue => issue.status === 'resolved').length;
  const inProgressIssues = allIssuesData.filter(issue => issue.status === 'in-progress').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <BarChart2 className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Stats Cards */}
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Issues</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalIssues}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending Issues</p>
              <h3 className="text-2xl font-bold text-gray-900">{pendingIssues}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Bell className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">In Progress</p>
              <h3 className="text-2xl font-bold text-gray-900">{inProgressIssues}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Resolved</p>
              <h3 className="text-2xl font-bold text-gray-900">{resolvedIssues}</h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-purple-600" />
            <span>Issue Locations</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSeverityFilter('all')}
              className={`px-4 py-2 rounded-xl transition-colors font-medium ${severityFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setSeverityFilter('high')}
              className={`px-4 py-2 rounded-xl transition-colors font-medium ${severityFilter === 'high' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              High
            </button>
            <button
              onClick={() => setSeverityFilter('medium')}
              className={`px-4 py-2 rounded-xl transition-colors font-medium ${severityFilter === 'medium' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Medium
            </button>
            <button
              onClick={() => setSeverityFilter('low')}
              className={`px-4 py-2 rounded-xl transition-colors font-medium ${severityFilter === 'low' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Low
            </button>
          </div>
        </div>
        
        <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200">
          <MapContainer center={[26.8500, 75.8300]} zoom={13} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredIssues.map(issue => (
              <Marker
                key={issue.id}
                position={[issue.lat, issue.lng]}
                icon={createSeverityIcon(issue.severity)}
              >
                <Popup className="rounded-lg shadow-md">
                  <div className="font-sans">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{issue.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`px-2 py-1 rounded-full font-semibold ${getStatusColor(issue.status)}`}>
                        {issue.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full font-semibold ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                    <Link to={`/admin/issue/${issue.id}`} className="mt-3 inline-block px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
