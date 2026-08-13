import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { MapPin, Maximize, ArrowRight, Layers, Search, List } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPlots } from '../utils/plots';
import PlotSlider from '../components/PlotSlider';
import PlotCardMedia from '../components/PlotCardMedia';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Plots() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState({
    status: '',
    type: '',
    locationQuery: '',
    budget: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locParam = params.get('location') || '';
    const typeParam = params.get('type') || '';
    const budgetParam = params.get('budget') || '';

    setFilter(prev => ({
      ...prev,
      locationQuery: locParam,
      type: typeParam,
      budget: budgetParam
    }));
  }, [location.search]);

  const [isSatellite, setIsSatellite] = useState(true);
  const [showMobileMap, setShowMobileMap] = useState(false);

  const allPlots = getPlots();
  const filteredPlots = allPlots.filter(plot => {
    const price = plot.price;
    let budgetMatch = true;
    if (filter.budget === '<500k') budgetMatch = price < 5000000;
    else if (filter.budget === '500k-1m') budgetMatch = price >= 5000000 && price <= 10000000;
    else if (filter.budget === '>1m') budgetMatch = price > 10000000;

    let locationMatch = true;
    if (filter.locationQuery) {
      const q = filter.locationQuery.toLowerCase();
      locationMatch = plot.location.toLowerCase().includes(q) || 
                      plot.address.toLowerCase().includes(q) || 
                      plot.title.toLowerCase().includes(q);
    }

    return (filter.status === '' || plot.status === filter.status) &&
           (filter.type === '' || plot.type === filter.type) &&
           budgetMatch && locationMatch;
  });

  const hasAutoOpened = useRef(false);
  const [countdown, setCountdown] = useState(null);

  const buildWhatsAppMessage = () => {
    let typeStr = filter.type ? `${filter.type} land` : 'property';
    let locStr = filter.locationQuery ? ` near ${filter.locationQuery}` : '';
    
    let budgetStr = '';
    if (filter.budget === '<500k') budgetStr = ' with a budget under ₹50 Lakhs';
    else if (filter.budget === '500k-1m') budgetStr = ' with a budget between ₹50 Lakhs - ₹1 Crore';
    else if (filter.budget === '>1m') budgetStr = ' with a budget above ₹1 Crore';
    else if (filter.budget) budgetStr = ` with a budget of ${filter.budget}`;

    let statusStr = filter.status ? ` (Status: ${filter.status})` : '';

    return `Hi Krishnam Realities, I am looking for ${typeStr}${locStr}${budgetStr}${statusStr}. Can you help me find it?`;
  };

  useEffect(() => {
    // Start countdown if they searched for something and got 0 results
    if (filteredPlots.length === 0 && !hasAutoOpened.current && (filter.type || filter.locationQuery || filter.budget)) {
      setCountdown(3);
    } else if (filteredPlots.length > 0) {
      hasAutoOpened.current = false;
      setCountdown(null);
    }
  }, [filteredPlots.length, filter]);

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !hasAutoOpened.current) {
      hasAutoOpened.current = true;
      const msg = buildWhatsAppMessage();
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const whatsappUrl = isMobile 
        ? `https://wa.me/919201135883?text=${encodeURIComponent(msg)}`
        : `https://web.whatsapp.com/send?phone=919201135883&text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
    }
  }, [countdown, filter]);

  // Calculate center of India for default view
  const mapCenter = filteredPlots.length > 0 
    ? [filteredPlots[0].lat, filteredPlots[0].lng] 
    : [20.5937, 78.9629];

  return (
    <div className="plots-page" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Left Side (Map View) - Stays sticky while list scrolls */}
      <div className={"plots-map-container " + (showMobileMap ? 'active' : '')}>
        <button 
          onClick={() => setIsSatellite(!isSatellite)}
          style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, padding: '0.5rem 1rem', background: 'white', border: 'none', borderRadius: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}
        >
          <Layers size={18} /> {isSatellite ? 'Map View' : 'Satellite View'}
        </button>
        <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url={isSatellite ? "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" : "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"}
            maxZoom={20}
            subdomains={['mt0','mt1','mt2','mt3']}
            attribution='&copy; Google Maps'
          />
          {filteredPlots.map(plot => (
            <Marker 
              key={plot.id} 
              position={[plot.lat, plot.lng]}
              eventHandlers={{
                mouseover: (e) => e.target.openTooltip(),
                mouseout: (e) => e.target.closeTooltip(),
                click: (e) => {
                  const map = e.target._map;
                  map.flyTo([plot.lat, plot.lng], 14, { duration: 1.5 });
                }
              }}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <div style={{ textAlign: 'center' }}>
                  <strong>{plot.title}</strong><br/>
                  ₹{plot.price.toLocaleString('en-IN')}<br/>
                  {plot.location}
                </div>
              </Tooltip>
              <Popup>
                <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', color: 'var(--accent-dark)' }}>{plot.title}</h4>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>₹{plot.price.toLocaleString('en-IN')}</p>
                  <button onClick={() => navigate(`/properties/${plot.id}`)} className="btn" style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}>
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Floating Map Toggle for Mobile */}
      <div className="mobile-map-toggle">
        <button 
          onClick={() => setShowMobileMap(!showMobileMap)} 
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'var(--accent-dark)', 
            color: 'white', 
            border: 'none', 
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {showMobileMap ? <List size={26} /> : <MapPin size={26} />}
        </button>
      </div>

      {/* Right Side (List View) */}
      <div className="plots-sidebar">
        <div className="plots-filters">
          <div className="filter-header">
            <h3>Land ({filteredPlots.length})</h3>
          </div>
          <div className="filter-row">
            <select 
              className="filter-select"
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </select>
            
            <select 
              className="filter-select"
              value={filter.type}
              onChange={(e) => setFilter({...filter, type: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Industrial">Industrial</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Highway">Highway</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="plots-list">
          {filteredPlots.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)', gridColumn: '1 / -1', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ background: 'rgba(37, 211, 102, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#25D366' }}>
                <Search size={40} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-dark)' }}>No properties found</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                We couldn't find exactly what you're looking for right now, but we have exclusive off-market options available!
              </p>
              <a 
                href={(() => {
                  const msg = buildWhatsAppMessage();
                  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                  return isMobile 
                    ? `https://wa.me/919201135883?text=${encodeURIComponent(msg)}`
                    : `https://web.whatsapp.com/send?phone=919201135883&text=${encodeURIComponent(msg)}`;
                })()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: 'white', fontWeight: 'bold' }}
              >
                WhatsApp Your Requirement {countdown !== null && countdown > 0 ? `(${countdown}s)` : ''}
              </a>
            </div>
          ) : (
            filteredPlots.map((plot, index) => (
            <motion.div 
              key={plot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
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
                
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {plot.description}
                </p>
                
                <button className="btn btn-outline" style={{ width: '100%', padding: '0.5rem' }}>
                  View Full Details <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )))}
        </div>
      </div>
    </div>
  );
}
