import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all your pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import RiskAssessment from './pages/RiskAssessment';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

// Import shared components
import Background from './components/shared/Background';

function App() {
  // Logic to check if user is logged in
  const isAuth = !!sessionStorage.getItem('pathfinder_session');

  return (
    <Router>
      <Background />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* These routes check for authentication. 
            If not logged in, they redirect to /login */}
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={isAuth ? <Analytics /> : <Navigate to="/login" />} />
        <Route path="/risk" element={isAuth ? <RiskAssessment /> : <Navigate to="/login" />} />
        <Route path="/roadmap" element={isAuth ? <Roadmap /> : <Navigate to="/login" />} />
        <Route path="/resources" element={isAuth ? <Resources /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />

        {/* Fallback to Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// THIS IS THE CRITICAL MISSING LINE:
export default App;