import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Funds from './pages/Funds';
import Donations from './pages/Donations';

import './App.css';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const Sidebar = () => {
  const location = useLocation();
  return (
    <nav className="sidebar">
      <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Home</Link>
      <Link to="/events" className={location.pathname === "/events" ? "active-link" : ""}>Events</Link>
      <Link to="/gallery" className={location.pathname === "/gallery" ? "active-link" : ""}>Gallery</Link>
      <Link to="/donations" className={location.pathname === "/donations" ? "active-link" : ""}>Donations</Link>
      <Link to="/funds" className={location.pathname === "/funds" ? "active-link" : ""}>Funds</Link>
      <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>About</Link>
      <Link to="/contact" className={location.pathname === "/contact" ? "active-link" : ""}>Contact</Link>
    </nav>
  );
};

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      {user && (
        <div className="app-layout">
          <Sidebar />
          <div className="logout-container">
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      )}

      {/* REMOVED ALL WRAPPERS - DIRECT ROUTES */}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/funds" element={
          <PrivateRoute>
            <Funds />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
