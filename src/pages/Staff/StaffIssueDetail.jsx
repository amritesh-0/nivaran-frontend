import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, CheckCircle, MapPin, Tag, ThumbsUp, Calendar, Info, MessageSquare, Clock, AlertCircle, Image as ImageIcon, Briefcase, Camera, Film, X, MoreVertical, Trash2, Globe
} from 'lucide-react';
import { getStatusPill, getSeverityPill } from '../../utils/styleUtils.jsx';
import { staffIssuesData, STAFF_ID } from '../../data/mockData.js';
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

// --- Mock Data (for this component) ---
// The data is now directly imported with the coordinates.
const mockIssues = staffIssuesData;

const formatReadableDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-start">
    <Icon className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
    <div>
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  </div>
);

// Modal Component for Full-screen Media View
const MediaModal = ({ isOpen, media, onClose }) => {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-center h-full">
          {media.type === 'image' ? (
            <img src={media.url} alt="Full screen" className="max-w-full max-h-[85vh] object-contain" />
          ) : (
            <video src={media.url} controls className="max-w-full max-h-[85vh] object-contain" />
          )}
        </div>
        {media.description && (
          <div className="p-4 bg-gray-100 text-gray-800 border-t border-gray-200">
            <p className="font-semibold">{media.author} on {formatReadableDate(media.date)}:</p>
            <p>{media.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const StaffIssueDetail = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const initialIssue = mockIssues.find((i) => i.id === issueId);

  const [currentIssue, setCurrentIssue] = useState({
    ...initialIssue,
    staffMedia: initialIssue.staffMedia || [] 
  });
  
  const [newComment, setNewComment] = useState('');
  
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState('');
  const [newStaffMediaDescription, setNewStaffMediaDescription] = useState('');
  const [fileSizeError, setFileSizeError] = useState(''); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null); 

  const [openKebabMenuIndex, setOpenKebabMenuIndex] = useState(null);
  const kebabRef = useRef([]); 

  const MAX_FILE_SIZE_MB = 10; 

  const issueLocation = initialIssue.coordinates && initialIssue.coordinates.lat && initialIssue.coordinates.lng 
      ? [initialIssue.coordinates.lat, initialIssue.coordinates.lng]
      : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openKebabMenuIndex !== null && kebabRef.current[openKebabMenuIndex] && !kebabRef.current[openKebabMenuIndex].contains(event.target)) {
        setOpenKebabMenuIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openKebabMenuIndex]);

  if (!currentIssue || currentIssue.assigned !== STAFF_ID) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen bg-gray-50 p-8">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">The issue you are looking for is not assigned to you.</p>
          <button onClick={() => navigate('/staff/issues')} className="mt-6 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">Go to My Issues</button>
        </div>
      </div>
    );
  }

  const handleAction = (status) => {
    const newTimelineEvent = {
      status,
      date: new Date().toISOString(),
      description: `Status updated to ${status.replace('-', ' ')} by staff member.`,
    };

    setCurrentIssue(prev => ({
      ...prev,
      status,
      timeline: [...prev.timeline, newTimelineEvent],
    }));
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      author: STAFF_ID,
      text: newComment,
      date: new Date().toISOString()
    };
    setCurrentIssue(prev => ({
      ...prev,
      comments: [...prev.comments, comment]
    }));
    setNewComment('');
  };

  const handleFileChange = (e) => {
    setFileSizeError('');
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileSizeError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
        setNewImageFile(null);
        setNewImagePreview('');
        e.target.value = null;
        return;
      }

      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveFile = () => {
    setNewImageFile(null);
    setNewImagePreview('');
    setFileSizeError('');
    setNewStaffMediaDescription('');
  };

  const handleAddImage = () => {
    if (!newImageFile || !newStaffMediaDescription.trim()) return;

    const newMediaEntry = {
      type: newImageFile.type.startsWith('image/') ? 'image' : 'video',
      url: newImagePreview,
      description: newStaffMediaDescription.trim(),
      date: new Date().toISOString(),
      author: STAFF_ID
    };

    setCurrentIssue(prev => ({
      ...prev,
      staffMedia: [...prev.staffMedia, newMediaEntry],
      comments: [
        ...prev.comments,
        {
          author: STAFF_ID,
          text: `Staff member added a progress ${newMediaEntry.type} with description: "${newMediaEntry.description}"`,
          date: new Date().toISOString()
        }
      ]
    }));

    setNewImageFile(null);
    setNewImagePreview('');
    setNewStaffMediaDescription('');
    setFileSizeError('');
  };

  const handleRequestStaff = () => {
    const newTimelineEvent = {
        status: 'staff-request',
        date: new Date().toISOString(),
        description: `${STAFF_ID} has requested for more staff assistance.`
    };
    console.log(`${STAFF_ID} requested more staff for issue ${currentIssue.id}`);
    
    setCurrentIssue(prev => ({
        ...prev,
        timeline: [...prev.timeline, newTimelineEvent]
    }));
  };

  const openMediaModal = (media) => {
    setModalMedia(media);
    setIsModalOpen(true);
  };

  const closeMediaModal = () => {
    setIsModalOpen(false);
    setModalMedia(null);
  };

  const handleDeleteClick = (media, index) => {
    setMediaToDelete({ media, index });
    setIsDeleteConfirmOpen(true);
    setOpenKebabMenuIndex(null); 
  };

  const confirmDeleteMedia = () => {
    if (mediaToDelete) {
      setCurrentIssue(prev => ({
        ...prev,
        staffMedia: prev.staffMedia.filter((_, i) => i !== mediaToDelete.index),
        comments: [
            ...prev.comments,
            {
                author: STAFF_ID,
                text: `Staff member removed a progress media item.`,
                date: new Date().toISOString()
            }
        ]
      }));
      setMediaToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  const cancelDeleteMedia = () => {
    setMediaToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  const isResolved = currentIssue.status === 'resolved-by-staff' || currentIssue.status === 'resolved';

  const handleNavigate = () => {
    if (issueLocation) {
        const [lat, lng] = issueLocation;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    }
  };

  // Reorder sections for smaller screens
  const sections = useMemo(() => {
    const list = [
        <motion.div key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Issue Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
                <InfoCard icon={Info} label="ID" value={currentIssue.id} />
                <InfoCard icon={Calendar} label="Reported" value={formatReadableDate(currentIssue.date)} />
                <InfoCard icon={Tag} label="Category" value={currentIssue.category} />
                <InfoCard icon={MapPin} label="Location" value={currentIssue.location} />
                <InfoCard icon={User} label="Reporter" value={currentIssue.reporter} />
                <InfoCard icon={Briefcase} label="Assigned To" value={currentIssue.assigned} />
                <InfoCard icon={ThumbsUp} label="Upvotes" value={`${currentIssue.upvotes}`} />
            </div>
        </motion.div>,
        <motion.div key="map" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Issue Location
            </h3>
            {issueLocation ? (
                <div className="h-[400px] rounded-xl overflow-hidden">
                    <MapContainer
                        center={issueLocation}
                        zoom={15}
                        scrollWheelZoom={false}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={issueLocation}>
                            <Popup>
                                <div className="p-2 text-center">
                                    <p className="font-semibold mb-2">{currentIssue.location}</p>
                                    <button
                                        onClick={handleNavigate}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span>Navigate</span>
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            ) : (
                <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-xl">
                    <p className="text-gray-500">Location data not available.</p>
                </div>
            )}
        </motion.div>,
        <motion.div key="evidence" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-x-2">
                <ImageIcon className="w-5 h-5 text-gray-500" />
                Original Evidence
            </h3>
            {currentIssue.image && (
                <img src={currentIssue.image} alt={currentIssue.title} className="w-full h-64 object-cover rounded-lg shadow-md" />
            )}
            <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{currentIssue.description}</p>
            </div>
        </motion.div>,
        currentIssue.staffMedia && currentIssue.staffMedia.length > 0 && (
            <motion.div key="staff-media" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-x-2">
                    <ImageIcon className="w-5 h-5 text-purple-600" />
                    Staff Progress
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentIssue.staffMedia.map((media, index) => (
                        <div 
                            key={index} 
                            className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div ref={el => kebabRef.current[index] = el} className="absolute top-2 right-2 z-10">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setOpenKebabMenuIndex(openKebabMenuIndex === index ? null : index); }}
                                    className="p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                                {openKebabMenuIndex === index && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); openMediaModal(media); }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <ImageIcon className="w-4 h-4 mr-2" /> View
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(media, index); }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div onClick={() => openMediaModal(media)} className="cursor-pointer">
                                {media.type === 'image' ? (
                                    <img src={media.url} alt={`Staff Update ${index + 1}`} className="w-full h-48 object-cover" />
                                ) : (
                                    <video src={media.url} className="w-full h-48 object-cover" />
                                )}
                                <div className="absolute top-2 left-2 p-1 bg-black bg-opacity-50 rounded-full text-white">
                                    {media.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                                </div>
                                <div className="p-3 bg-gray-50">
                                    <p className="text-sm font-semibold text-gray-800 mb-1">{media.author} ({formatReadableDate(media.date)})</p>
                                    <p className="text-sm text-gray-600 truncate">{media.description}</p> 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        ),
        <motion.div key="comments" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-x-2">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                Comments
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {currentIssue.comments.map((comment, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-100 border border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                            <span className="font-semibold text-gray-800">{comment.author}</span>
                            <span>{formatReadableDate(comment.date)}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                    </div>
                ))}
            </div>
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
        </motion.div>
    ];
    return list;
  }, [currentIssue, newComment, openKebabMenuIndex, newImagePreview, newImageFile, issueLocation]);

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans">
      {/* Modals are outside the main container to ensure they float above everything */}
      <MediaModal isOpen={isModalOpen} media={modalMedia} onClose={closeMediaModal} />
      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to remove this media update? This action cannot be undone."
        onConfirm={confirmDeleteMedia}
        onCancel={cancelDeleteMedia}
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to My Issues
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{currentIssue.title}</h1>
            <div className="mt-2 md:mt-0 flex items-center gap-x-2">
              {getSeverityPill(currentIssue.severity)}
              {getStatusPill(currentIssue.status)}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details, Media, and Original Evidence */}
          <div className="lg:col-span-2 space-y-8">
            {sections.slice(0, 4)} {/* Use slices to render sections in a specific order */}
          </div>

          {/* Right Column: Actions & Timeline */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">My Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleAction('in-progress')}
                    disabled={isResolved || currentIssue.status === 'in-progress'}
                    className="w-full py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Mark as In Progress
                  </button>
                  <button
                    onClick={() => handleAction('resolved-by-staff')}
                    disabled={isResolved}
                    className="w-full py-2.5 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Mark as Resolved
                  </button>
                  <button
                    onClick={handleRequestStaff}
                    disabled={isResolved}
                    className="w-full py-2.5 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Request More Staff
                  </button>
                </div>
              </div>

              {/* Add Progress Media Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Add Progress Media</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      disabled={isResolved || newImagePreview}
                    />
                    <label
                      htmlFor="file-upload"
                      className={`flex-1 py-2 px-3 text-sm text-gray-800 font-semibold rounded-lg transition-colors cursor-pointer flex justify-center items-center ${
                        isResolved || newImagePreview ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Choose File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleFileChange}
                      className="hidden"
                      id="take-photo"
                      disabled={isResolved || newImagePreview}
                    />
                    <label
                      htmlFor="take-photo"
                      className={`py-2 px-3 text-sm text-gray-800 font-semibold rounded-lg transition-colors cursor-pointer flex justify-center items-center ${
                        isResolved || newImagePreview ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <Camera className="w-5 h-5" />
                    </label>
                  </div>

                  {fileSizeError && <p className="text-red-500 text-sm mt-1">{fileSizeError}</p>}

                  <textarea
                    className="w-full p-3 text-sm rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500 transition resize-none"
                    rows="2"
                    placeholder="Add a description for this media update..."
                    value={newStaffMediaDescription}
                    onChange={(e) => setNewStaffMediaDescription(e.target.value)}
                    disabled={isResolved || !newImagePreview}
                  />
                  {newImagePreview && (
                    <div className="mt-2 p-2 border border-gray-200 rounded-lg relative">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                      <button
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {newImageFile && newImageFile.type.startsWith('image/') ? (
                        <img src={newImagePreview} alt="Preview" className="w-full h-auto max-h-64 object-contain rounded-lg" />
                      ) : (
                        <video src={newImagePreview} controls className="w-full h-auto max-h-64 object-contain rounded-lg" />
                      )}
                    </div>
                  )}
                  <button
                    onClick={handleAddImage}
                    disabled={!newImageFile || !newStaffMediaDescription.trim() || isResolved || fileSizeError}
                    className="w-full py-2.5 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Media Update
                  </button>
                </div>
              </div>

              {/* Progress Timeline Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-x-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  Progress Timeline
                </h3>
                <div className="relative pl-4">
                  {currentIssue.timeline.map((item, index) => (
                    <div key={index} className="flex items-start mb-6 last:mb-0">
                      {index < currentIssue.timeline.length - 1 && (
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
            </motion.div>
          </div>
          {/* Move comments to the end for smaller screens */}
          <div className="lg:col-span-3">
              {sections.slice(4)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffIssueDetail;