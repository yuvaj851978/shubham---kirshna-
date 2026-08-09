export const getSettings = () => {
  const data = localStorage.getItem('krishnam_settings');
  return data ? JSON.parse(data) : {
    aboutHeroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
  };
};

export const saveSettings = (newSettings) => {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  localStorage.setItem('krishnam_settings', JSON.stringify(updated));
  
  // Dispatch event so other components can re-render
  window.dispatchEvent(new CustomEvent('settingsUpdated'));
  
  return updated;
};
