export type ReelItem = {
  brand: string;
  did: string;
  video: string;
  poster?: string;
};

// Silent desktop scroll recordings (1440px wide, 15-30s, under 3MB each) go in
// /public/reel. Add an entry here per recording and the Work section appears.
export const REEL: ReelItem[] = [];
