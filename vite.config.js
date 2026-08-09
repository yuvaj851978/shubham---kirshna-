import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const fileStoragePlugin = () => ({
  name: 'file-storage-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/plots' && req.method === 'GET') {
        const filePath = path.resolve(process.cwd(), 'src/data/plots.json');
        try {
          const data = fs.readFileSync(filePath, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(data);
        } catch (e) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify([]));
        }
        return;
      }
      if (req.url === '/api/plots' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const filePath = path.resolve(process.cwd(), 'src/data/plots.json');
          fs.writeFileSync(filePath, body, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        });
        return;
      }
      next();
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fileStoragePlugin()],
})
