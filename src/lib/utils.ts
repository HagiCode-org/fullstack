import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Joins class names, drops falsy values and lets a later conflicting Tailwind class win.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
