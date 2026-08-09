import defaultPlots from '../data/plots.json';

let inMemoryPlots = [...defaultPlots];

export const getPlots = () => {
  return inMemoryPlots;
};

const saveToServer = (plots) => {
  fetch('/api/plots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plots, null, 2)
  }).catch(console.error);
};

export const addPlot = (plot) => {
  const newPlot = {
    ...plot,
    id: Date.now(),
    status: plot.status || 'Available',
    price: Number(plot.price) || 0,
    lat: Number(plot.lat) || 20.5937,
    lng: Number(plot.lng) || 78.9629,
    landmarks: Array.isArray(plot.landmarks) ? plot.landmarks : (plot.landmarks ? plot.landmarks.split(',').map(l => l.trim()) : [])
  };
  inMemoryPlots = [...inMemoryPlots, newPlot];
  saveToServer(inMemoryPlots);
  return newPlot;
};

export const updatePlot = (id, updatedData) => {
  const index = inMemoryPlots.findIndex(p => p.id === id);
  if (index !== -1) {
    const formattedData = {
      ...updatedData,
      price: Number(updatedData.price) || 0,
      lat: Number(updatedData.lat) || 20.5937,
      lng: Number(updatedData.lng) || 78.9629,
      landmarks: Array.isArray(updatedData.landmarks) ? updatedData.landmarks : (updatedData.landmarks ? updatedData.landmarks.split(',').map(l => l.trim()) : [])
    };
    inMemoryPlots[index] = { ...inMemoryPlots[index], ...formattedData };
    saveToServer(inMemoryPlots);
    return inMemoryPlots[index];
  }
  return null;
};

export const deletePlot = (id) => {
  inMemoryPlots = inMemoryPlots.filter(p => p.id !== id);
  saveToServer(inMemoryPlots);
};
