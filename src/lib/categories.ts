import type { Category } from './types';

export interface CategoryInfo {
  id: Category;
  label: string;
  /** Short glyph shown on the category key. */
  glyph: string;
}

export const categories: CategoryInfo[] = [
  { id: 'drums', label: 'Drums', glyph: 'dr' },
  { id: 'sequencer', label: 'Sequencers', glyph: 'sq' },
  { id: 'synth', label: 'Synths', glyph: 'sy' },
  { id: 'modular', label: 'Modular', glyph: 'md' },
  { id: 'live-coding', label: 'Live coding', glyph: 'lc' },
  { id: 'daw', label: 'Studios', glyph: 'st' },
  { id: 'playful', label: 'Toys', glyph: 'ty' },
];

export const categoryById = Object.fromEntries(
  categories.map((category) => [category.id, category]),
) as Record<Category, CategoryInfo>;
