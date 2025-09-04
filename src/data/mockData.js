// This file centralizes all mock data for the admin portal.

export const allIssuesData = [
  // Data with latitude and longitude for Nadbai, Bharatpur area
  { id: 'ROAD-2024-001', title: 'Large Pothole on Oak St', description: 'Massive pothole causing traffic jams near the main market.', category: 'Road', status: 'pending', severity: 'high', assigned: 'Unassigned', date: '2025-09-01', lat: 27.2312, lng: 77.2015, upvotes: 18, reporter: 'Ravi Kumar' },
  { id: 'ELEC-2024-002', title: 'Streetlight out on Main Rd', description: 'Streetlight has been off for three nights, making the area unsafe.', category: 'Electricity', status: 'in-progress', severity: 'medium', assigned: 'Amit Sharma', date: '2025-09-02', lat: 27.2350, lng: 77.1989, upvotes: 7, reporter: 'Sunita Devi' },
  { id: 'WATER-2024-003', title: 'Burst water pipe near market', description: 'A water pipe has burst, flooding the vegetable market area.', category: 'Water', status: 'resolved', severity: 'high', assigned: 'Priya Singh', date: '2025-08-28', lat: 27.2305, lng: 77.2030, upvotes: 25, reporter: 'Anil Gupta' },
  { id: 'SANI-2024-004', title: 'Garbage not collected', description: 'Bins are overflowing in the residential colony behind the bus stand.', category: 'Sanitation', status: 'acknowledged', severity: 'low', assigned: 'Rajesh Kumar', date: '2025-09-03', lat: 27.2288, lng: 77.1974, upvotes: 5, reporter: 'Meena Kumari' },
  { id: 'ROAD-2024-005', title: 'Blocked drain on Temple St', description: 'A drain is completely blocked, causing water to pool on the road.', category: 'Road', status: 'assigned', severity: 'medium', assigned: 'Rohan Verma', date: '2025-08-30', lat: 27.2321, lng: 77.2055, upvotes: 11, reporter: 'Vikas Sharma' },
  { id: 'ELEC-2024-007', title: 'Power outage in residential area', description: 'Frequent power cuts in the Nagla Tula area.', category: 'Electricity', status: 'in-progress', severity: 'high', assigned: 'Amit Sharma', date: '2025-09-04', lat: 27.2295, lng: 77.2081, upvotes: 32, reporter: 'Pooja Singh' },
];

export const staffData = [
  { id: 'staff1', name: 'Amit Sharma', department: 'Electricity', openTickets: 2 },
  { id: 'staff2', name: 'Priya Singh', department: 'Water', openTickets: 1 },
  { id: 'staff3', name: 'Rajesh Kumar', department: 'Sanitation', openTickets: 1 },
  { id: 'staff4', name: 'Rohan Verma', department: 'Road', openTickets: 1 },
  { id: 'staff5', name: 'Sunil Yadav', department: 'Road', openTickets: 0 },
];