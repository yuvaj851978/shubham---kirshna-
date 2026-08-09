import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Path to the local JSON file
const dataFilePath = path.join(__dirname, 'src', 'data', 'plots.json');

// API Routes for reading and writing data
app.get('/api/plots', (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json([]);
  }
});

app.post('/api/plots', (req, res) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve the React static build files
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
