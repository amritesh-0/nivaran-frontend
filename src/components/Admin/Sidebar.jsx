import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, BarChart2, LogOut, X, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { path: '/admin/issue-management', label: 'Issue Management', icon: List },
  { path: '/admin/staff-directory', label: 'Staff Directory', icon: Users },
  { path: '/admin/analytics', label: 'Analytics & Reports', icon: BarChart2 },
];

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside className="h-full overflow-y-auto p-6 flex flex-col justify-between bg-white shadow-lg transition-all duration-300 transform">
      <div className="space-y-6">
        {/* Mobile close button */}
        <div className="flex items-center justify-between md:hidden">
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="hidden md:flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Admin Panel</span>
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
                  ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg transform translate-x-1'
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
          onClick={() => { /* Logout logic here */ }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
