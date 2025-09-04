import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  MessageCircle, 
  FileText 
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Profile = () => {
  // Mock user data
  const userProfile = {
    name: 'Jane Citizen',
    email: 'jane.citizen@example.com',
    phone: '+1 (555) 123-4567',
    address: '456 Main Street, Springfield, IL 62701',
    profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
    reportsSubmitted: 25,
    totalUpvotes: 187,
    commentsMade: 52
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <User className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column (User Info & Stats) */}
        <div className="md:col-span-1 space-y-6 lg:space-y-8">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src={userProfile.profileImage}
                alt="User Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
            <p className="text-gray-500 font-medium">Verified Citizen</p>
          </motion.div>

          {/* User Statistics */}
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">My Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{userProfile.reportsSubmitted}</p>
                <p className="text-sm text-gray-600">Reports</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-xl">
                <Heart className="w-6 h-6 text-red-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{userProfile.totalUpvotes}</p>
                <p className="text-sm text-gray-600">Upvotes</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl">
                <MessageCircle className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{userProfile.commentsMade}</p>
                <p className="text-sm text-gray-600">Comments</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right Column (Contact & Other Details) */}
        <div className="md:col-span-2 space-y-6 lg:space-y-8">
          {/* Contact Information */}
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-medium text-gray-900">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <Phone className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium text-gray-900">{userProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Home Address</p>
                  <p className="font-medium text-gray-900">{userProfile.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
