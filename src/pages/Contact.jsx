import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Footer from '../components/Footer';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="contact-page" style={{ paddingTop: '120px' }}>
      <div className="container">
        
        {/* Header */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}
        >
          <h1 style={{ fontSize: '3.5rem', color: 'var(--accent-dark)', marginBottom: '1.5rem' }}>Contact Us</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            Ready to acquire a premium plot? Connect with our dedicated acquisition experts for personalized consultation.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
          
          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--accent-dark)', marginBottom: '2rem' }}>Get in Touch</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-dark)' }}>Office</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Raipur, Chhattishgarh</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-dark)' }}>Phone</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Shalin Shukla<br/>9201135883, 7747013503</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-dark)' }}>Email</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>krishnamrealities@gmail.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-dark)' }}>Working Hours</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(0,0,0,0.05)' }}
          >
            <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-dark)', marginBottom: '2rem' }}>Send a Message</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                <input type="text" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} placeholder="John Doe" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                <input type="email" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} placeholder="john@example.com" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                <textarea rows="5" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} placeholder="How can we help you?"></textarea>
              </div>
              <button className="btn" style={{ width: '100%', padding: '1rem', background: 'var(--accent-gold)', color: 'white', fontSize: '1.1rem' }}>
                Submit Inquiry
              </button>
            </form>
          </motion.div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
