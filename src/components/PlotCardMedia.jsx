import React, { useState, useRef, useEffect } from 'react';
import PlotSlider from './PlotSlider';
import { Maximize } from 'lucide-react';

export default function PlotCardMedia({ plot }) {
  const mediaType = plot.cardMediaType || 'images';
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url; 
  };

  const videoId = getYouTubeId(plot.youtubeId);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!document.fullscreenElement) {
      if (containerRef.current && containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (mediaType === 'youtube_shorts' && videoId) {
    return (
      <div 
        ref={containerRef} 
        style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', background: '#000', pointerEvents: 'auto' }}
      >
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=${isFullscreen ? 1 : 0}&modestbranding=1&playsinline=1`} 
          title="YouTube Shorts"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          style={{ width: '100%', height: '100%', pointerEvents: isFullscreen ? 'auto' : 'none' }}
        ></iframe>
        
        {!isFullscreen && (
          <button 
            onClick={toggleFullscreen}
            style={{ 
              position: 'absolute', 
              bottom: '10px', 
              right: '10px', 
              background: 'rgba(0,0,0,0.6)', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.2)', 
              borderRadius: '4px', 
              padding: '0.5rem', 
              cursor: 'pointer', 
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Full Screen"
          >
            <Maximize size={18} />
          </button>
        )}
      </div>
    );
  }

  // Default to images
  return <PlotSlider images={plot.images} singleImage={plot.image} title={plot.title} />;
}
