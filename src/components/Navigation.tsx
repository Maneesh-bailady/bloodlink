import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => (
  <nav className="blood-nav">
    <div className="logo">🩸 Blood Link</div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/donor-details">Donor Details</Link></li>
      <li><Link to="/emergency">Emergency Case</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </ul>
  </nav>
);

export default Navigation;
