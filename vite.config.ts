// Conteúdo do vite.config.ts:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ADICIONAMOS ESTE BLOCO PARA FORÇAR A DETECÇÃO DO PostCSS/Tailwind
  css: {
    postcss: {}, 
  },
});