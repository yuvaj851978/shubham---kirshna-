import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Maximize, Phone, Mail, ChevronLeft, Building, MessageCircle, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import { getPlots } from '../utils/plots';

const MapResizer = ({ isFullscreen }) => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [isFullscreen, map]);
  return null;
};
import Footer from '../components/Footer';

export default function PlotDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allPlots = getPlots();
  const plot = allPlots.find(p => p.id.toString() === id);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!plot) {
    return <div className="container" style={{ paddingTop: '120px' }}>Plot not found</div>;
  }

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url; 
  };

  const mapLat = parseFloat(plot.lat) || 20.5937;
  const mapLng = parseFloat(plot.lng) || 78.9629;

  return (
    <>
      <div className="plot-detail-page">
        <div className="container">
          <button 
            onClick={() => navigate('/properties')}
        className="btn" 
        style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', background: 'transparent', color: 'var(--primary-teal)', border: '1px solid var(--primary-teal)' }}
      >
        <ChevronLeft size={18} /> Back to Properties
      </button>

      {/* Top Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="detail-header" 
        style={{ paddingBottom: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.08)', alignItems: 'flex-start' }}
      >
        <div className="detail-header-left" style={{ flex: 1, paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <h1 className="detail-title" style={{ margin: 0 }}>{plot.title}</h1>
            <span className={`detail-status ${plot.status === 'Available' ? 'available' : ''}`} style={{ margin: 0 }}>
              {plot.status}
            </span>
          </div>
          <p className="detail-address" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <MapPin size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} /> 
            <span style={{ wordBreak: 'break-word', whiteSpace: 'normal', display: 'block' }}>{plot.address}</span>
          </p>
        </div>
        <div className="detail-price-box" style={{ flexShrink: 0 }}>
          <div className="detail-price">₹{plot.price.toLocaleString('en-IN')}</div>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="detail-grid">
        {/* Left Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="detail-main"
        >
          {/* Main Property Image Gallery */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '3rem', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--bg-alt)' }}>
            {(() => {
              const currentImages = plot.images && plot.images.length > 0 ? plot.images : (plot.image ? [plot.image] : []);
              if (currentImages.length === 1) {
                return <img src={currentImages[0]} alt={plot.title} onClick={() => setLightboxImage(currentImages[0])} style={{ width: '100%', height: '400px', objectFit: 'cover', cursor: 'pointer' }} />;
              } else if (currentImages.length === 2) {
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', height: '400px' }}>
                    <img src={currentImages[0]} alt={plot.title} onClick={() => setLightboxImage(currentImages[0])} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                    <img src={currentImages[1]} alt={plot.title} onClick={() => setLightboxImage(currentImages[1])} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                  </div>
                );
              } else if (currentImages.length >= 3) {
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', height: '400px' }}>
                    <img src={currentImages[0]} alt={plot.title} onClick={() => setLightboxImage(currentImages[0])} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0.5rem', height: '100%' }}>
                      <img src={currentImages[1]} alt={plot.title} onClick={() => setLightboxImage(currentImages[1])} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img src={currentImages[2]} alt={plot.title} onClick={() => setLightboxImage(currentImages[2])} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                        {currentImages.length > 3 && (
                          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => setLightboxImage(currentImages[0])}>
                            +{currentImages.length - 3} Photos
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              return <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No images available</div>;
            })()}
          </div>

          <div className="detail-section" style={{ marginTop: 0 }}>
            <h3 style={{ borderBottom: '2px solid var(--bg-alt)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>About This Property</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {plot.description}
            </p>
          </div>

          {/* Video Section */}
          {plot.youtubeId && (
            <div className="detail-section">
              <h3 style={{ borderBottom: '2px solid var(--bg-alt)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Property Tour</h3>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${getYouTubeId(plot.youtubeId)}`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              </div>
            </div>
          )}

          {/* Map Integration */}
          <div className="detail-section">
            <h3 style={{ borderBottom: '2px solid var(--bg-alt)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Location & Boundaries</h3>
            
            <div 
              className="detail-map" 
              style={{ 
                borderRadius: isFullscreenMap ? '0' : 'var(--radius-lg)', 
                overflow: 'hidden', 
                height: isFullscreenMap ? '100vh' : '300px',
                position: isFullscreenMap ? 'fixed' : 'relative',
                top: isFullscreenMap ? 0 : 'auto',
                left: isFullscreenMap ? 0 : 'auto',
                width: isFullscreenMap ? '100vw' : '100%',
                zIndex: isFullscreenMap ? 99999 : 1
              }}
            >
              <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, display: 'flex', gap: '0.5rem' }}>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plot.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: 'var(--accent-dark)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: 'var(--shadow-md)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                >
                  <Navigation size={16} /> Navigate
                </a>
                <button 
                  onClick={() => setIsFullscreenMap(!isFullscreenMap)}
                  style={{ background: 'white', color: 'var(--accent-dark)', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: 'var(--shadow-md)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Maximize size={16} /> {isFullscreenMap ? 'Close Fullscreen' : 'Fullscreen'}
                </button>
              </div>
              <MapContainer center={[mapLat, mapLng]} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <MapResizer isFullscreen={isFullscreenMap} />
                <TileLayer
                  url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0','mt1','mt2','mt3']}
                  attribution='&copy; Google Maps'
                />
                <Marker position={[mapLat, mapLng]} />
                <Circle center={[mapLat, mapLng]} radius={150} pathOptions={{ color: 'var(--accent-gold)', fillColor: 'var(--accent-gold)', fillOpacity: 0.4 }} />
              </MapContainer>
            </div>
            
            {plot.landmarks && plot.landmarks.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary-teal)' }}>Nearby Landmarks</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {plot.landmarks.map((landmark, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-light)' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }}></div>
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="detail-sidebar"
        >
          <div style={{ position: 'sticky', top: '100px' }}>
            {/* Specifications */}
            <div className="specs-card" style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-teal)' }}>Property Details</h3>
              
              <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Maximize size={18} /> Size</span>
                <span style={{ fontWeight: 600 }}>{plot.size} sq ft</span>
              </div>
              <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={18} /> Type</span>
                <span style={{ fontWeight: 600 }}>{plot.type}</span>
              </div>
              <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}><MapPin size={18} /> Zone</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{plot.location}</span>
              </div>
            </div>

            {/* Contact Card */}
            <div className="contact-card" style={{ background: 'var(--accent-dark)', color: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Interested in this plot?</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.6 }}>Contact our real estate experts today to schedule a viewing or request more information.</p>
              
              <a 
                href={`https://wa.me/${plot.contactNumber || '919201135883'}?text=${encodeURIComponent(`Hi Krishnam Realities, I am interested in ${plot.title} (${plot.size} sq ft) located at ${plot.address}. Is it still available?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn" 
                style={{ width: '100%', marginBottom: '1rem', background: '#25D366', color: 'white', border: 'none', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
              >
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
              <button className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.3)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} /> Email Agent
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
      </div>
      <Footer />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}
          onClick={() => setLightboxImage(null)}
        >
          <img src={lightboxImage} alt="Enlarged view" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          <button 
            onClick={() => setLightboxImage(null)} 
            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', color: 'white', border: 'none', fontSize: '2rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
