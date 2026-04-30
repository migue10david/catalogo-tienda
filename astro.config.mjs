import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sanity({
      projectId: 'nkff3wv9',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2025-03-01',
    }),
  ],
});