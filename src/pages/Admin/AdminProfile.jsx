import React from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin
} from 'lucide-react';

// --- Placeholder for Mock Data ---
const userData = {
  id: 'user123',
  name: 'Anjali Sharma',
  email: 'anjali.sharma@example.com',
  phone: '+91 98765 43210',
  location: 'Nadbai, Bharatpur',
};

const UserProfile = () => {
  return (
    <div className="space-y-8 font-sans">
      {/* Combined Header and Profile Details Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account details.</p>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
            <p className="text-sm text-gray-500">Citizen Reporter</p>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <span>{userData.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>{userData.location}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;