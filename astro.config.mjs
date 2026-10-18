import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { hagilight, hagilightFavicon } from '@hagicode/hagilight/integration';

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
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
    integrations: [
        hagilight(),
        hagilightFavicon(),
    ],
});
