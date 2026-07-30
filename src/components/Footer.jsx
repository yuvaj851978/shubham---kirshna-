import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-logo" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0px' }}>
              <svg width="60" height="25" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 40L50 15L90 40L80 40L50 22L20 40H10Z" fill="#F59E0B" />
                <path d="M50 15L90 40H100L50 10L10 35H0L50 0L100 30L90 40L50 15Z" fill="#F97316" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1', marginTop: '5px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', letterSpacing: '0.05em' }}>KRISHNAM</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', marginTop: '2px' }}>REALITIES</span>
              </div>
            </Link>
            <p className="footer-text">
              Premium land listings, curated for visionary developers and future homeowners. 
              Find the perfect foundation for your next project.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Instagram</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Facebook</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Twitter</a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-heading">Property Types</h4>
            <ul className="footer-links">
              <li><Link to="/properties">Residential Plots</Link></li>
              <li><Link to="/properties">Commercial Land</Link></li>
              <li><Link to="/properties">Industrial Estates</Link></li>
              <li><Link to="/properties">Agricultural</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                <Phone size={16} style={{ flexShrink: 0, marginTop: '4px' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Shalin Shukla</span>
                  <span>9201135883, 7747013503</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                <Mail size={16} /> krishnamrealities@gmail.com
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '4px' }} /> 
                Raipur, Chhattishgarh
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Krishnam Realities. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
