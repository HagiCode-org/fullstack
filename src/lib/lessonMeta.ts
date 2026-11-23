// Reading time of lessons and courses. Only a whole number counts as a time; anything else is treated as missing, so
// the page shows nothing for it rather than "undefined" or NaN.

export function validMinutes(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : undefined;
}

// The total of a course's lesson times. Undefined when there are no lessons or any lesson has no time: a partial sum
// would present an incomplete course as if it were complete.
export function totalMinutes(values: readonly (number | undefined)[]): number | undefined {
  if (values.length === 0) return undefined;
  if (values.some((value) => value === undefined)) return undefined;
  return values.reduce<number>((sum, value) => sum + (value as number), 0);
}

// Text that is present, after trimming. Used for outcomes and other one-sentence metadata.
export function presentText(value: string | undefined): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined;
}
