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
      <section style={{ padding: '6rem 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div style={{ display: 'inline-block', background: 'var(--accent-gold)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '1px' }}>
                WHO WE ARE
              </div>
              <h1 style={{ fontSize: '3.5rem', color: 'var(--accent-dark)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                Shaping the future of <span style={{ color: 'var(--accent-gold)' }}>premium land</span> acquisition.
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                Krishnam Realities is the premier destination for exclusive land acquisition. We connect visionaries with extraordinary plots across India's most highly sought-after corridors, focusing on transparency and uncompromising quality.
              </p>
              
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>15+</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Experience</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>500+</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Plots Delivered</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>100%</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100%', height: '100%', border: '2px solid var(--accent-gold)', borderRadius: 'var(--radius-lg)', zIndex: 0 }}></div>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" 
                alt="Premium Agricultural Land" 
                style={{ width: '100%', height: '550px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-lg)' }} 
              />
              <div style={{ position: 'absolute', bottom: '30px', right: '-30px', background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-dark)', marginBottom: '1rem' }}>Our Core Pillars</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>The foundation of our success is built upon four unshakeable principles that guide every transaction and client relationship.</p>
          </div>
          
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
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
                style={{ padding: '2.5rem 2rem', background: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ width: '70px', height: '70px', background: 'rgba(179, 143, 79, 0.1)', color: 'var(--accent-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
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
      <section style={{ padding: '6rem 0', background: 'var(--accent-dark)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to secure your legacy?</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem', lineHeight: '1.6' }}>
              Speak with our senior land acquisition experts today and discover exclusive properties not available on the open market.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => navigate('/properties')} className="btn" style={{ background: 'var(--accent-gold)', color: 'white', border: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                View Properties <ArrowRight size={20} />
              </button>
              <button onClick={() => navigate('/contact')} className="btn" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
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
