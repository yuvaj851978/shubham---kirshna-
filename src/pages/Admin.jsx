import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, CheckCircle, Plus, ChevronRight, ChevronLeft, LayoutList, Trash2, Edit, Search, Image as ImageIcon, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { getPlots, addPlot, updatePlot, deletePlot } from '../utils/plots';

const LocationPicker = ({ formData, setFormData }) => {
  useMapEvents({
    click(e) {
      setFormData(prev => ({
        ...prev,
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }));
    },
  });
  return formData.lat && formData.lng ? <Marker position={[formData.lat, formData.lng]} /> : null;
};

const MapUpdater = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], map.getZoom() < 12 ? 14 : map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
};

export default function Admin() {
  const navigate = useNavigate();
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'add-form'
  const [plots, setPlots] = useState([]);
  
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [mapSearch, setMapSearch] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    address: '',
    type: 'Residential',
    size: '',
    status: 'Available',
    image: '',
    images: [],
    youtubeId: '',
    cardMediaType: 'images',
    lat: '',
    lng: '',
    description: '',
    landmarks: '',
    contactNumber: ''
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    setPlots(getPlots());
  }, [view]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => {
          const currentImages = prev.images && prev.images.length > 0 ? prev.images : (prev.image ? [prev.image] : []);
          return { ...prev, images: [...currentImages, reader.result] };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const addImageUrl = () => {
    if (imageUrlInput) {
      setFormData(prev => {
        const currentImages = prev.images && prev.images.length > 0 ? prev.images : (prev.image ? [prev.image] : []);
        return { ...prev, images: [...currentImages, imageUrlInput] };
      });
      setImageUrlInput('');
    }
  };

  const removeImage = (index) => {
    setFormData(prev => {
      const currentImages = prev.images && prev.images.length > 0 ? prev.images : (prev.image ? [prev.image] : []);
      const newImages = [...currentImages];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (mapSearch.trim().length > 2) {
        setIsSearching(true);
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapSearch)}`);
          const data = await response.json();
          setSearchSuggestions(data || []);
        } catch (err) {
          console.error(err);
          setSearchSuggestions([]);
        }
        setIsSearching(false);
      } else {
        setSearchSuggestions([]);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [mapSearch]);

  const handleSuggestionClick = (suggestion) => {
    const parts = suggestion.display_name.split(',').map(s => s.trim());
    const shortLocation = parts.length >= 2 ? `${parts[0]}, ${parts[1]}` : parts[0];

    setFormData(prev => ({ 
      ...prev, 
      lat: parseFloat(suggestion.lat), 
      lng: parseFloat(suggestion.lon),
      address: suggestion.display_name,
      location: shortLocation
    }));
    setMapSearch(suggestion.display_name);
    setSearchSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updatePlot(editingId, formData);
    } else {
      addPlot(formData);
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setStep(1);
      setView('dashboard');
      setEditingId(null);
      setFormData({
        title: '', price: '', location: '', address: '', type: 'Residential', size: '', status: 'Available', image: '', images: [], youtubeId: '', cardMediaType: 'images', lat: '', lng: '', description: '', landmarks: '', contactNumber: ''
      });
    }, 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deletePlot(id);
      setPlots(getPlots());
    }
  };

  const handleEdit = (plot) => {
    setEditingId(plot.id);
    setFormData({
      ...plot,
      landmarks: Array.isArray(plot.landmarks) ? plot.landmarks.join(', ') : plot.landmarks || ''
    });
    setStep(1);
    setView('add-form');
  };

  // Render Dashboard
  if (view === 'dashboard') {
    return (
      <div className="admin-page container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your property portfolio</p>
          </div>
          <button onClick={() => setView('add-form')} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-gold)', color: 'white' }}>
            <Plus size={18} /> Add New Project
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--bg-alt)', borderBottom: '1px solid rgba(0,0,0,0.05)', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Title</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Location</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plots.map(plot => (
                <tr key={plot.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{plot.title}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{plot.location}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>₹{plot.price.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: plot.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.05)', color: plot.status === 'Available' ? 'var(--success)' : 'var(--text-muted)' }}>
                      {plot.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem' }}>
                      <button onClick={() => navigate(`/admin/projects/${plot.id}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-teal)', padding: '0.25rem' }} title="View">
                        <LayoutList size={18} />
                      </button>
                      <button onClick={() => handleEdit(plot)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '0.25rem' }} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(plot.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '0.25rem' }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render Add Form
  return (
    <div className="admin-page container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>{editingId ? 'Edit Project' : 'Add New Project'}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Step {step} of 3</p>
        </div>
        <button onClick={() => { setView('dashboard'); setStep(1); setEditingId(null); setFormData({
        title: '', price: '', location: '', address: '', type: 'Residential', size: '', status: 'Available', image: '', images: [], youtubeId: '', cardMediaType: 'images', lat: '', lng: '', description: '', landmarks: '', contactNumber: ''
      }); }} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Cancel
        </button>
      </div>

      <div className="admin-form">
        {/* Step Indicator */}
        {!success && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: 'var(--bg-alt)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '50%', left: 0, width: `${(step - 1) * 50}%`, height: '2px', background: 'var(--primary-teal)', zIndex: 1, transition: 'var(--transition)' }}></div>
            
            {[1, 2, 3].map(num => (
              <div key={num} style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= num ? 'var(--primary-teal)' : 'var(--bg-alt)', color: step >= num ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, fontWeight: 'bold', border: '4px solid white' }}>
                {num}
              </div>
            ))}
          </div>
        )}

        {success ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h2>{editingId ? 'Listing Updated Successfully!' : 'Listing Added Successfully!'}</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="form-step">
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-dark)' }}>Basic Information</h3>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Project Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Royal Heritage Estates" />
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>Price (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 15000000" />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>Size (sq ft)</label>
                    <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 2500" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>Land Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Agricultural">Agricultural</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                      <option value="Available">Available</option>
                      <option value="Sold Out">Sold Out</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>WhatsApp Contact Number</label>
                  <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="e.g. 919876543210 (Include country code)" />
                </div>
              </div>
            )}

            {/* STEP 2: Location Details */}
            {step === 2 && (
              <div className="form-step">
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-dark)' }}>Location & Mapping</h3>
                
                <div className="form-group" style={{ marginBottom: '1rem', position: 'relative' }}>
                  <label>Search Auto-Fill (Search here to auto-fill details)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input 
                        type="text" 
                        value={mapSearch} 
                        onChange={(e) => setMapSearch(e.target.value)} 
                        placeholder="Start typing to search locations... (e.g. Bhanpuri)" 
                        style={{ width: '100%', paddingRight: '2rem' }} 
                      />
                      {isSearching && (
                        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', border: '2px solid var(--primary-teal)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                      )}
                    </div>
                  </div>
                  
                  {searchSuggestions.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', zIndex: 9999, maxHeight: '200px', overflowY: 'auto', marginTop: '4px' }}>
                      {searchSuggestions.map((suggestion, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: idx !== searchSuggestions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', fontSize: '0.9rem', color: 'var(--text-main)', transition: 'background 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Location / Zone (Short)</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Lonavala, Maharashtra" />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Full Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="e.g. 123 Sunrise Blvd, Lonavala, MH 410401" />
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>Map Latitude</label>
                    <input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} placeholder="e.g. 18.7481" />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>Map Longitude</label>
                    <input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} placeholder="e.g. 73.4072" />
                  </div>
                </div>

                <div style={{ height: '300px', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
                  <MapContainer 
                    center={[formData.lat || 20.5937, formData.lng || 78.9629]} 
                    zoom={formData.lat ? 15 : 4} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                      maxZoom={20}
                      subdomains={['mt0','mt1','mt2','mt3']}
                      attribution="&copy; Google Maps"
                    />
                    <LocationPicker formData={formData} setFormData={setFormData} />
                    <MapUpdater lat={formData.lat} lng={formData.lng} />
                  </MapContainer>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  * Click anywhere on the map above to automatically pin the location and fill the coordinates.
                </p>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Nearby Landmarks</label>
                  <input type="text" name="landmarks" value={formData.landmarks} onChange={handleChange} placeholder="e.g. Lake (1km), Station (3km)" />
                </div>
              </div>
            )}

            {/* STEP 3: Media & Details */}
            {step === 3 && (
              <div className="form-step">
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-dark)' }}>Media & Description</h3>
                
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Property Images (Upload or paste URLs)</label>
                  
                  {/* Image List Preview */}
                  <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    {(() => {
                      const currentImages = formData.images && formData.images.length > 0 ? formData.images : (formData.image ? [formData.image] : []);
                      return currentImages.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                          <img src={img} alt={`Preview ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <X size={14} />
                          </button>
                        </div>
                      ));
                    })()}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* File Upload Button */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-alt)', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '1px dashed rgba(0,0,0,0.2)' }}>
                      <ImageIcon size={18} /> Upload Image(s)
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                    <span style={{ color: 'var(--text-muted)' }}>OR</span>
                    {/* URL Input */}
                    <div style={{ display: 'flex', flex: 1, gap: '0.5rem', minWidth: '250px' }}>
                      <input type="text" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} placeholder="Paste image URL here..." style={{ flex: 1 }} />
                      <button type="button" onClick={addImageUrl} className="btn btn-outline" style={{ padding: '0 1rem' }}>Add URL</button>
                    </div>
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>YouTube Video ID (For both full video & card media)</label>
                  <input type="text" name="youtubeId" value={formData.youtubeId} onChange={handleChange} placeholder="e.g. dQw4w9WgXcQ" />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Card Display Media</label>
                  <select name="cardMediaType" value={formData.cardMediaType} onChange={handleChange}>
                    <option value="images">Image Slider (Default)</option>
                    <option value="youtube_shorts">YouTube Shorts</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Full Description</label>
                  <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Describe the property in detail..."></textarea>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '2rem' }}>
              {step > 1 && (
                <button type="button" onClick={prevStep} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
                  <ChevronLeft size={18} /> Go Back
                </button>
              )}
              
              {step < 3 && (
                <button type="button" onClick={nextStep} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#134B70', color: 'white', flex: 2, justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
                  Proceed to Step {step + 1} <ChevronRight size={18} />
                </button>
              )}

              {step === 3 && (
                <button type="button" onClick={handleSubmit} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#D4AF37', color: 'white', flex: 2, justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
                  <Save size={18} /> {editingId ? 'Save Changes' : 'Publish Project'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
