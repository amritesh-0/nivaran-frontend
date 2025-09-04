import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieChartIcon, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
} from 'recharts';
import { allIssuesData } from '../../data/mockData';

// --- Color Palette for Charts ---
const COLORS = ['#3B82F6', '#8B5CF6', '#F97316', '#10B981'];

const Analytics = () => {
  // --- Data Processing with useMemo for performance ---
  const pieData = useMemo(() => {
    const issuesByCategory = allIssuesData.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(issuesByCategory).map(([name, value]) => ({ name, value }));
  }, []);

  const barData = useMemo(() => {
    const issuesByStaff = allIssuesData
      .filter((issue) => issue.status === 'resolved')
      .reduce((acc, issue) => {
        acc[issue.assigned] = (acc[issue.assigned] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(issuesByStaff).map(([name, resolved]) => ({ name, resolved }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 font-sans"
    >
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
          Department Analytics
        </h1>
        <p className="text-gray-600 mt-2">
          Get a quick overview of your department's performance at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Issues by Category Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <PieChartIcon className="w-6 h-6 mr-2 text-purple-600" /> Issues by Category
          </h2>
          {pieData.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    activeShape={null}
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Staff Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" /> Staff Performance (Resolved Issues)
          </h2>
          {barData.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="resolved" fill="#8B5CF6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
