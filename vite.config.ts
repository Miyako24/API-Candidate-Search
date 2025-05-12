import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: './env',
  plugins: [react()],
  server: {
    host: '0.0.0.0',                   // Bind to all IPs (required by Render)
    port: Number(process.env.PORT) || 5173, // Use Render's assigned port or fallback locally
  },
});