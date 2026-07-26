import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Plots from './pages/Plots';
import PlotDetail from './pages/PlotDetail';
import Admin from './pages/Admin';
import AdminProjectDetail from './pages/AdminProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Plots />} />
        <Route path="/properties/:id" element={<PlotDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/projects/:id" element={<AdminProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
