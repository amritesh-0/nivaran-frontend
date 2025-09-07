import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, X, Mail, Phone, MapPin, Briefcase, Calendar, Eye, ArrowLeft, Send, FileText } from 'lucide-react';

// Enhanced initial staff data with an array of open tickets
const initialStaffData = [
  { 
    id: 'staff1', name: 'Amit Sharma', department: 'Electricity', openTickets: [
      { id: 'TKT-101', description: 'Power outage in Sector 7' },
      { id: 'TKT-103', description: 'Faulty street light on Main Road' }
    ], status: 'Active', email: 'amit.sharma@gov.in', phone: '9876543210', address: '123 Main St, City, State, 12345', dob: '1985-04-12', doj: '2010-06-01', position: 'Senior Electrician', emergencyContact: 'Priya Sharma (9876543211)' 
  },
  { 
    id: 'staff2', name: 'Priya Singh', department: 'Water', openTickets: [
      { id: 'TKT-205', description: 'Leaking pipe on 4th Avenue' }
    ], status: 'Active', email: 'priya.singh@gov.in', phone: '9988776655', address: '456 Elm St, Town, State, 54321', dob: '1990-11-23', doj: '2015-03-15', position: 'Water Engineer', emergencyContact: 'Rahul Singh (9988776656)' 
  },
  { 
    id: 'staff3', name: 'Rajesh Kumar', department: 'Sanitation', openTickets: [], status: 'On Leave', email: 'rajesh.kumar@gov.in', phone: '9123456789', address: '789 Oak Ave, Village, State, 67890', dob: '1978-01-05', doj: '2005-09-01', position: 'Sanitation Supervisor', emergencyContact: 'Sunita Kumar (9123456790)' 
  },
  { 
    id: 'staff4', name: 'Rohan Verma', department: 'Road', openTickets: [], status: 'Active', email: 'rohan.verma@gov.in', phone: '9012301234', address: '101 Pine Rd, Hamlet, State, 01234', dob: '1992-07-18', doj: '2018-02-20', position: 'Road Inspector', emergencyContact: 'Anjali Verma (9012301235)' 
  },
  { 
    id: 'staff5', name: 'Sunil Yadav', department: 'Road', openTickets: [
      { id: 'TKT-312', description: 'Pothole repair on Sector 3 Bypass' }
    ], status: 'Active', email: 'sunil.yadav@gov.in', phone: '9554433221', address: '202 Maple Dr, City, State, 54321', dob: '1988-09-09', doj: '2013-11-10', position: 'Road Maintenance', emergencyContact: 'Geeta Yadav (9554433222)' 
  },
];

const departmentOptions = ['Electricity', 'Water', 'Sanitation', 'Road', 'Health Department', 'Administration', 'IT Services'];

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
  const [staffList, setStaffList] = useState(initialStaffData);
  const [currentView, setCurrentView] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffDetails, setNewStaffDetails] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    address: '',
    dob: '',
    doj: '',
    position: '',
    emergencyContact: '',
    openTickets: []
  });

  const handleAddStaff = (e) => {
    e.preventDefault();

    for (const key in newStaffDetails) {
      if (newStaffDetails[key] === '' && key !== 'emergencyContact') {
        alert(`Please fill in all required details: ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    const newStaffId = `staff${staffList.length + 1}`;
    
    const newStaffMember = {
      id: newStaffId,
      name: newStaffDetails.name,
      department: newStaffDetails.department,
      openTickets: [],
      status: 'Active',
      email: newStaffDetails.email,
      phone: newStaffDetails.phone,
      address: newStaffDetails.address,
      dob: newStaffDetails.dob,
      doj: newStaffDetails.doj,
      position: newStaffDetails.position,
      emergencyContact: newStaffDetails.emergencyContact,
    };

    setStaffList([...staffList, newStaffMember]);
    
    alert(`New staff member '${newStaffDetails.name}' added successfully! A confirmation email has been sent to ${newStaffDetails.email}.`);
    console.log(`Confirmation email sent to ${newStaffDetails.email} for staff ID: ${newStaffId}`);

    setNewStaffDetails({ 
      name: '', email: '', phone: '', department: '', address: '', dob: '', doj: '', position: '', emergencyContact: '', openTickets: [] 
    });
    setCurrentView('list');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaffDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const openDetailedView = (staff) => {
    setSelectedStaff(staff);
  };

  const closeDetailedView = () => {
    setSelectedStaff(null);
  };
  
  const handleRequestUpdate = (staffId, ticketId) => {
    alert(`Update request sent for Ticket ID: ${ticketId} to staff member ${staffId}.`);
    console.log(`Admin requested an update from Staff ID: ${staffId} on Ticket ID: ${ticketId}`);
  };

  return (
    <div className="space-y-8 min-h-screen relative p-4 md:p-8">
      <AnimatePresence mode="wait">
        {currentView === 'list' && (
          <motion.div
            key="staffList"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                Staff Management
              </h1>
              <button
                onClick={() => setCurrentView('addStaff')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                <UserPlus className="w-5 h-5" />
                Add New Staff
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg mt-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Staff Member', 'Department', 'Open Tickets', 'Status', 'Actions'].map((header) => (
                        <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staffList.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{staff.name}</div>
                          <div className="text-xs text-gray-500">{staff.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staff.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{staff.openTickets.length}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(staff.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => openDetailedView(staff)}
                            className="p-2 text-blue-600 rounded-lg hover:bg-gray-100 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'addStaff' && (
          <motion.div
            key="addStaff"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentView('list')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
              <h2 className="text-3xl font-bold text-gray-900 text-center flex-grow">Add New Staff Member</h2>
              <div className="w-[128px]"></div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleAddStaff} className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-blue-600" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newStaffDetails.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={newStaffDetails.dob}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newStaffDetails.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        placeholder="john.doe@gov.in"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={newStaffDetails.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        placeholder="e.g., 9876543210"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Residential Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={newStaffDetails.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        placeholder="123 Government Rd, Capital City, State, 123456"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" /> Employment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                      <select
                        id="department"
                        name="department"
                        value={newStaffDetails.department}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 bg-white"
                        required
                      >
                        <option value="" disabled>Select a department</option>
                        {departmentOptions.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position/Job Title</label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={newStaffDetails.position}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        placeholder="e.g., Junior Engineer"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="doj" className="block text-sm font-medium text-gray-700">Date of Joining</label>
                      <input
                        type="date"
                        id="doj"
                        name="doj"
                        value={newStaffDetails.doj}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" /> Emergency Contact
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Provide details for a person to contact in case of an emergency (optional).</p>
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Name and Phone Number</label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={newStaffDetails.emergencyContact}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                      placeholder="e.g., Jane Doe (9988776655)"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-semibold rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    Confirm & Add Staff
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Detailed View Modal */}
      <AnimatePresence>
        {selectedStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-2xl relative my-8"
            >
              <button
                onClick={closeDetailedView}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{selectedStaff.name}</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <UserPlus className="w-5 h-5 text-blue-600" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                    <p><strong>Staff ID:</strong> {selectedStaff.id}</p>
                    <p><strong>Date of Birth:</strong> {selectedStaff.dob}</p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-blue-600" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> {selectedStaff.email}</p>
                    <p><strong>Phone:</strong> {selectedStaff.phone}</p>
                    <p className="md:col-span-2"><strong>Address:</strong> {selectedStaff.address}</p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-600" /> Employment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                    <p><strong>Department:</strong> {selectedStaff.department}</p>
                    <p><strong>Position:</strong> {selectedStaff.position}</p>
                    <p><strong>Date of Joining:</strong> {selectedStaff.doj}</p>
                    <p><strong>Status:</strong> {getStatusPill(selectedStaff.status)}</p>
                  </div>
                </div>
                
                {/* Open Tickets Section with Request Update Buttons */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" /> Open Tickets ({selectedStaff.openTickets.length})
                  </h3>
                  {selectedStaff.openTickets.length > 0 ? (
                    <ul className="space-y-4">
                      {selectedStaff.openTickets.map(ticket => (
                        <li key={ticket.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between shadow-sm">
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-900">{ticket.id}</p>
                            <p className="text-sm text-gray-600">{ticket.description}</p>
                          </div>
                          <button
                            onClick={() => handleRequestUpdate(selectedStaff.id, ticket.id)}
                            className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Send className="w-4 h-4" />
                            Request Update
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">This staff member currently has no open tickets.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffManagement;