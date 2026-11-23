import { parseGlossary, type GlossaryEntry } from './glossary.ts';

// Every course's glossary, read at build time from src/glossary/<course id>.json. A course without a file has no terms.
const files = import.meta.glob<unknown>('../glossary/*.json', { eager: true, import: 'default' });

export const glossaries: Record<string, GlossaryEntry[]> = Object.fromEntries(
  Object.entries(files).map(([path, data]) => {
    const courseId = path.slice(path.lastIndexOf('/') + 1).replace(/\.json$/u, '');
    return [courseId, parseGlossary(courseId, data)];
  }),
);
