import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Briefcase, ListTodo, ThumbsUp } from 'lucide-react';
import { staffProfileData, STAFF_ID } from '../../data/mockData.js';

const ProfileInfoBlock = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm w-full">
    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-gray-900">{value}</span>
    </div>
  </div>
);

const StaffProfile = () => {
  const profile = staffProfileData[STAFF_ID];

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600">
        <p>Profile data not found for staff ID: {STAFF_ID}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 md:p-8"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover border-4 border-gray-100 shadow-md"
              src={profile.profilePictureUrl || 'https://placehold.co/128x128/e2e8f0/64748b?text=JS'}
              alt={`${profile.name} profile`}
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{profile.name}</h1>
            <p className="text-lg text-gray-600 mt-1">{profile.role}</p>
            <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto md:mx-0">
              {profile.bio}
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Contact and Metrics Section - Vertical Stack */}
        <div className="flex flex-col gap-6 mt-8">
          <ProfileInfoBlock
            icon={Mail}
            label="Email"
            value={profile.email}
          />
          <ProfileInfoBlock
            icon={Phone}
            label="Phone"
            value={profile.phone}
          />
          <ProfileInfoBlock
            icon={ListTodo}
            label="Assigned Issues"
            value={profile.assignedIssues}
          />
          <ProfileInfoBlock
            icon={ThumbsUp}
            label="Resolved Issues"
            value={profile.resolvedIssues}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StaffProfile;
