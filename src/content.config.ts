import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Optional lesson metadata, written in the en-US frontmatter. Every field is optional so a Draft lesson still builds;
// scripts/check-tutorial-content.mjs requires all three once a course is finished.
const lessonMeta = z.object({
  // Estimated reading time in minutes: a whole number from 10 to 45.
  minutes: z.number().int().min(10).max(45).optional(),
  // One sentence: what the reader gets from this lesson.
  outcome: z.string().min(1).optional(),
  // Glossary ids of the terms this lesson introduces, at most three. Each id is in src/glossary/<course id>.json.
  terms: z.array(z.string().regex(/^[a-z0-9-]+$/u)).max(3).optional(),
});

// One entry per lesson body, with the id <courseId>/<locale>/<lessonId> that lib/lessonBody.ts looks up.
const lessons = defineCollection({
  loader: glob({
    pattern: '*/content/*/*.md',
    base: './src/courses',
    generateId: ({ entry }) =>
      entry.replace(/\.md$/u, '').replace(/^([^/]+)\/content\/([^/]+)\//u, '$1/$2/'),
  }),
  schema: lessonMeta,
});

export const collections = { lessons };
