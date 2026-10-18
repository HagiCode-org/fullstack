import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Keys `<courseId>/<locale>/<lessonId>` for every Markdown body under <coursesDir>/<courseId>/content/<locale>/.
export function readBodyKeys(coursesDir) {
  const keys = new Set();
  for (const course of readdirSync(coursesDir, { withFileTypes: true })) {
    if (!course.isDirectory()) continue;
    const contentDir = join(coursesDir, course.name, 'content');
    if (!existsSync(contentDir)) continue;
    for (const locale of readdirSync(contentDir, { withFileTypes: true })) {
      if (!locale.isDirectory()) continue;
      for (const file of readdirSync(join(contentDir, locale.name))) {
        if (file.endsWith('.md')) keys.add(`${course.name}/${locale.name}/${file.slice(0, -3)}`);
      }
    }
  }
  return keys;
}
