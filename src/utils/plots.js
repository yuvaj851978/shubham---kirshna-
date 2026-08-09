import defaultPlots from '../data/plots.json';

// === PASTE YOUR JSONBIN KEYS HERE ===
const JSONBIN_ID = '6a782932f5f4af5e29fdcb19';
const JSONBIN_KEY = '$2a$10$3j4QdqpWneqfegInyWRupuQj7OYWXeMz1OJYYYV4qMQSYZvxCcouu';
// ====================================

let inMemoryPlots = [...defaultPlots];

// Fetch the latest data from JSONBin in the background when the app loads
if (JSONBIN_ID !== 'PASTE_YOUR_BIN_ID_HERE') {
  fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
    headers: { 'X-Master-Key': JSONBIN_KEY }
  })
    .then(res => res.json())
    .then(data => {
      if (data.record && Array.isArray(data.record)) {
        inMemoryPlots = data.record;
        // Dispatch an event to let the app know fresh data arrived
        window.dispatchEvent(new CustomEvent('plotsDataLoaded'));
      }
    })
    .catch(console.error);
}

export const getPlots = () => {
  return inMemoryPlots;
};

const saveToServer = (plots) => {
  // Save to JSONBin instead of local server
  if (JSONBIN_ID === 'PASTE_YOUR_BIN_ID_HERE') return;

  fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_KEY
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
