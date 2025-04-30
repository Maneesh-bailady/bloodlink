import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DonorDetailsPage from './pages/DonorDetailsPage';
import EmergencyCasePage from './pages/EmergencyCasePage';

const App: React.FC = () => (
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/donor-details" element={<DonorDetailsPage />} />
      <Route path="/emergency" element={<EmergencyCasePage />} />
    </Routes>
  </Router>
);

export default App;
