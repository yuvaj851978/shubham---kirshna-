import React from 'react';

export default function FlyingBirds() {
  const birds = Array.from({ length: 4 });

  return (
    <div className="birds-container">
      {birds.map((_, i) => {
        const top = Math.random() * 30 + 5; // Top 5-35% of the screen
        const duration = Math.random() * 20 + 25; // 25-45s to cross screen
        const delay = Math.random() * 15;
        const scale = Math.random() * 0.5 + 0.5; // Scale 0.5x to 1.0x
        
        return (
          <div 
            key={i} 
            className="bird"
            style={{
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              '--scale': scale
            }}
          >
            <svg viewBox="0 0 100 50" width="40" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" className="bird-wings">
              <path d="M 5 25 Q 25 5 50 25 Q 75 5 95 25" stroke="rgba(20, 83, 45, 0.5)" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
        );
      })}
    </div>
  );
}
