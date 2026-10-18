// View models the course components receive. Pages build them from the course data; components never import it.
export interface NavLink {
  href: string;
  caption: string;
  title: string;
}

export interface SwitcherItem {
  id: string;
  label: string;
  href: string;
  current: boolean;
}

export interface Crumb {
  label: string;
  href?: string;
}

export type TreeNode =
  | { kind: 'lesson'; id: string; title: string; href: string }
  | { kind: 'group'; id: string; title: string; children: TreeNode[] };

// The lessons of one top-level group for the home page preview, or the top-level lessons outside any group (no title).
export interface PreviewSection {
  title?: string;
  lessons: { id: string; title: string; href: string }[];
}
