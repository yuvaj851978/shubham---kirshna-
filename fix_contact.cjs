const fs = require('fs');
let c = fs.readFileSync('src/pages/Contact.jsx', 'utf8');

c = c.replace(/import React, \{ useEffect \} from 'react';/, "import React, { useEffect, useState } from 'react';\nimport { addInquiry } from '../utils/inquiries';");
c = c.replace(/import \{ MapPin, Phone, Mail, Clock \} from 'lucide-react';/, "import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';");

const formStart = /<form onSubmit=\{\(e\) => e.preventDefault\(\)\}>[\s\S]*?<\/form>/;

const newComponentLogic = `export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
`;

c = c.replace(/export default function Contact\(\) \{\s*useEffect\(\(\) => \{/, newComponentLogic);

const newForm = `{isSubmitted ? (
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
            )}`;

c = c.replace(formStart, newForm);
fs.writeFileSync('src/pages/Contact.jsx', c);
console.log('Fixed Contact.jsx');
