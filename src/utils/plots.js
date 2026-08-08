import defaultPlots from '../data/plots.json';

// Force update for new theme removed to allow persistence

if (!localStorage.getItem('propertyListings')) {
  localStorage.setItem('propertyListings', JSON.stringify(defaultPlots));
}

export const getPlots = () => {
  return JSON.parse(localStorage.getItem('propertyListings')) || defaultPlots;
};

export const addPlot = (plot) => {
  const currentPlots = getPlots();
  const newPlot = {
    ...plot,
    id: Date.now(), // Generate a unique ID
    status: plot.status || 'Available',
    price: Number(plot.price) || 0,
    lat: Number(plot.lat) || 20.5937,
    lng: Number(plot.lng) || 78.9629,
    landmarks: Array.isArray(plot.landmarks) ? plot.landmarks : (plot.landmarks ? plot.landmarks.split(',').map(l => l.trim()) : [])
  };
  currentPlots.push(newPlot);
  localStorage.setItem('propertyListings', JSON.stringify(currentPlots));
  return newPlot;
};

export const updatePlot = (id, updatedData) => {
  let currentPlots = getPlots();
  const index = currentPlots.findIndex(p => p.id === id);
  if (index !== -1) {
    const formattedData = {
      ...updatedData,
      price: Number(updatedData.price) || 0,
      lat: Number(updatedData.lat) || 20.5937,
      lng: Number(updatedData.lng) || 78.9629,
      landmarks: Array.isArray(updatedData.landmarks) ? updatedData.landmarks : (updatedData.landmarks ? updatedData.landmarks.split(',').map(l => l.trim()) : [])
    };
    currentPlots[index] = { ...currentPlots[index], ...formattedData };
    localStorage.setItem('propertyListings', JSON.stringify(currentPlots));
    return currentPlots[index];
  }
  return null;
};

export const deletePlot = (id) => {
  let currentPlots = getPlots();
  const updatedPlots = currentPlots.filter(p => p.id !== id);
  localStorage.setItem('propertyListings', JSON.stringify(updatedPlots));
};
