import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, IndianRupee, LayoutGrid, ShieldCheck, Map, ArrowRight, Maximize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPlots } from '../utils/plots';
import Footer from '../components/Footer';
import PlotCardMedia from '../components/PlotCardMedia';
import PlotSlider from '../components/PlotSlider';
import heroBgImage from '../assets/land.png';

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    budget: ''
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const featuredPlots = getPlots();
  const allLocations = [...new Set(featuredPlots.map(p => p.location))];
  const filteredSuggestions = searchParams.location 
    ? allLocations.filter(loc => loc.toLowerCase().includes(searchParams.location.toLowerCase()))
    : allLocations;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.location) query.append('location', searchParams.location);
    if (searchParams.type) query.append('type', searchParams.type);
    if (searchParams.budget) query.append('budget', searchParams.budget);
    navigate(`/properties?${query.toString()}`);
  };


  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="home" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Hero Section */}
      <section className="hero">
        <img 
          src={heroBgImage} 
          alt="Premium Agricultural Land" 
          className="hero-bg" 
        />
        <div className="hero-overlay"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="hero-content"
        >
          <h1 className="hero-title">Invest in Land, Invest in Future</h1>
          <p className="hero-subtitle">"Your vision, our expertise. Join Krishnam Realities for prime agricultural land and smart investment insights."</p>
          
          <motion.form 
            className="search-bar-container" 
            onSubmit={handleSearch}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="search-input-group" style={{ position: 'relative' }}>
              <MapPin className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Where to?" 
                className="search-input"
                value={searchParams.location}
                onChange={(e) => {
                  setSearchParams({...searchParams, location: e.target.value});
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 100, marginTop: '0.5rem', maxHeight: '200px', overflowY: 'auto', border: '1px solid rgba(0,0,0,0.05)', padding: '0.5rem 0' }}>
                  {filteredSuggestions.map((loc, i) => (
                    <div 
                      key={i} 
                      style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: i !== filteredSuggestions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', color: 'var(--text-main)', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}
                      onMouseDown={() => {
                        setSearchParams({...searchParams, location: loc});
                        setShowSuggestions(false);
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <MapPin size={14} style={{ marginRight: '8px', color: 'var(--accent-gold)' }} />
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
            
            <motion.div variants={fadeInUp} className="search-input-group">
              <LayoutGrid className="search-icon" size={20} />
              <select 
                className="search-select"
                value={searchParams.type}
                onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
              >
                <option value="">Property Type</option>
                <option value="Farmland">Farmland</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Orchard">Orchard</option>
                <option value="Plantation">Plantation</option>
              </select>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="search-input-group">
              <IndianRupee className="search-icon" size={20} />
              <select 
                className="search-select"
                value={searchParams.budget}
                onChange={(e) => setSearchParams({...searchParams, budget: e.target.value})}
              >
                <option value="">Max Price</option>
                <option value="<500k">Under ₹50 Lakh</option>
                <option value="500k-1m">₹50L - ₹1Cr</option>
                <option value=">1m">Above ₹1Cr</option>
              </select>
            </motion.div>
            
            <motion.button variants={fadeInUp} type="submit" className="btn btn-primary search-btn">
              <Search size={18} /> Find
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="home-section bg-light" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Creeper Vines Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
          <img src="/creeper_transparent.png" alt="Creeper Vine" style={{ width: '20vw', minWidth: '150px', objectFit: 'contain', transformOrigin: 'top center', marginTop: '-3%' }} />
          <img src="/creeper_transparent.png" alt="Creeper Vine" style={{ width: '25vw', minWidth: '200px', objectFit: 'contain', transform: 'scaleX(-1)', transformOrigin: 'top center', marginTop: '-3%' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">The Premium Agricultural Land Standard</h2>
            <p className="section-subtitle">We redefine agricultural land acquisition through uncompromising transparency, exclusive inventory, and seamless end-to-end service.</p>
          </motion.div>
          
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="feature-card">
              <div className="feature-icon-wrap">
                <ShieldCheck size={32} />
              </div>
              <h3 className="feature-title">Verified Heritage</h3>
              <p style={{ color: 'var(--text-muted)' }}>Rigorous legal diligence ensures every agricultural land possesses a flawless title history.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="feature-card">
              <div className="feature-icon-wrap">
                <MapPin size={32} />
              </div>
              <h3 className="feature-title">Strategic Corridors</h3>
              <p style={{ color: 'var(--text-muted)' }}>Curated assets located strictly within high-appreciation, premium development zones.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="feature-card">
              <div className="feature-icon-wrap">
                <Map size={32} />
              </div>
              <h3 className="feature-title">Precision Mapping</h3>
              <p style={{ color: 'var(--text-muted)' }}>Architect-grade topographical and dimensional data provided for absolute certainty.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="home-section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Agricultural Plot Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src="/plot_bg.png" alt="Agricultural Plot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(253, 253, 250, 0.85)' }}></div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Signature Collection</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>An exclusive selection of our finest properties.</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/properties')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View Portfolio <ArrowRight size={18} />
            </button>
          </motion.div>
          
          <div className="featured-scroll-container">
            <motion.div 
              className="featured-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {featuredPlots.map((plot) => (
                <motion.div 
                  key={plot.id}
                  variants={fadeInUp}
                  className="plot-card"
                  onClick={() => navigate(`/properties/${plot.id}`)}
                >
                  <div className={`plot-card-img-wrap ${plot.cardMediaType === 'youtube_shorts' ? 'is-short' : ''}`}>
                    <PlotCardMedia plot={plot} />
                    <span className={`plot-status ${plot.status === 'Available' ? 'available' : ''}`}>
                      {plot.status}
                    </span>
                  </div>
                  <div className="plot-card-content">
                    <div className="plot-price">₹{plot.price.toLocaleString('en-IN')}</div>
                    <h3 className="plot-title">{plot.title}</h3>
                    
                    <div className="plot-meta">
                      <div className="plot-meta-item">
                        <Maximize size={16} />
                        <span>{plot.size} sq ft</span>
                      </div>
                      <div className="plot-meta-item">
                        <MapPin size={16} />
                        <span>{plot.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/cta_bg.png" alt="Lush Green Landscape" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(20, 83, 45, 0.75)', zIndex: -1 }}></div>
        
        <div className="container">
          <motion.div 
            style={{ textAlign: 'center', color: 'white', maxWidth: '800px', margin: '0 auto', padding: '4rem 0' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'white', letterSpacing: '-0.03em' }}>Ready to Acquire?</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.9, lineHeight: 1.8 }}>
              Engage with our acquisitions team today. We provide bespoke consultation to align our exclusive portfolio with your strategic vision.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn" style={{ background: 'var(--accent-gold)', color: 'white', padding: '1rem 3rem', fontSize: '1.1rem' }} onClick={() => navigate('/properties')}>
                Explore Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
