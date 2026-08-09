import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          cursor: 'pointer', background: 'transparent',
          color: value ? 'var(--text-main)' : 'var(--text-light)',
          height: '100%', width: '100%', border: 'none', outline: 'none'
        }}
      >
        <span style={{ fontSize: '1rem' }}>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--text-light)' }} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            style={{ 
              position: 'absolute', top: 'calc(100% + 15px)', left: '-40px', width: 'calc(100% + 40px)', 
              background: 'white', borderRadius: 'var(--radius-md)', 
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 100,
              border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden'
            }}
          >
            <div 
              style={{ padding: '0.85rem 1.25rem', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-light)', transition: 'background 0.2s' }}
              onClick={() => { onChange(''); setIsOpen(false); }}
              onMouseOver={e => e.currentTarget.style.background = 'var(--bg-alt)'}
              onMouseOut={e => e.currentTarget.style.background = 'white'}
            >
              {placeholder}
            </div>
            {options.map((opt, i) => (
              <div 
                key={i}
                style={{ 
                  padding: '0.85rem 1.25rem', cursor: 'pointer', 
                  borderBottom: i !== options.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  color: 'var(--text-main)', transition: 'background 0.2s',
                  background: value === opt.value ? 'var(--bg-alt)' : 'white',
                  fontWeight: value === opt.value ? '600' : '400'
                }}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                onMouseOver={e => { if (value !== opt.value) e.currentTarget.style.background = '#f8f9fa' }}
                onMouseOut={e => { if (value !== opt.value) e.currentTarget.style.background = 'white' }}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
