import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { hagilight, hagilightFavicon } from '@hagicode/hagilight/integration';
import tailwindcss from '@tailwindcss/vite';
import { movedLessonRedirects } from './src/lib/lessonMoves.ts';

// https://astro.build/config
export default defineConfig({
    // Absolute production origin. Hagilight needs it for the sitemap, robots.txt, RSS and llms.txt.
    site: 'https://fullstack.hagicode.com',
    base: '/',
    i18n: {
        defaultLocale: 'en-US',
        // Mirrors SUPPORTED_LOCALES in src/config/site.ts; scripts/__tests__/routes.test.mjs checks they match.
        locales: ['en-US', 'zh-CN', 'zh-Hant', 'ja-JP', 'ko-KR', 'de-DE', 'fr-FR', 'es-ES', 'pt-BR', 'ru-RU'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    // Old addresses of lessons that moved to another course (src/lib/lessonMoves.ts) send readers to the new address.
    redirects: movedLessonRedirects(),
    markdown: {
        shikiConfig: {
            themes: {
                light: 'github-light-high-contrast',
                dark: 'github-dark-high-contrast',
            },
            defaultColor: false,
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
