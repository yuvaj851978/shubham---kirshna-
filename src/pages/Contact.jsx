import React, { useEffect, useState } from 'react';
import { addInquiry } from '../utils/inquiries';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>1087-88 1st floor, Lalganga Currency Tower,<br/>VIP Square, Raipur (C.G)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-dark)' }}>Phone</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Shalin Shukla (Director) - 9201135883<br/>Anamika Shukla (Founder) - 7747013503</p>
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
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Monday - Saturday: 9:00 AM - 7:00 PM<br/>Sunday: 12:00 PM - 4:00 PM</p>
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
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={64} style={{ color: 'var(--success)', margin: '0 auto 1.5rem' }} />
                <h4 style={{ fontSize: '1.5rem', color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>Inquiry Sent Successfully!</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Thank you for reaching out. Our team will contact you shortly.</p>
                <button onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }} className="btn btn-outline">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              addInquiry(formData);
              setIsSubmitted(true);
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} placeholder="John Doe" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} placeholder="john@example.com" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} placeholder="+91 9876543210" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="btn" style={{ width: '100%', padding: '1rem', background: 'var(--accent-gold)', color: 'white', fontSize: '1.1rem' }}>
                Submit Inquiry
              </button>
            </form>
            )}
          </motion.div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
