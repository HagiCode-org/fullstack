import { DEFAULT_LOCALE, type Locale } from '../config/site.ts';

// Glossary data: one JSON array per course in src/glossary/<course id>.json. Term texts are written in en-US only;
// another locale shows the English text and the page says so.

const ID_PATTERN = /^[a-z0-9-]+$/u;

// A text with an en-US value and optional translations.
export type LocalText = { 'en-US': string } & Partial<Record<Locale, string>>;

export interface GlossaryEntry {
  // Unique within its course. Lesson frontmatter lists it in `terms`, and term links in lesson text name it.
  id: string;
  term: LocalText;
  // One sentence each.
  definition: LocalText;
  analogy: LocalText;
  // The id of the lesson that introduces the term.
  introducedIn: string;
}

// The anchor of a term on the glossary page. Term links in lesson text point at /glossary/#<this>.
export function glossaryAnchor(courseId: string, termId: string): string {
  return `${courseId}-${termId}`;
}

// How a lesson links to a term, written as a plain Markdown link in the lesson body:
//   [container](../../../glossary/#docker-for-beginners-container)
// The path is relative and the same for every locale: lesson pages sit three levels below the locale root
// (/courses/<course>/<lesson>/ or /<locale>/courses/<course>/<lesson>/), so the glossary of the reader's own locale is reached.
export function termLinkHref(courseId: string, termId: string): string {
  return `../../../glossary/#${glossaryAnchor(courseId, termId)}`;
}

// Checks one course's glossary data and returns its entries. Throws with one message per problem, so a bad file fails the build.
export function parseGlossary(courseId: string, value: unknown): GlossaryEntry[] {
  const file = `src/glossary/${courseId}.json`;
  if (!Array.isArray(value)) throw new Error(`${file} must be a JSON array of entries`);
  const failures: string[] = [];
  const ids = new Set<string>();
  value.forEach((entry: unknown, index) => {
    const label = `${file} entry ${index + 1}`;
    if (!isRecord(entry)) {
      failures.push(`${label} must be an object`);
      return;
    }
    const id = entry.id;
    if (typeof id !== 'string' || !ID_PATTERN.test(id)) {
      failures.push(`${label} needs an id matching [a-z0-9-]+`);
    } else {
      if (ids.has(id)) failures.push(`${label}: id "${id}" is used more than once`);
      ids.add(id);
    }
    const where = typeof id === 'string' ? `${label} ("${id}")` : label;
    for (const field of ['term', 'definition', 'analogy'] as const) {
      if (!hasEnglish(entry[field])) failures.push(`${where} needs a non-empty "${field}" text for en-US`);
    }
    if (typeof entry.introducedIn !== 'string' || entry.introducedIn === '') {
      failures.push(`${where} needs the id of the lesson that introduces it in "introducedIn"`);
    }
  });
  if (failures.length > 0) throw new Error(failures.join('\n'));
  return value as GlossaryEntry[];
}

// The text in a locale, or the en-US text when the locale has none. `fallback` says which one was used.
export function glossaryText(text: LocalText, locale: Locale): { value: string; fallback: boolean } {
  const own = text[locale];
  if (typeof own === 'string' && own.trim() !== '') return { value: own, fallback: false };
  return { value: text['en-US'], fallback: locale !== DEFAULT_LOCALE };
}

export interface GlossaryView {
  id: string;
  anchor: string;
  term: string;
  definition: string;
  analogy: string;
  // True when any of the entry's texts is shown in English because the locale has no translation.
  fallback: boolean;
}

export interface GlossaryGroup {
  courseId: string;
  title: string;
  entries: GlossaryView[];
}

// The glossary page's content: one group per course, in registry order. Courses without terms are left out.
export function glossaryGroups(
  courses: readonly { id: string; title: Partial<Record<Locale, string>> }[],
  glossaries: Readonly<Record<string, readonly GlossaryEntry[]>>,
  locale: Locale,
): GlossaryGroup[] {
  return courses.flatMap((course) => {
    const entries = (glossaries[course.id] ?? []).map((entry) => {
      const term = glossaryText(entry.term, locale);
      const definition = glossaryText(entry.definition, locale);
      const analogy = glossaryText(entry.analogy, locale);
      return {
        id: entry.id,
        anchor: glossaryAnchor(course.id, entry.id),
        term: term.value,
        definition: definition.value,
        analogy: analogy.value,
        fallback: term.fallback || definition.fallback || analogy.fallback,
      };
    });
    if (entries.length === 0) return [];
    return [{ courseId: course.id, title: course.title[locale] ?? course.id, entries }];
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasEnglish(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const text = value['en-US'];
  return typeof text === 'string' && text.trim() !== '' && !/[\r\n]/u.test(text);
}
