import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';

import AdminSidebar from '../components/Admin/Sidebar';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import IssueManagement from '../pages/Admin/IssueManagement';
import IssueDetail from '../pages/Admin/IssueDetail';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 font-sans antialiased overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed h-full w-64 z-50">
        <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-y-auto">
        {/* Mobile Header with Branding and Hamburger */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-30">
          <span className="text-xl font-bold text-gray-900">Nivaran Admin</span>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Sidebar (as an overlay) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="sidebar-mobile"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 overflow-y-auto"
            >
              <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop for mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 transition-all duration-300">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
          >
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="issue-management" element={<IssueManagement />} />
              <Route path="issue/:issueId" element={<IssueDetail />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
