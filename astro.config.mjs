import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { hagilight, hagilightFavicon } from '@hagicode/hagilight/integration';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    // Absolute production origin. Hagilight needs it for the sitemap, robots.txt, RSS and llms.txt.
    site: 'https://fullstack.hagicode.com',
    base: '/',
    i18n: {
        defaultLocale: 'en-US',
        locales: ['en-US'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
    integrations: [
        hagilight(),
        hagilightFavicon(),
        // React renders the shadcn components to static HTML at build time. No client:* directive is used.
        react(),
    ],
});
