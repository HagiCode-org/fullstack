// Fills {name} placeholders from values. A placeholder without a value is left as written, so a missing value shows on the page.
export function formatText(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/gu, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match,
  );
}
