import React from 'react';
import PlotSlider from './PlotSlider';

export default function PlotCardMedia({ plot }) {
  const mediaType = plot.cardMediaType || 'images';
  
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url; 
  };

  const videoId = getYouTubeId(plot.youtubeId);


  if (mediaType === 'youtube_shorts' && videoId) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', background: '#000', pointerEvents: 'auto' }}>
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`} 
          title="YouTube Shorts"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      </div>
    );
  }

  // Default to images
  return <PlotSlider images={plot.images} singleImage={plot.image} title={plot.title} />;
}
