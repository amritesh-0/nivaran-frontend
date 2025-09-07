import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Camera,
  User,
  Shield,
  TrendingUp,
  Eye,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icon issue with Webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const pageTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

// Helper function to parse coordinates string
const parseCoordinates = (coordString) => {
  if (!coordString) return null;
  const parts = coordString.match(/(\d+\.\d+)° ([NS]), (\d+\.\d+)° ([EW])/);
  if (!parts) return null;
  
  const lat = parseFloat(parts[1]) * (parts[2] === 'S' ? -1 : 1);
  const lng = parseFloat(parts[3]) * (parts[4] === 'W' ? -1 : 1);
  
  return [lat, lng];
};

// New reusable ProgressTimeline component
const ProgressTimeline = ({ timeline }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Progress Timeline</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <motion.div key={index} variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }} className="flex space-x-4">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.completed 
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md' 
                  : index === timeline.findIndex(t => !t.completed)
                  ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white animate-pulse shadow-md'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {item.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
              {index < timeline.length - 1 && (
                <div className="relative h-8 mt-2">
                  {/* Background line - now w-1 (thicker) */}
                  <div className="w-1 absolute left-1/2 -translate-x-1/2 top-0 bottom-0 bg-gray-200" />
                  <AnimatePresence>
                    {item.completed && (
                      <motion.div 
                        // Animated line - now w-1 (thicker)
                        className="w-1 absolute left-1/2 -translate-x-1/2 top-0 bottom-0 bg-blue-400"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        // Faster duration and adjusted delay
                        transition={{ duration: 0.5, delay: index * 0.4 }} 
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            <div className="flex-1 pb-8">
              <p className={`font-semibold capitalize ${
                item.completed ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {item.status.replace('-', ' ')}
              </p>
              <p className="text-sm text-gray-600 mb-1">{item.description}</p>
              {item.date && (
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(item.date)}</span>
                  <span>by {item.by}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};



// New component for the official progress view
const OfficialProgressView = ({ staffUpdates, timeline, onBack }) => (
  <motion.div
    key="staff-updates-view"
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ type: 'tween', duration: 0.3 }}
    className="space-y-6 lg:space-y-8"
  >
    <button
      onClick={onBack}
      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back to Issue Details</span>
    </button>

    {/* Official Progress & Updates */}
    <motion.div variants={sectionVariants} className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Official Progress & Updates</h3>
      </div>
      <div className="space-y-6">
        {staffUpdates.map((update, index) => (
          <motion.div
            key={update.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-400"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-blue-900">{update.title}</h4>
              <span className="text-sm text-gray-500">{formatTimeAgo(update.date)}</span>
            </div>
            {update.image && (
              <img
                src={update.image}
                alt={update.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}
            <p className="text-gray-700 leading-relaxed mb-4">{update.description}</p>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>Posted by {update.by}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Progress Timeline (on staff updates view) */}
    <ProgressTimeline timeline={timeline} />
  </motion.div>
);

const ReportDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(47);
  const [showStaffUpdates, setShowStaffUpdates] = useState(false);

  // Mock detailed report data
  const report = useMemo(() => ({
    id: id || 'CIT-2024-001',
    title: 'Large Pothole on Oak Street',
    category: 'Road & Infrastructure',
    criticality: 'high',
    status: 'in-progress',
    description: 'There is a large pothole on Oak Street near the intersection with Main Street. The hole is approximately 2 feet wide and 8 inches deep. It\'s causing damage to vehicles and poses a serious safety hazard, especially during night hours. Multiple cars have already suffered tire damage.',
    location: '123 Oak St, Springfield',
    coordinates: '39.7817° N, 89.6501° W',
    digipinCode: 'DIG-4156-8234',
    submittedDate: '2024-01-15T10:30:00Z',
    submittedBy: 'John Citizen',
    image: 'https://images.pexels.com/photos/163016/crash-test-collision-60-km-h-distraction-163016.jpeg?auto=compress&cs=tinysrgb&w=800',
    assignedDepartment: 'Road & Infrastructure Department',
    estimatedResolution: '2024-01-25',
    views: 156
  }), [id]);

  const timeline = [
    { 
      status: 'submitted', 
      date: '2024-01-15T10:30:00Z', 
      completed: true,
      description: 'Problem reported by citizen',
      by: 'John Citizen'
    },
    { 
      status: 'acknowledged', 
      date: '2024-01-15T14:20:00Z', 
      completed: true,
      description: 'Issue acknowledged by department',
      by: 'Road Dept Admin'
    },
    { 
      status: 'assigned', 
      date: '2024-01-16T09:15:00Z', 
      completed: true,
      description: 'Assigned to maintenance crew #7',
      by: 'Road Dept Admin'
    },
    { 
      status: 'in-progress', 
      date: '2024-01-17T08:00:00Z', 
      completed: true,
      description: 'Repair work has begun',
      by: 'Maintenance Crew #7'
    },
    { 
      status: 'resolved', 
      date: '', 
      completed: false,
      description: 'Issue will be marked as resolved',
      by: ''
    }
  ];

  const comments = [
    {
      id: 1,
      author: 'Sarah Johnson',
      date: '2024-01-15T16:45:00Z',
      message: 'I also hit this pothole yesterday and damaged my tire. This needs urgent attention!',
      isAdmin: false,
      upvotes: 8
    },
    {
      id: 2,
      author: 'Road Dept Admin',
      date: '2024-01-15T17:30:00Z',
      message: 'Thank you for reporting this issue. We have scheduled an inspection for tomorrow morning and will prioritize the repair based on the severity.',
      isAdmin: true,
      upvotes: 12
    },
    {
      id: 3,
      author: 'Mike Chen',
      date: '2024-01-16T12:20:00Z',
      message: 'Any update on when this will be fixed? The hole seems to be getting bigger.',
      isAdmin: false,
      upvotes: 5
    },
    {
      id: 4,
      author: 'Road Dept Admin',
      date: '2024-01-17T08:30:00Z',
      message: 'Update: Our crew has arrived on site and repair work is now in progress. Expected completion by end of week.',
      isAdmin: true,
      upvotes: 15
    },
    {
      id: 5,
      author: 'Lisa Rodriguez',
      date: '2024-01-17T14:15:00Z',
      message: 'Great to see quick action! Thank you for the updates.',
      isAdmin: false,
      upvotes: 3
    }
  ];

  // Mock data for staff updates
  const staffUpdates = [
    {
      id: 1,
      title: 'Initial Site Inspection',
      description: 'A team member performed an on-site inspection of the pothole and confirmed its severity. We have scheduled a crew to begin repairs.',
      image: 'https://images.pexels.com/photos/5926527/pexels-photo-5926527.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-16T10:00:00Z',
      by: 'Road & Infrastructure Dept'
    },
    {
      id: 2,
      title: 'Repair Work Has Begun',
      description: 'The maintenance crew has arrived on site. They are currently preparing the area for asphalt paving. We expect to fill the pothole within the next few hours.',
      image: 'https://images.pexels.com/photos/4037803/pexels-photo-4037803.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-17T08:30:00Z',
      by: 'Road & Infrastructure Dept'
    }
  ];

  const handleUpvote = () => {
    setHasUpvoted(!hasUpvoted);
    setUpvotes(hasUpvoted ? upvotes - 1 : upvotes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Add comment logic here
      setComment('');
    }
  };

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'low': return 'bg-green-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'high': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
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
  
  const position = useMemo(() => parseCoordinates(report.coordinates), [report.coordinates]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 relative">
      {/* Back Navigation - Always visible */}
      <Link 
        to="/user/my-reports"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Reports</span>
      </Link>

      <AnimatePresence mode="wait">
        {showStaffUpdates ? (
          <motion.div
            key="staff-updates-view"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <OfficialProgressView 
              staffUpdates={staffUpdates}
              timeline={timeline}
              onBack={() => setShowStaffUpdates(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-view"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Main Content (left column on desktop, full width on mobile) */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Report Header */}
              <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{report.title}</h1>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCriticalityColor(report.criticality)}`}>
                        {report.criticality.charAt(0).toUpperCase() + report.criticality.slice(1)} Priority
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600 mb-3 text-sm">
                      <span className="font-medium">Ticket ID: #{report.id}</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{report.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(report.submittedDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Reported by {report.submittedBy}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-medium ${getStatusColor(report.status)} text-center`}>
                    {report.status.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <p className="font-medium text-gray-900">{report.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Digipin Code:</span>
                      <p className="font-medium text-gray-900">{report.digipinCode}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <p className="font-medium text-gray-900">{report.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Assigned to:</span>
                      <p className="font-medium text-gray-900">{report.assignedDepartment}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Problem Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{report.description}</p>
                </div>

                {/* Upvote and Official Progress Buttons */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                    <motion.button
                        onClick={handleUpvote}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        hasUpvoted
                            ? 'bg-red-100 text-red-600 shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 hover:shadow-md'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${hasUpvoted ? 'fill-current' : ''}`} />
                        <span>Upvote ({upvotes})</span>
                    </motion.button>
                    
                    <motion.button
                        onClick={() => setShowStaffUpdates(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-50 border border-blue-300 text-blue-800 py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:bg-blue-100 transition-colors duration-200 shadow-md"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        <span>View Official Progress</span>
                    </motion.button>
                </div>

              </motion.div>

              {/* Problem Image */}
              <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-900">Problem Photo</h3>
                </div>
                <div className="relative">
                  <img
                    src={report.image}
                    alt="Problem location"
                    className="w-full rounded-xl shadow-md"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                    Captured: {formatDate(report.submittedDate)}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar (right column on desktop, stacked on mobile) */}
            <div className="space-y-6 lg:space-y-8">
              {/* Progress Timeline (on main view) */}
              <ProgressTimeline timeline={timeline} />
              {/* Location Details */}
              <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Location Details</h3>
                {position ? (
                  <MapContainer
                    center={position}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="h-48 rounded-xl shadow-inner"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                      <Popup>{report.location}</Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl">
                    <p className="text-gray-500">Map unavailable</p>
                  </div>
                )}
                <div className="space-y-2 text-sm mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="font-medium text-gray-900">{report.coordinates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Digipin:</span>
                    <span className="font-medium text-gray-900">{report.digipinCode}</span>
                  </div>
                </div>
              </motion.div>

              {/* Department Info */}
              <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Department Response</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">{report.assignedDepartment}</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Estimated Resolution:</span> {new Date(report.estimatedResolution).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to="/user/departments"
                    className="block w-full text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-md"
                  >
                    Contact Department
                  </Link>
                </div>
              </motion.div>

              
            </div>
            {/* Community Comments */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Community Comments</h3>
                
                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      J
                    </div>
                    <div className="flex-1 flex space-x-3">
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add your comment or ask for updates..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                      />
                      <motion.button
                        type="submit"
                        disabled={!comment.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      >
                        <Send className="w-4 h-4" />
                        <span>Post</span>
                      </motion.button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <motion.div key={comment.id} variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          comment.isAdmin ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-600'
                        }`}>
                          {comment.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{comment.author}</span>
                            {comment.isAdmin && (
                              <div className="flex items-center space-x-1">
                                <Shield className="w-4 h-4 text-blue-600" />
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                  Official
                                </span>
                              </div>
                            )}
                            <span className="text-sm text-gray-500">{formatTimeAgo(comment.date)}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{comment.message}</p>
                          <div className="flex items-center space-x-4">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{comment.upvotes}</span>
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
                            >
                              Reply
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportDetail;