import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: './env',
  plugins: [react()],
  server: {
    allowedHosts: ['api-candidate-search.onrender.com'], // Add your Render domain here
    host: '0.0.0.0',                   // Bind to all IPs (required by Render)
    port: Number(process.env.PORT) || 5173, // Use Render's assigned port or fallback locally
  },
});