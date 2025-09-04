import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/dashboards/UserDashboard/Layout';
import Dashboard from '../components/dashboards/UserDashboard/Dashboard';
import RaiseProblem from '../components/dashboards/UserDashboard/RaiseProblem';
import MyReports from '../components/dashboards/UserDashboard/MyReports';
import LocalIssues from '../components/dashboards/UserDashboard/LocalIssues';
import Departments from '../components/dashboards/UserDashboard/Departments';
import ReportDetail from '../components/dashboards/UserDashboard/ReportDetail';

function UserDashboard() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/raise-problem" element={<RaiseProblem />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/local-issues" element={<LocalIssues />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/report/:id" element={<ReportDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default UserDashboard;
