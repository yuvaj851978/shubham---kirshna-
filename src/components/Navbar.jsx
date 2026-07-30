import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="navbar-container" style={{ padding: '0 4rem', width: '100%' }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Krishnam Realities" style={{ height: '80px', objectFit: 'contain' }} />
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/properties" className={`nav-link ${location.pathname === '/properties' ? 'active' : ''}`}>Properties</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </motion.nav>
  );
}
