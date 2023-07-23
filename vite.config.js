import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForP1ugin = {
  registrationType: 'autoUpdate',
  includeAssets: [
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-192x192.png',
    '/manifest-icon-512.maskable.png',
    '/manifest-icon-192.maskable.png',
  ],
  manifest: {
    name: 'Diagnostic-lab for Doctor',
    short_name: 'Diagnostic-lab',
    description: 'Diagnostic-lab',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple-touch-icon  ',
      },
      {
        src: '/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    start_url: '.',
    lang: 'en-US',
    theme_color: '#9A0007',
    background_color: '#9A0007',
    display: 'standalone',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  // base: './',
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    VitePWA({
      manifest: manifestForP1ugin,
      registerType: 'autoUpdate',
    }),
  ],
  build: {
    // chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
});
