// Checks the foundation facts of the built site. Run after `npm run build`; `npm run verify` does both.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE_ORIGIN = 'https://fullstack.hagicode.com';
const SITE_URL = `${SITE_ORIGIN}/`;
const HAGILIGHT_PACKAGES = ['@hagicode/hagilight', '@hagicode/hagilight-core'];
const FORBIDDEN_PUBLIC_FILES = ['robots.txt', 'sitemap.xml', 'llms.txt', 'favicon.ico', 'favicon.svg'];
const EXACT_VERSION = /^\d+\.\d+\.\d+$/u;

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};
const fileExists = (path) => existsSync(path) && statSync(path).isFile();
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

// Resolve an href to a URL on the site, or null when it is not a web address.
const siteUrl = (href) => {
  try {
    const url = new URL(href, SITE_URL);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
};

// Map a same-site URL to the build output file that serves it, or null when nothing does.
const distFileFor = (url) => {
  const path = decodeURIComponent(url.pathname);
  const candidates = path.endsWith('/')
    ? [`${path}index.html`]
    : [path, `${path}/index.html`, `${path}.html`];
  return candidates.map((candidate) => join(dist, candidate)).find(fileExists) ?? null;
};

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'u'))?.[1];
const decodeAttr = (value) => value.replaceAll('&amp;', '&');

// Pins: both Hagilight packages exact, identical, and the installed copies match the manifest.
const packageJson = readJson(join(root, 'package.json'));
const pinned = Object.fromEntries(HAGILIGHT_PACKAGES.map((name) => [name, packageJson.dependencies?.[name]]));
for (const name of HAGILIGHT_PACKAGES) {
  expect(EXACT_VERSION.test(pinned[name] ?? ''), `${name} must be pinned to an exact version, found "${pinned[name]}"`);
}
const hagilightVersion = pinned['@hagicode/hagilight'];
expect(
  hagilightVersion === pinned['@hagicode/hagilight-core'],
  `Hagilight pins differ: @hagicode/hagilight ${pinned['@hagicode/hagilight']}, @hagicode/hagilight-core ${pinned['@hagicode/hagilight-core']}`,
);
for (const name of HAGILIGHT_PACKAGES) {
  const installedManifest = join(root, 'node_modules', name, 'package.json');
  if (!fileExists(installedManifest)) {
    failures.push(`${name} is not installed; run npm install`);
    continue;
  }
  const installed = readJson(installedManifest).version;
  expect(installed === pinned[name], `${name} installed ${installed} does not match pinned ${pinned[name]}`);
}

const indexPage = join(dist, 'index.html');
if (!fileExists(indexPage)) {
  console.error('verify-foundation: failed');
  console.error('  - dist/index.html is missing; run npm run build first');
  process.exit(1);
}
const html = readFileSync(indexPage, 'utf8');
const metaTags = html.match(/<meta\b[^>]*>/giu) ?? [];
const linkTags = html.match(/<link\b[^>]*>/giu) ?? [];

// Home page head: one language, one canonical, one description, one title, Open Graph and Twitter.
expect(/<html\b[^>]*\slang="en-US"/u.test(html), 'dist/index.html root element must declare lang="en-US"');
expect((html.match(/<title>/giu) ?? []).length === 1, 'dist/index.html must contain exactly one <title>');
const canonicalLinks = linkTags.filter((tag) => attr(tag, 'rel') === 'canonical');
expect(canonicalLinks.length === 1, `dist/index.html must contain exactly one canonical link, found ${canonicalLinks.length}`);
expect(
  canonicalLinks.length !== 1 || attr(canonicalLinks[0], 'href') === SITE_URL,
  `canonical link must be ${SITE_URL}`,
);
const descriptionTags = metaTags.filter((tag) => attr(tag, 'name') === 'description');
expect(descriptionTags.length === 1, `dist/index.html must contain exactly one description meta, found ${descriptionTags.length}`);
for (const [key, value] of [
  ['property', 'og:title'],
  ['property', 'og:description'],
  ['name', 'twitter:title'],
  ['name', 'twitter:description'],
]) {
  const count = metaTags.filter((tag) => attr(tag, key) === value).length;
  expect(count === 1, `dist/index.html must contain exactly one <meta ${key}="${value}">, found ${count}`);
}
expect((html.match(/<h1\b/giu) ?? []).length === 1, 'dist/index.html must contain exactly one <h1>');

// Footer: exactly one, with attribution, build labels, and sitemap and RSS links that resolve.
const footers = html.match(/<footer\b[\s\S]*?<\/footer>/giu) ?? [];
expect(footers.length === 1, `dist/index.html must contain exactly one footer, found ${footers.length}`);
const footer = footers[0] ?? '';
const footerText = footer.replace(/<[^>]+>/gu, ' ').replace(/\s+/gu, ' ');
for (const label of [`Powered By hagilight@${hagilightVersion}`, 'Branch:', 'Commit:', 'Built:']) {
  expect(footerText.includes(label), `footer must show "${label}"`);
}
const footerHrefs = [...footer.matchAll(/<a\b[^>]*\shref="([^"]*)"/giu)].map((match) => decodeAttr(match[1]));
for (const [suffix, label] of [['sitemap-index.xml', 'sitemap'], ['rss.xml', 'RSS']]) {
  const link = footerHrefs.map(siteUrl).find((url) => url?.origin === SITE_ORIGIN && url.pathname.endsWith(suffix));
  expect(link !== undefined, `footer must link the ${label} (${suffix})`);
  expect(link === undefined || distFileFor(link) !== null, `footer ${label} link does not resolve to a file in dist/: ${link?.href}`);
}

// Favicon: one icon link that serves the shared Hagilight icon bytes.
const iconLinks = linkTags.filter((tag) => /\brel="[^"]*\bicon\b/u.test(tag));
expect(iconLinks.length === 1, `dist/index.html must link exactly one favicon, found ${iconLinks.length}`);
if (iconLinks.length === 1) {
  const iconUrl = siteUrl(decodeAttr(attr(iconLinks[0], 'href') ?? ''));
  const iconFile = iconUrl ? distFileFor(iconUrl) : null;
  expect(iconFile !== null, 'favicon link does not resolve to a file in dist/');
  const sharedIcon = join(root, 'node_modules', '@hagicode', 'hagilight-core', 'favicon.ico');
  expect(
    iconFile === null || readFileSync(iconFile).equals(readFileSync(sharedIcon)),
    'favicon file in dist/ is not the shared Hagilight favicon',
  );
}

// Every internal link target on the home page exists in the build output.
const linkTargets = [...html.matchAll(/<(?:a|link)\b[^>]*\shref="([^"]*)"/giu)].map((match) => decodeAttr(match[1]));
for (const href of linkTargets) {
  if (href.startsWith('#')) continue;
  const url = siteUrl(href);
  if (url === null || url.origin !== SITE_ORIGIN) continue;
  expect(distFileFor(url) !== null, `internal link target missing from dist/: ${href}`);
}

// Discovery files produced by Hagilight, and the public/ directory free of forbidden files.
const discoveryFiles = ['sitemap-index.xml', 'robots.txt', 'rss.xml', 'llms.txt', '.well-known/hagilight.metadata.json'];
for (const file of discoveryFiles) {
  expect(fileExists(join(dist, file)), `dist/${file} is missing`);
}
const robotsPath = join(dist, 'robots.txt');
if (fileExists(robotsPath)) {
  expect(
    readFileSync(robotsPath, 'utf8').includes(`Sitemap: ${SITE_ORIGIN}/sitemap-index.xml`),
    `dist/robots.txt must reference ${SITE_ORIGIN}/sitemap-index.xml`,
  );
}
const metadataPath = join(dist, '.well-known', 'hagilight.metadata.json');
if (fileExists(metadataPath)) {
  const metadata = readJson(metadataPath);
  const siteName = readFileSync(join(root, 'src', 'config', 'site.ts'), 'utf8').match(/SITE_NAME = '([^']*)'/u)?.[1];
  expect(metadata.site?.url === SITE_URL, `metadata site url must be ${SITE_URL}, found ${metadata.site?.url}`);
  expect(metadata.site?.name === siteName, `metadata site name must be "${siteName}", found "${metadata.site?.name}"`);
  expect(metadata.generator?.version === hagilightVersion, `metadata generator version must be ${hagilightVersion}`);
}
for (const file of FORBIDDEN_PUBLIC_FILES) {
  expect(!existsSync(join(root, 'public', file)), `public/${file} must not exist; Hagilight generates or ships it`);
}

if (failures.length > 0) {
  console.error('verify-foundation: failed');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`verify-foundation: ok (hagilight@${hagilightVersion}, ${SITE_URL})`);
