import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  publicDir: 'assets',
  integrations: [tailwind()],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.steinchong.com',
        pathname: '/**',
      },
    ],
  },
});
