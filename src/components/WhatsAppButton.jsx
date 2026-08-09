import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { getPlots } from '../utils/plots';

export default function WhatsAppButton() {
  const location = useLocation();
  const plots = getPlots();
  
  let phoneNumber = '919201135883'; // Default number with country code
  let defaultMessage = 'Hi Krishnam Realities, I am interested in your land listings.';
  
  // Check if we are on a property detail page
  if (location.pathname.startsWith('/properties/')) {
    const id = parseInt(location.pathname.split('/')[2]);
    const plot = plots.find(p => p.id === id);
    if (plot) {
      if (plot.contactNumber) {
        // Strip any non-numeric characters just in case
        let cleanNumber = plot.contactNumber.replace(/\D/g, '');
        // If it's a 10 digit Indian number, add 91 country code
        if (cleanNumber.length === 10) cleanNumber = '91' + cleanNumber;
        phoneNumber = cleanNumber;
      }
      defaultMessage = `Hi Krishnam Realities, I am interested in ${plot.title} (${plot.size} sq ft) located at ${plot.address}. Is it still available?`;
    }
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-btn"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
