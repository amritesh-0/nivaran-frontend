import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, MapPin, Building2, LogOut, MessageCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const navItems = [
  { path: '/user/dashboard', label: 'Dashboard', icon: Home },
  { path: '/user/raise-problem', label: 'Raise a Problem', icon: MessageCircle },
  { path: '/user/my-reports', label: 'My Reports', icon: FileText },
  { path: '/user/local-issues', label: 'Local Issues', icon: MapPin },
  { path: '/user/departments', label: 'Departments', icon: Building2 },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false); // Close sidebar on mobile after clicking a link
    }
  };

  return (
    <aside className="h-full overflow-y-auto p-6 flex flex-col justify-between transition-all duration-300 transform">
      <div className="space-y-6">
        {/* Mobile close button */}
        <div className="flex items-center justify-between md:hidden">
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="hidden md:flex items-center space-x-3 mb-8">
            <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            aria-label="Logo"
          >
            <ShieldCheckIcon className="h-8 w-8 text-brand-blue-500" aria-hidden="true" />
            <span className="text-xl font-bold text-text-primary dark:text-white">
              Nivaran
            </span>
          </motion.div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActivePath(path)
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg transform translate-x-1'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActivePath(path) ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span className={`font-medium ${isActivePath(path) ? 'text-white' : 'text-gray-700'}`}>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-8">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;