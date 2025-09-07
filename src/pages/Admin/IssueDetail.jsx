import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, CheckCircle, CalendarCheck, MapPin, Tag, ThumbsUp, Calendar, Info, Users, Image, MessageSquare, Clock, AlertCircle, X, Camera, FileText as Film, Send
} from 'lucide-react';
import { getStatusPill, getSeverityPill } from '../../utils/styleUtils';

// --- Mock Data ---
const mockData = {
  issues: [
    {
      id: 'ROAD-2024-001',
      title: 'Large Pothole on Oak St',
      description: 'There is a massive pothole in the middle of Oak St, near the cross-section with Elm St. It is causing traffic jams and is dangerous for two-wheelers. It has been there for over a week.',
      category: 'Road',
      status: 'pending',
      severity: 'high',
      assigned: 'Unassigned',
      date: '2024-01-15',
      reporter: 'Rohan Verma',
      upvotes: 21,
      image: 'https://placehold.co/800x600/b0bec5/ffffff?text=Pothole+Image',
      location: 'Nadbai, Bharatpur',
      timeline: [
        { status: 'reported', date: '2024-01-15T10:00:00Z', description: 'Issue was reported by Rohan Verma.' }
      ],
      staffUpdates: [],
      deadline: null
    },
    {
      id: 'ELEC-2024-002',
      title: 'Streetlight out on Main Rd',
      description: 'The streetlight in front of house number 123 on Main Road has been off for three nights now, making the area very dark and unsafe.',
      category: 'Electricity',
      status: 'in-progress',
      severity: 'medium',
      assigned: 'Amit Sharma',
      date: '2024-01-16',
      reporter: 'Priya Singh',
      upvotes: 12,
      image: 'https://placehold.co/800x600/546e7a/ffffff?text=Broken+Streetlight',
      location: 'Nadbai, Bharatpur',
      timeline: [
        { status: 'reported', date: '2024-01-16T11:30:00Z', description: 'Issue was reported by Priya Singh.' },
        { status: 'acknowledged', date: '2024-01-16T12:00:00Z', description: 'Admin has acknowledged the issue.' },
        { status: 'assigned', date: '2024-01-16T14:45:00Z', description: 'Assigned to Amit Sharma.' }
      ],
      comments: [
        { author: 'System', text: 'Issue was reported.', date: '2024-01-16T11:30:00Z' },
        { author: 'Admin', text: 'Acknowledged and assigned to a team.', date: '2024-01-16T14:45:00Z' },
        { author: 'Amit Sharma', text: 'On my way to inspect the site.', date: '2024-01-16T15:30:00Z' }
      ],
      staffUpdates: [
        {
          type: 'image',
          date: '2024-01-16T16:00:00Z',
          content: 'https://placehold.co/800x600/c0c0c0/000000?text=Staff+Update+1',
          description: 'Initial inspection of the area completed. Identifying the fault.'
        },
        {
          type: 'text',
          date: '2024-01-16T17:30:00Z',
          content: 'Fault has been located. Awaiting a new bulb from the depot.',
        }
      ],
      deadline: null
    },
    {
      id: 'WATER-2024-003',
      title: 'Burst water pipe near market',
      description: 'A water pipe has burst near the central market, leading to a large amount of water being wasted and flooding the area. It needs urgent attention.',
      category: 'Water',
      status: 'resolved',
      severity: 'high',
      assigned: 'Priya Singh',
      date: '2024-01-17',
      reporter: 'Rajesh Kumar',
      upvotes: 35,
      image: 'https://placehold.co/800x600/78909c/ffffff?text=Water+Pipe+Burst',
      location: 'Nadbai, Bharatpur',
      timeline: [
        { status: 'reported', date: '2024-01-17T08:00:00Z', description: 'Issue was reported.' },
        { status: 'acknowledged', date: '2024-01-17T08:15:00Z', description: 'Admin acknowledged the issue.' },
        { status: 'assigned', date: '2024-01-17T08:30:00Z', description: 'Assigned to Priya Singh.' },
        { status: 'resolved', date: '2024-01-17T12:45:00Z', description: 'The water pipe has been repaired and the issue is resolved.' }
      ],
      comments: [
        { author: 'System', text: 'Issue was reported.', date: '2024-01-17T08:00:00Z' },
        { author: 'Admin', text: 'Team is on site, should be resolved soon.', date: '2024-01-17T09:30:00Z' },
        { author: 'Priya Singh', text: 'Repair work is complete. Closing this ticket.', date: '2024-01-17T12:45:00Z' }
      ],
      staffUpdates: [
        {
          type: 'image',
          date: '2024-01-17T09:00:00Z',
          content: 'https://placehold.co/800x600/c0c0c0/000000?text=Staff+Update+1',
          description: 'Starting repair work on the burst pipe. The area is cordoned off.'
        },
        {
          type: 'image',
          date: '2024-01-17T11:00:00Z',
          content: 'https://placehold.co/800x600/c0c0c0/000000?text=Staff+Update+2',
          description: 'The new pipe section has been installed and is being tested for leaks.'
        },
        {
          type: 'text',
          date: '2024-01-17T12:30:00Z',
          content: 'All checks are complete. The repair is successful. The area is being cleaned up.',
        }
      ],
      deadline: null
    }
  ],
  staff: [
    { id: 'staff1', name: 'Amit Sharma', department: 'Electricity' },
    { id: 'staff2', name: 'Priya Singh', department: 'Water' },
    { id: 'staff3', name: 'Rajesh Kumar', department: 'Sanitation' },
    { id: 'staff4', name: 'Rohan Verma', department: 'Road' },
  ]
};

const formatReadableDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const InfoCard = ({ icon: Icon, label, value, children }) => (
  <div className="flex items-start">
    <Icon className="w-5 h-5 text-gray-500 mt-1 mr-4 flex-shrink-0" />
    <div>
      <p className="font-semibold text-gray-900">{label}</p>
      {value ? <p className="text-gray-700">{value}</p> : children}
    </div>
  </div>
);

const StaffUpdatesSection = ({ updates, onBack, onUpdateRequest, isUpdateDisabled, assignedStaff }) => (
  <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    transition={{ type: 'tween', duration: 0.3 }}
    className="bg-gray-50 min-h-screen py-8 font-sans absolute inset-0 z-40 px-4 md:px-8 overflow-y-auto"
  >
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6 md:mb-8 sticky top-0 bg-gray-50 z-50 py-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Issue Details
        </button>
        <button
          onClick={onUpdateRequest}
          disabled={isUpdateDisabled}
          className="flex items-center gap-x-1 px-4 py-3 text-sm bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          title={`Request a new update from ${assignedStaff}`}
        >
          <Send className="w-4 h-4" />
          Request Update
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Staff Updates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Updated with a responsive grid */}
          {updates?.length > 0 ? (
            updates.map((update, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 flex flex-col">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="font-semibold text-gray-800 flex items-center gap-x-1">
                    {update.type === 'image' ? <Camera className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                    {update.type === 'image' ? 'Image Update' : 'Text Update'}
                  </span>
                  <span>{formatReadableDate(update.date)}</span>
                </div>
                {update.type === 'image' && (
                  <img
                    src={update.content}
                    alt="Staff update"
                    className="w-full h-auto object-cover rounded-lg my-3" // The w-full ensures it takes full width of the grid item
                  />
                )}
                <p className="text-gray-700 flex-grow">{update.description || update.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-8 col-span-full">No staff updates available for this issue yet.</p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const IssueDetail = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const initialIssue = mockData.issues.find((i) => i.id === issueId);

  const [currentIssue, setCurrentIssue] = useState(initialIssue);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [newComment, setNewComment] = useState('');
  const [deadline, setDeadline] = useState(initialIssue?.deadline ? new Date(initialIssue.deadline).toISOString().slice(0, 10) : '');
  const [isViewingStaffUpdates, setIsViewingStaffUpdates] = useState(false);

  if (!currentIssue) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Issue Not Found</h2>
          <p className="text-gray-600 mt-2">The issue you are looking for does not exist.</p>
          <button onClick={() => navigate(-1)} className="mt-6 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">Go Back</button>
        </div>
      </div>
    );
  }

  const handleAction = (status, assignedStaff = '') => {
    const newTimelineEvent = {
      status: status.replace('-', '_'),
      date: new Date().toISOString(),
      description: assignedStaff ? `Assigned to ${assignedStaff}.` : `Status updated to ${status}.`
    };
    setCurrentIssue(prev => ({
      ...prev,
      status: status,
      assigned: assignedStaff || prev.assigned,
      timeline: [...(prev.timeline || []), newTimelineEvent]
    }));
  };

  const handleAssign = () => {
    const staffMember = mockData.staff.find(s => s.id === selectedStaff);
    if (!staffMember) return;
    handleAction('assigned', staffMember.name);
  };

  const handleAcknowledge = () => {
    handleAction('acknowledged');
  };

  const handleResolve = () => {
    handleAction('resolved');
  };

  const handleSetDeadline = () => {
    if (!deadline) return;
    setCurrentIssue(prev => ({ ...prev, deadline: new Date(deadline).toISOString() }));
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      author: 'Admin',
      text: newComment,
      date: new Date().toISOString()
    };
    setCurrentIssue(prev => ({
      ...prev,
      comments: [...(prev.comments || []), comment]
    }));
    setNewComment('');
  };

  const handleRequestUpdate = () => {
    console.log(`Admin requested an update for issue ${currentIssue.id} from staff ${currentIssue.assigned}`);
    alert(`Update request sent to ${currentIssue.assigned}!`);

    const newTimelineEvent = {
      status: 'update_requested',
      date: new Date().toISOString(),
      description: `Admin requested an update from ${currentIssue.assigned}.`
    };
    setCurrentIssue(prev => ({
      ...prev,
      timeline: [...(prev.timeline || []), newTimelineEvent]
    }));
  };

  const isUpdateDisabled = !currentIssue.assigned || currentIssue.status === 'resolved' || currentIssue.assigned === 'Unassigned';

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans relative overflow-hidden">
      <AnimatePresence>
        {isViewingStaffUpdates ? (
          <StaffUpdatesSection
            key="staffUpdates"
            updates={currentIssue.staffUpdates}
            onBack={() => setIsViewingStaffUpdates(false)}
            onUpdateRequest={handleRequestUpdate}
            isUpdateDisabled={isUpdateDisabled}
            assignedStaff={currentIssue.assigned}
          />
        ) : (
          <motion.div
            key="issueDetail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 md:px-8"
          >
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to All Issues
              </button>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{currentIssue.title}</h1>
                <div className="mt-2 md:mt-0 flex items-center gap-x-2">
                  {getStatusPill(currentIssue.status)}
                  {getSeverityPill(currentIssue.severity)}
                </div>
              </div>
            </motion.div>

            {/* Main content area, with left and right columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Issue Info, Image & Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Main Issue Details - Changed padding from p-8 to p-6 */}
                <div className="bg-white rounded-3xl p-6 shadow-lg space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Issue Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                    <InfoCard icon={Info} label="Issue ID" value={currentIssue.id} />
                    <InfoCard icon={Calendar} label="Reported On" value={currentIssue.date} />
                    <InfoCard icon={Tag} label="Category" value={currentIssue.category} />
                    <InfoCard icon={User} label="Reported By" value={currentIssue.reporter} />
                    <InfoCard icon={MapPin} label="Location" value={currentIssue.location} />
                    <InfoCard icon={ThumbsUp} label="Upvotes" value={`${currentIssue.upvotes}`} />
                  </div>
                </div>

                {/* Image & Description */}
                <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-x-2">
                    <Image className="w-6 h-6 text-gray-500" />
                    Evidence & Description
                  </h3>
                  <img src={currentIssue.image} alt={currentIssue.title} className="w-full h-auto rounded-2xl object-cover shadow-md" />
                  <div>
                    <p className="text-gray-700 leading-relaxed">{currentIssue.description}</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Actions & Timeline */}
              <div className="lg:col-span-1 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                  className="bg-white rounded-3xl p-8 shadow-lg space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Admin Actions</h3>
                    <button
                      onClick={handleRequestUpdate}
                      disabled={isUpdateDisabled}
                      className="flex items-center gap-x-1 px-4 py-3 text-sm bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                      title={`Request a new update from ${currentIssue.assigned}`}
                    >
                      <Send className="w-4 h-4" />
                      Request Update
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Staff Updates Section */}
                    <button
                      onClick={() => setIsViewingStaffUpdates(true)}
                      className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all"
                    >
                      View Staff Updates
                    </button>

                    {/* Assign Staff */}
                    <div className="space-y-2">
                      <label className="font-semibold text-gray-800 flex items-center"><Users className="w-5 h-5 mr-2" /> Assign Staff</label>
                      <select
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-gray-200 border bg-gray-50 appearance-none focus:ring-2 focus:ring-blue-500 transition"
                        disabled={currentIssue.status === 'resolved'}
                      >
                        <option value="" disabled>Select a staff member...</option>
                        {mockData.staff.map((staff) => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAssign}
                        disabled={!selectedStaff || currentIssue.status === 'resolved' || currentIssue.status === 'assigned'}
                        className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Assign Issue
                      </button>
                    </div>

                    {/* Acknowledge Issue */}
                    <div className="space-y-2">
                      <button
                        onClick={handleAcknowledge}
                        disabled={currentIssue.status !== 'pending'}
                        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Acknowledge Issue
                      </button>
                    </div>

                    {/* Set Deadline */}
                    <div className="space-y-2">
                      <label className="font-semibold text-gray-800 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Set Deadline
                      </label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-gray-200 border bg-gray-50 focus:ring-2 focus:ring-blue-500 transition"
                        disabled={currentIssue.status === 'resolved'}
                      />
                      <button
                        onClick={handleSetDeadline}
                        disabled={!deadline || currentIssue.status === 'resolved'}
                        className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-x-2"
                      >
                        <CalendarCheck className="w-5 h-5" />
                        Set Deadline
                      </button>
                      {currentIssue.deadline && (
                        <p className="text-sm text-gray-600 mt-2">Current deadline: {new Date(currentIssue.deadline).toLocaleDateString()}</p>
                      )}
                    </div>

                    {/* Mark as Resolved */}
                    <div className="space-y-2">
                      <button
                        onClick={handleResolve}
                        disabled={currentIssue.status === 'resolved'}
                        className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Mark as Resolved
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Progress Timeline */}
                <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-x-2">
                    <Clock className="w-6 h-6 text-indigo-600" />
                    Progress Timeline
                  </h3>
                  <div className="relative pl-4">
                    {currentIssue.timeline?.map((item, index) => (
                      <div key={index} className="flex items-start mb-6 last:mb-0">
                        {index < (currentIssue.timeline?.length || 0) - 1 && (
                          <div className="absolute left-0 top-0 h-full w-px bg-gray-300 transform translate-x-1/2" />
                        )}
                        <div className="relative z-10 p-1 bg-white rounded-full">
                          <div className="w-3 h-3 rounded-full bg-indigo-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium text-gray-900 capitalize">{item.status.replace('_', ' ')}</p>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatReadableDate(item.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Moved Comments Section to the very end of the main grid */}
            <div className="mt-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-x-2">
                  <MessageSquare className="w-6 h-6 text-gray-500" />
                  Comments
                </h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {currentIssue.comments?.map((comment, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-100 border border-gray-200">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                        <span className="font-semibold text-gray-800">{comment.author}</span>
                        <span>{formatReadableDate(comment.date)}</span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
                
                {/* Comment Input */}
                <div className="mt-4">
                  <textarea
                    className="w-full p-3 rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500 transition resize-none"
                    rows="3"
                    placeholder="Add a new comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={handlePostComment}
                    disabled={!newComment.trim()}
                    className="mt-2 w-full py-2 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IssueDetail;