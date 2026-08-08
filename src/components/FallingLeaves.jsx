import React from 'react';

export default function FallingLeaves() {
  const leaves = Array.from({ length: 10 });

  return (
    <div className="leaves-container">
      {leaves.map((_, i) => {
        // Randomize the appearance and animation of each leaf
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 8 + 6;
        const animationDelay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        return (
          <div 
            key={i} 
            className="leaf" 
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
              opacity: opacity
            }}
          >
            <svg viewBox="0 0 24 24" fill="var(--accent-gold)" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 3C21 3 13 2 7 8C2 13 3 21 3 21C3 21 11 22 17 16C22 11 21 3 21 3Z" fill="currentColor"/>
              <path d="M3 21L11 13" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        );
      })}
    </div>
  );
}
