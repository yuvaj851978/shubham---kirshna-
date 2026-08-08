import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function About() {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="about-page" style={{ paddingTop: '80px', background: 'var(--bg-main)' }}>
      
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-grid">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="about-badge">
                WHO WE ARE
              </div>
              <h1 className="about-title">
                Shaping the future of <span style={{ color: 'var(--accent-gold)' }}>premium land</span> acquisition.
              </h1>
              <p className="about-subtitle">
                Krishnam Realities is the premier destination for exclusive land acquisition. We connect visionaries with extraordinary plots across India's most highly sought-after corridors, focusing on transparency and uncompromising quality.
              </p>
              
              <div className="about-stats">
                <div>
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div>
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Plots Delivered</div>
                </div>
                <div>
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="about-hero-img-wrap"
            >
              <div className="about-hero-img-bg"></div>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" 
                alt="Premium Land" 
                className="about-hero-img"
              />
              <div className="about-hero-badge">
                <div style={{ background: 'var(--success)', borderRadius: '50%', padding: '0.5rem', display: 'flex', color: 'white' }}>
                  <CheckCircle size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-dark)' }}>Verified Titles</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>100% safe investments</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '8rem 0' }} className="about-core-values">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
            <h2 className="section-title">Our Core Pillars</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>The foundation of our success is built upon four unshakeable principles that guide every transaction and client relationship.</p>
          </div>
          
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="values-grid"
          >
            {[
              { icon: <Shield size={36} />, title: "Absolute Trust", desc: "Rigorous legal diligence ensures every plot possesses a flawless title history." },
              { icon: <Target size={36} />, title: "Precision Focus", desc: "Curated assets located strictly within high-appreciation, premium development zones." },
              { icon: <Award size={36} />, title: "Premium Quality", desc: "We only list properties that meet our incredibly strict internal quality threshold." },
              { icon: <Users size={36} />, title: "Client Centric", desc: "Bespoke consultation to align our exclusive portfolio with your strategic vision." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="value-card"
              >
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-dark)', fontSize: '1.4rem' }}>{value.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <h2 className="about-cta-title">Ready to secure your legacy?</h2>
            <p className="about-cta-subtitle">
              Speak with our senior land acquisition experts today and discover exclusive properties not available on the open market.
            </p>
            <div className="about-cta-buttons">
              <button onClick={() => navigate('/properties')} className="btn btn-primary-gold">
                View Properties <ArrowRight size={20} />
              </button>
              <button onClick={() => navigate('/contact')} className="btn btn-outline-white">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
