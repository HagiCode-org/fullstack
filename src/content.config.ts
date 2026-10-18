import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// One entry per lesson body, with the id <courseId>/<locale>/<lessonId> that lib/lessonBody.ts looks up.
const lessons = defineCollection({
  loader: glob({
    pattern: '*/content/*/*.md',
    base: './src/courses',
    generateId: ({ entry }) =>
      entry.replace(/\.md$/u, '').replace(/^([^/]+)\/content\/([^/]+)\//u, '$1/$2/'),
  }),
});

export const collections = { lessons };
