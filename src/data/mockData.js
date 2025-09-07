// This file centralizes all mock data for the admin portal.
export const STAFF_ID = 'Amit Sharma';

export const allIssuesData = [
  // Data with latitude and longitude for Nadbai, Bharatpur area
  { id: 'ROAD-2024-001', title: 'Large Pothole on Oak St', description: 'Massive pothole causing traffic jams near the main market.', category: 'Road', status: 'pending', severity: 'high', assigned: 'Unassigned', date: '2025-09-01', lat: 27.2312, lng: 77.2015, upvotes: 18, reporter: 'Ravi Kumar' },
  { id: 'ELEC-2024-002', title: 'Streetlight out on Main Rd', description: 'Streetlight has been off for three nights, making the area unsafe.', category: 'Electricity', status: 'in-progress', severity: 'medium', assigned: 'Amit Sharma', date: '2025-09-02', lat: 27.2350, lng: 77.1989, upvotes: 7, reporter: 'Sunita Devi' },
  { id: 'WATER-2024-003', title: 'Burst water pipe near market', description: 'A water pipe has burst, flooding the vegetable market area.', category: 'Water', status: 'resolved', severity: 'high', assigned: 'Priya Singh', date: '2025-08-28', lat: 27.2305, lng: 77.2030, upvotes: 25, reporter: 'Anil Gupta' },
  { id: 'SANI-2024-004', title: 'Garbage not collected', description: 'Bins are overflowing in the residential colony behind the bus stand.', category: 'Sanitation', status: 'acknowledged', severity: 'low', assigned: 'Rajesh Kumar', date: '2025-09-03', lat: 27.2288, lng: 77.1974, upvotes: 5, reporter: 'Meena Kumari' },
  { id: 'ROAD-2024-005', title: 'Blocked drain on Temple St', description: 'A drain is completely blocked, causing water to pool on the road.', category: 'Road', status: 'assigned', severity: 'medium', assigned: 'Rohan Verma', date: '2025-08-30', lat: 27.2321, lng: 77.2055, upvotes: 11, reporter: 'Vikas Sharma' },
  { id: 'ELEC-2024-007', title: 'Power outage in residential area', description: 'Frequent power cuts in the Nagla Tula area.', category: 'Electricity', status: 'in-progress', severity: 'high', assigned: 'Amit Sharma', date: '2025-09-04', lat: 27.2295, lng: 77.2081, upvotes: 32, reporter: 'Pooja Singh' },
];

export const staffProfileData = {
  [STAFF_ID]: {
    id: STAFF_ID,
    name: 'Jane Smith',
    role: 'Infrastructure & Safety Officer',
    email: 'j.smith@nivaran.gov',
    phone: '+91 98765 43210',
    profilePictureUrl: 'https://placehold.co/128x128/99f6e4/0d9488?text=JS',
    bio: 'Dedicated to ensuring public infrastructure and safety. Committed to resolving issues efficiently and keeping our community safe.',
    assignedIssues: 5,
    resolvedIssues: 42,
  },
  'adavis': {
    id: 'adavis',
    name: 'Alex Davis',
    role: 'Public Works Manager',
    email: 'a.davis@nivaran.gov',
    phone: '+91 91234 56789',
    profilePictureUrl: 'https://placehold.co/128x128/c7d2fe/3730a3?text=AD',
    bio: 'Responsible for the maintenance of public roads, bridges, and other civil projects.',
    assignedIssues: 3,
    resolvedIssues: 35,
  },
};


export const staffIssuesData = [
  { id: "ROAD-2024-001", title: "Large Pothole on Oak St", description: "Massive pothole causing traffic jams.", category: "Road", status: "pending", severity: "high", assigned: "Unassigned", date: "2024-01-15", reporter: 'Rohan Verma', upvotes: 21, image: 'https://placehold.co/800x600/b0bec5/ffffff?text=Pothole+Image', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.2305, lng: 77.2021 }, timeline: [{ status: 'reported', date: '2024-01-15T10:00:00Z', description: 'Issue was reported by Rohan Verma.' }], comments: [{ author: 'System', text: 'Issue has been created and is awaiting review.', date: '2024-01-15T10:00:00Z' }] },
  { id: "ELEC-2024-002", title: "Streetlight out on Main Rd", description: "Streetlight has been off for three nights.", category: "Electricity", status: "in-progress", severity: "medium", assigned: STAFF_ID, date: "2024-01-16", reporter: 'Priya Singh', upvotes: 12, image: 'https://placehold.co/800x600/546e7a/ffffff?text=Broken+Streetlight', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.2345, lng: 77.2065 }, timeline: [{ status: 'reported', date: '2024-01-16T11:30:00Z', description: 'Issue was reported by Priya Singh.' }, { status: 'acknowledged', date: '2024-01-16T12:00:00Z', description: 'Admin has acknowledged the issue.' }, { status: 'assigned', date: '2024-01-16T14:45:00Z', description: `Assigned to ${STAFF_ID}.` }], comments: [{ author: 'System', text: 'Issue was reported.', date: '2024-01-16T11:30:00Z' }, { author: 'Admin', text: 'Acknowledged and assigned to a team.', date: '2024-01-16T14:45:00Z' }] },
  { id: "ELEC-2024-002", title: "Streetlight out on Main Rd", description: "Streetlight has been off for three nights.", category: "Electricity", status: "in-progress", severity: "medium", assigned: STAFF_ID, date: "2024-01-16", reporter: 'Priya Singh', upvotes: 12, image: 'https://placehold.co/800x600/546e7a/ffffff?text=Broken+Streetlight', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.2345, lng: 77.2065 }, timeline: [{ status: 'reported', date: '2024-01-16T11:30:00Z', description: 'Issue was reported by Priya Singh.' }, { status: 'acknowledged', date: '2024-01-16T12:00:00Z', description: 'Admin has acknowledged the issue.' }, { status: 'assigned', date: '2024-01-16T14:45:00Z', description: `Assigned to ${STAFF_ID}.` }], comments: [{ author: 'System', text: 'Issue was reported.', date: '2024-01-16T11:30:00Z' }, { author: 'Admin', text: 'Acknowledged and assigned to a team.', date: '2024-01-16T14:45:00Z' }] },
  { id: "WATER-2024-003", title: "Burst water pipe near market", description: "A water pipe has burst near the central market.", category: "Electricity", status: "resolved", severity: "high", assigned: STAFF_ID, date: "2024-01-17", reporter: 'Rajesh Kumar', upvotes: 35, image: 'https://placehold.co/800x600/78909c/ffffff?text=Water+Pipe+Burst', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.229, lng: 77.204 }, timeline: [{ status: 'reported', date: '2024-01-17T08:00:00Z', description: 'Issue was reported.' }, { status: 'resolved', date: '2024-01-17T12:45:00Z', description: 'The water pipe has been repaired and the issue is resolved.' }], comments: [{ author: 'System', text: 'Issue was reported.', date: '2024-01-17T08:00:00Z' }, { author: 'Admin', text: 'Team is on site, should be resolved soon.', date: '2024-01-17T09:30:00Z' }] },
  { id: "SANI-2024-004", title: "Garbage not collected on time", description: "Bins are overflowing in the neighborhood.", category: "Sanitation", status: "acknowledged", severity: "low", assigned: STAFF_ID, date: "2024-01-18", reporter: 'Anjali Sharma', upvotes: 8, image: 'https://placehold.co/800x600/b0bec5/ffffff?text=Garbage+Bins', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.2285, lng: 77.201 }, timeline: [{ status: 'reported', date: '2024-01-18T09:00:00Z', description: 'Issue reported.' }], comments: [{ author: 'System', text: 'Issue was reported.', date: '2024-01-18T09:00:00Z' }] },
  { id: "ROAD-2024-005", title: "Blocked drain on Temple St", description: "A drain is completely blocked, causing water to pool on the road.", category: "Road", status: "assigned", severity: "medium", assigned: STAFF_ID, date: "2024-01-19", reporter: 'Rohan Verma', upvotes: 5, image: 'https://placehold.co/800x600/546e7a/ffffff?text=Blocked+Drain', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.2325, lng: 77.1985 }, timeline: [{ status: 'reported', date: '2024-01-19T10:00:00Z', description: 'Issue reported.' }], comments: [{ author: 'System', text: 'Issue reported.', date: '2024-01-19T10:00:00Z' }] },
  { id: "SANI-2024-006", title: "Broken swing in public park", description: "A swing in the public park has a broken chain.", category: "Sanitation", status: "pending", severity: "low", assigned: STAFF_ID, date: "2024-01-20", reporter: 'Anjali Sharma', upvotes: 2, image: 'https://placehold.co/800x600/78909c/ffffff?text=Broken+Swing', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.231, lng: 77.1995 }, timeline: [{ status: 'reported', date: '2024-01-20T11:00:00Z', description: 'Issue reported.' }], comments: [{ author: 'System', text: 'Issue reported.', date: '2024-01-20T11:00:00Z' }] },
  { id: "ELEC-2024-007", title: "Power outage in a residential area", description: "Power is out in a large residential block.", category: "Electricity", status: "in-progress", severity: "high", assigned: STAFF_ID, date: "2024-01-21", reporter: 'Anjali Sharma', upvotes: 18, image: 'https://placehold.co/800x600/b0bec5/ffffff?text=Power+Outage', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.236, lng: 77.203 }, timeline: [{ status: 'reported', date: '2024-01-21T12:00:00Z', description: 'Issue reported.' }], comments: [{ author: 'System', text: 'Issue reported.', date: '2024-01-21T12:00:00Z' }] },
  { id: "WATER-2024-008", title: "Leaking tap at community center", description: "Leaking tap causing a lot of water wastage.", category: "Water", status: "resolved-by-staff", severity: "low", assigned: STAFF_ID, date: "2024-01-22", reporter: 'Rohan Verma', upvotes: 7, image: 'https://placehold.co/800x600/546e7a/ffffff?text=Leaking+Tap', location: 'Nadbai, Bharatpur', coordinates: { lat: 27.227, lng: 77.205 }, timeline: [{ status: 'reported', date: '2024-01-22T13:00:00Z', description: 'Issue reported.' }], comments: [{ author: 'System', text: 'Issue reported.', date: '2024-01-22T13:00:00Z' }] },
];

export const staffData = [
  { id: 'staff1', name: 'Amit Sharma', department: 'Electricity', openTickets: 2 },
  { id: 'staff2', name: 'Priya Singh', department: 'Water', openTickets: 1 },
  { id: 'staff3', name: 'Rajesh Kumar', department: 'Sanitation', openTickets: 1 },
  { id: 'staff4', name: 'Rohan Verma', department: 'Road', openTickets: 1 },
  { id: 'staff5', name: 'Sunil Yadav', department: 'Road', openTickets: 0 },
];

