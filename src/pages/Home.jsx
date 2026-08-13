import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, IndianRupee, LayoutGrid, ShieldCheck, Map, ArrowRight, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentBg, setCurrentBg] = useState(0);

  const heroImages = [
    heroBgImage,
    '/land2.png',
    '/land3.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featuredScrollRef = useRef(null);

  const scrollLeft = () => {
    if (featuredScrollRef.current) {
      featuredScrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (featuredScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = featuredScrollRef.current;
      // Add a small threshold (10px) to handle fractional pixel rounding
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        featuredScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        featuredScrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      scrollRight();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg}
            src={heroImages[currentBg]}
            alt="Premium Land"
            className="hero-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
        <div className="hero-overlay"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Invest in Land,<br />Invest in Future
          </h1>
          <p className="hero-subtitle">
            Your vision, our expertise. Join Krishnam Realities<br />for prime land and smart investment insights.
          </p>
          
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
                <option value="">Land Type</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Industrial">Industrial</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Highway">Highway</option>
                <option value="Other">Other</option>
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

      <div style={{ position: 'relative', backgroundImage: 'url(/plot_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(10, 30, 15, 0.75)', zIndex: 0 }}></div>

      {/* Featured Properties Section */}
      <section className="home-section" style={{ position: 'relative', zIndex: 10 }}>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem', color: 'white' }}>Signature Collection</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>An exclusive selection of our finest properties.</p>
            </div>
            
            <button className="btn btn-outline" onClick={() => navigate('/properties')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View Portfolio <ArrowRight size={18} />
            </button>
          </motion.div>
          
          <div style={{ position: 'relative', width: '100%' }}>
            <button 
              onClick={scrollLeft}
              className="slider-nav-btn"
              style={{ position: 'absolute', left: '-24px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', zIndex: 20 }}
            >
              <ChevronLeft size={24} style={{ color: 'var(--primary-dark)' }} />
            </button>
            <button 
              onClick={scrollRight}
              className="slider-nav-btn"
              style={{ position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', zIndex: 20 }}
            >
              <ChevronRight size={24} style={{ color: 'var(--primary-dark)' }} />
            </button>

            <div className="featured-scroll-container" ref={featuredScrollRef} style={{ scrollBehavior: 'smooth', margin: 0, paddingBottom: '2rem', overflowX: 'auto', overflowY: 'hidden', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              <style>{'\n.featured-scroll-container::-webkit-scrollbar { display: none; }\n'}</style>
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
                  </div>
                  <div className="plot-card-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <div className="plot-price" style={{ marginBottom: 0 }}>₹{plot.price.toLocaleString('en-IN')}</div>
                      <span className={`plot-status ${plot.status === 'Available' ? 'available' : ''}`}>
                        {plot.status}
                      </span>
                    </div>
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
        </div>
      </section>

      {/* About Us / What We Do Section */}
      <section className="home-section" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 className="section-title" style={{ color: 'white' }}>About Us & What We Do</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto', marginBottom: '2.5rem' }}>
              We are Krishnam Realities, your trusted partner in premium land acquisition. We specialize in identifying, verifying, and securing prime agricultural, commercial, and residential plots that align with your strategic vision and investment goals.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', padding: '1.5rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>10+</div>
                <div style={{ color: 'white', fontWeight: '500', fontSize: '1.1rem' }}>Years of Experience</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', padding: '1.5rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>50+</div>
                <div style={{ color: 'white', fontWeight: '500', fontSize: '1.1rem' }}>Projects Delivered</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="feature-card" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="feature-icon-wrap" style={{ background: 'var(--accent-gold)', color: 'white', border: 'none' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 className="feature-title" style={{ color: 'white' }}>Verified Heritage</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Rigorous legal diligence ensures every land possesses a flawless title history.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="feature-card" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="feature-icon-wrap" style={{ background: 'var(--accent-gold)', color: 'white', border: 'none' }}>
                <MapPin size={32} />
              </div>
              <h3 className="feature-title" style={{ color: 'white' }}>Strategic Corridors</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Curated assets located strictly within high-appreciation, premium development zones.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="feature-card" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="feature-icon-wrap" style={{ background: 'var(--accent-gold)', color: 'white', border: 'none' }}>
                <Map size={32} />
              </div>
              <h3 className="feature-title" style={{ color: 'white' }}>Precision Mapping</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Architect-grade topographical and dimensional data provided for absolute certainty.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      </div>

      {/* CTA Section */}
      <section className="home-section" style={{ position: 'relative', zIndex: 10 }}>
        <img src="/cta_bg.png" alt="Lush Green Landscape" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent', zIndex: -1 }}></div>
        
        <div className="container">
          <motion.div 
            style={{ 
              textAlign: 'center', 
              color: 'white', 
              maxWidth: '800px', 
              margin: '0 auto', 
              padding: '3.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="section-title" style={{ marginBottom: '1.5rem', color: 'white' }}>Ready to Acquire?</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '3rem', fontWeight: 500, lineHeight: 1.8 }}>
              Engage with our acquisitions team today. We provide Agricultural, Industrial, Commercial, Residential, and Highway lands to align our exclusive portfolio with your strategic vision.
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
