export type Category =
  | 'drums'
  | 'sequencer'
  | 'synth'
  | 'modular'
  | 'live-coding'
  | 'daw'
  | 'playful';

/**
 * audiframe support, self-declared by the app's maker.
 * - 'supported': the live app implements audiframe.
 * - 'in-development': an integration exists but is not yet deployed.
 * Omit the field when the app does not support audiframe.
 */
export type AudiframeStatus = 'supported' | 'in-development';

export type SponsorTier = 'supporter' | 'sponsor' | 'featured-sponsor';

export interface SponsorInfo {
  active: boolean;
  tier: SponsorTier;
  since?: string;
  note?: string;
}

export interface Site {
  id: string;
  name: string;
  url: string;
  category: Category;
  tags: string[];
  description: string;
  audiframe?: AudiframeStatus;
  sponsor?: SponsorInfo;
}

export type ViewMode = 'grid' | 'list';
export type SortMode = 'shuffle' | 'alphabetical';
export type SiteStatus = 'checking' | 'up' | 'down';
