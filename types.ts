
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverColor: string;
  coverUrl?: string; // Album art
  year?: number;
  genre: string; // Replaces category
  vibe?: string; // Short description/mood
  externalUrl?: string; // Spotify or YouTube link
  funFact?: string; // Interesting fact about the song
  addedAt: number; // Timestamp when added to library
  rank?: number; // Ranking position (1, 2, 3...)
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Song[];
}

export enum SortOption {
  DateAdded = 'DATE_ADDED',
  Title = 'TITLE',
  Artist = 'ARTIST',
  Year = 'YEAR'
}
