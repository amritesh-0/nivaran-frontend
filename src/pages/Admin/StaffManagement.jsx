import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, MoreHorizontal } from 'lucide-react';

const staffData = [
  { id: 'staff1', name: 'Amit Sharma', department: 'Electricity', openTickets: 2, status: 'Active' },
  { id: 'staff2', name: 'Priya Singh', department: 'Water', openTickets: 1, status: 'Active' },
  { id: 'staff3', name: 'Rajesh Kumar', department: 'Sanitation', openTickets: 1, status: 'On Leave' },
  { id: 'staff4', name: 'Rohan Verma', department: 'Road', openTickets: 0, status: 'Active' },
  { id: 'staff5', name: 'Sunil Yadav', department: 'Road', openTickets: 1, status: 'Active' },
];

const getStatusPill = (status) => {
  const styles = {
    Active: 'bg-green-100 text-green-800',
    'On Leave': 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

const StaffManagement = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Users className="w-8 h-8 mr-3 text-blue-600" />
          Staff Management
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all">
          <UserPlus className="w-5 h-5" />
          Add New Staff
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        className="bg-white rounded-3xl p-6 shadow-lg"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Staff Member', 'Department', 'Open Tickets', 'Status', ''].map((header) => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffData.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{staff.name}</div>
                    <div className="text-xs text-gray-500">{staff.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staff.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{staff.openTickets}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(staff.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition-colors" title="Actions">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StaffManagement;