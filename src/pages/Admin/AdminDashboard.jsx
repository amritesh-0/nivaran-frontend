import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ListTodo, Clock, CheckCircle, Loader } from "lucide-react";
import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// Fix Leaflet default marker icon issue in some bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Mock data
const allIssuesData = [
  { id: "ROAD-2024-001", title: "Large Pothole on Oak St", description: "Massive pothole causing traffic jams.", category: "Road", status: "pending", severity: "high", assigned: "Unassigned", date: "2024-01-15", lat: 27.2305, lng: 77.2021 },
  { id: "ELEC-2024-002", title: "Streetlight out on Main Rd", description: "Streetlight has been off for three nights.", category: "Electricity", status: "in-progress", severity: "medium", assigned: "Amit Sharma", date: "2024-01-16", lat: 27.2345, lng: 77.2065 },
  { id: "WATER-2024-003", title: "Burst water pipe near market", description: "A water pipe has burst near the central market.", category: "Water", status: "resolved", severity: "high", assigned: "Priya Singh", date: "2024-01-17", lat: 27.229, lng: 77.204 },
  { id: "SANI-2024-004", title: "Garbage not collected on time", description: "Bins are overflowing in the neighborhood.", category: "Sanitation", status: "acknowledged", severity: "low", assigned: "Rajesh Kumar", date: "2024-01-18", lat: 27.2285, lng: 77.201 },
  { id: "ROAD-2024-005", title: "Blocked drain on Temple St", description: "A drain is completely blocked, causing water to pool on the road.", category: "Road", status: "assigned", severity: "medium", assigned: "Rohan Verma", date: "2024-01-19", lat: 27.2325, lng: 77.1985 },
  { id: "SANI-2024-006", title: "Broken swing in public park", description: "A swing in the public park has a broken chain.", category: "Sanitation", status: "pending", severity: "low", assigned: "Unassigned", date: "2024-01-20", lat: 27.231, lng: 77.1995 },
  { id: "ELEC-2024-007", title: "Power outage in a residential area", description: "Power is out in a large residential block.", category: "Electricity", status: "in-progress", severity: "high", assigned: "Priya Singh", date: "2024-01-21", lat: 27.236, lng: 77.203 },
  { id: "WATER-2024-008", title: "Leaking tap at community center", description: "Leaking tap causing a lot of water wastage.", category: "Water", status: "resolved", severity: "low", assigned: "Amit Sharma", date: "2024-01-22", lat: 27.227, lng: 77.205 },
  { id: "SANI-2024-009", title: "Broken street sign", description: 'Street sign for "Main Street" is broken.', category: "Sanitation", status: "pending", severity: "low", assigned: "Unassigned", date: "2024-01-23", lat: 27.2335, lng: 77.2015 },
  { id: "ROAD-2024-010", title: "Eroded sidewalk", description: "Sidewalk is badly eroded and poses a tripping hazard.", category: "Road", status: "in-progress", severity: "medium", assigned: "Rohan Verma", date: "2024-01-24", lat: 27.226, lng: 77.1975 },
];

// Helpers
const getStatusColor = (status) => {
  switch (status) {
    case "pending": return "bg-orange-100 text-orange-800";
    case "acknowledged": return "bg-blue-100 text-blue-800";
    case "assigned": return "bg-purple-100 text-purple-800";
    case "in-progress": return "bg-indigo-100 text-indigo-800";
    case "resolved": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getSeverityIntensity = (severity) => {
  switch (severity) {
    case "high": return 1.0;
    case "medium": return 0.5;
    case "low": return 0.1;
    default: return 0;
  }
};

// --- Heatmap wrapper ---
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heatLayer = L.heatLayer(
      points.map((p) => [p.lat, p.lng, p.intensity]),
      { radius: 30, blur: 15, maxZoom: 17 }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

// --- Stat Card ---
const StatCard = ({ icon: Icon, title, value, color, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
    >
      <div className={`p-4 rounded-full bg-${color}-100`}>
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-gray-600">{title}</p>
      </div>
    </motion.div>
  );
};

// --- Interactive Map ---
const InteractiveMap = ({ issues, severityFilter }) => {
  const mapCenterLat = 27.2312;
  const mapCenterLng = 77.2015;

  const heatmapData = issues.map((issue) => ({
    lat: issue.lat,
    lng: issue.lng,
    intensity: getSeverityIntensity(issue.severity),
  }));

  const filteredIssues = issues.filter(
    (issue) => severityFilter === "all" || issue.severity === severityFilter
  );

  return (
    <div className="relative h-[550px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200">
      <MapContainer
        center={[mapCenterLat, mapCenterLng]}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Heatmap */}
        <HeatmapLayer points={heatmapData} />

        {/* Markers */}
        {filteredIssues.map((issue) => (
          <Marker key={issue.id} position={[issue.lat, issue.lng]}>
            <Popup>
              <div className="p-2">
                <h4 className="font-bold text-gray-900 mb-1">{issue.title}</h4>
                <p className="text-gray-600 capitalize">
                  Severity:{" "}
                  <strong className="font-medium">{issue.severity}</strong>
                </p>
                <p className="text-gray-600 capitalize">
                  Status:{" "}
                  <strong className="font-medium">
                    {issue.status.replace("-", " ")}
                  </strong>
                </p>
                <Link
                  to={`/admin/issue/${issue.id}`}
                  className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-md text-sm text-gray-600 font-semibold">
        Nadbai, Rajasthan, India
      </div>
    </div>
  );
};

// --- Admin Dashboard ---
const AdminDashboard = () => {
  const [severityFilter, setSeverityFilter] = useState("all");

  const totalIssues = allIssuesData.length;
  const pendingIssues = allIssuesData.filter((i) => i.status === "pending").length;
  const inProgressIssues = allIssuesData.filter((i) => i.status === "in-progress").length;
  const resolvedIssues = allIssuesData.filter((i) => i.status === "resolved").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-lg"
      >
        <div className="bg-blue-50/50 rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Admin!</h1>
          <p className="text-gray-600 text-lg">
            Here's a live overview of civic issues in your department's area.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={ListTodo} title="Total Issues" value={totalIssues} color="blue" delay={0.1} />
        <StatCard icon={Clock} title="Pending Review" value={pendingIssues} color="orange" delay={0.2} />
        <StatCard icon={Loader} title="In Progress" value={inProgressIssues} color="purple" delay={0.3} />
        <StatCard icon={CheckCircle} title="Resolved" value={resolvedIssues} color="green" delay={0.4} />
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
        className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <MapPin className="w-7 h-7 text-blue-600 mr-3" />
            Live Issue Hotspots
          </h2>
          <div className="flex items-center gap-2">
            {["all", "high", "medium", "low"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSeverityFilter(filter)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm capitalize ${
                  severityFilter === filter
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <InteractiveMap issues={allIssuesData} severityFilter={severityFilter} />
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
