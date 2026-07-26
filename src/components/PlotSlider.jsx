import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PlotSlider({ images, singleImage, title }) {
  const currentImages = images && images.length > 0 ? images : (singleImage ? [singleImage] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (currentImages.length === 0) {
    return <div style={{ width: '100%', height: '100%', background: 'var(--bg-alt)' }} />;
  }
  
  if (currentImages.length === 1) {
    return <img src={currentImages[0]} alt={title} className="plot-card-img" />;
  }

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={currentImages[currentIndex]} alt={title} className="plot-card-img" />
      <button 
        onClick={prevSlide}
        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', color: 'var(--accent-dark)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease' }}
        onMouseOver={(e) => e.currentTarget.style.background = 'white'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.85)'}
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide}
        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', color: 'var(--accent-dark)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease' }}
        onMouseOver={(e) => e.currentTarget.style.background = 'white'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.85)'}
      >
        <ChevronRight size={20} />
      </button>
      <div style={{ position: 'absolute', bottom: '10px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 10 }}>
        {currentImages.map((_, idx) => (
          <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.5)', transition: 'all 0.3s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
        ))}
      </div>
    </div>
  );
}
