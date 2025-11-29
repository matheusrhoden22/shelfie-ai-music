
import { Song } from './types';

const NOW = Date.now();
const ONE_DAY = 86400000;

export const INITIAL_SONGS: Song[] = [
  // --- DEEP WORK COLLECTION (Newest / Requested) ---
  {
    id: 'dw-1',
    title: 'Weightless',
    artist: 'Marconi Union',
    album: 'Weightless (Ambient Transmissions Vol. 2)',
    year: 2011,
    genre: 'Deep Work',
    coverColor: '#06b6d4',
    vibe: "Scientifically designed to reduce anxiety and improve focus.",
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734121faee8df7069b275f657f',
    externalUrl: 'https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6',
    funFact: "Neuroscientists found this song reduced anxiety by up to 65%.",
    addedAt: NOW,
    rank: 1
  },
  {
    id: 'dw-2',
    title: '1/1',
    artist: 'Brian Eno',
    album: 'Ambient 1: Music for Airports',
    year: 1978,
    genre: 'Deep Work',
    coverColor: '#e5e5e5',
    vibe: "Minimalist piano loops designed to defuse tension.",
    externalUrl: 'https://open.spotify.com/track/5MxzL9bA203jZ809fN2c0X', 
    funFact: "Conceived while Eno was stuck at Cologne Bonn Airport.",
    addedAt: NOW - 100,
    rank: 2
  },
  {
    id: 'dw-3',
    title: 'Hand Covers Bruise',
    artist: 'Trent Reznor & Atticus Ross',
    album: 'The Social Network OST',
    year: 2010,
    genre: 'Deep Work',
    coverColor: '#1f2937',
    vibe: "Dark, brooding ambient texture for serious concentration.",
    externalUrl: 'https://open.spotify.com/track/4d2Wefk2WqZ7lq6J7Z4j5w',
    funFact: "Created to sound like a flawed, decaying memory.",
    addedAt: NOW - 200,
    rank: 3
  },
  {
    id: 'dw-4',
    title: 'Sonata for Two Pianos in D, K. 448',
    artist: 'Wolfgang Amadeus Mozart',
    album: 'Mozart Masterpieces',
    year: 1781,
    genre: 'Deep Work',
    coverColor: '#fbbf24',
    vibe: "High frequency notes that stimulate spatial-temporal reasoning.",
    externalUrl: 'https://open.spotify.com/search/Mozart%20Sonata%20K448',
    funFact: "Famous for the 'Mozart Effect' study regarding IQ scores.",
    addedAt: NOW - 300,
    rank: 4
  },
  {
    id: 'dw-5',
    title: 'Secunda',
    artist: 'Jeremy Soule',
    album: 'The Elder Scrolls V: Skyrim OST',
    year: 2011,
    genre: 'Deep Work',
    coverColor: '#0f172a', // Night sky color
    vibe: "Ethereal, wandering melody for peaceful contemplation.",
    externalUrl: 'https://open.spotify.com/track/5f3G5sZ1q0c1y2f3a4b5c6',
    funFact: "Soule composed much of the soundtrack while hiking.",
    addedAt: NOW - 400,
    rank: 5
  },
  {
    id: 'dw-6',
    title: 'Spring 1',
    artist: 'Max Richter',
    album: 'Recomposed by Max Richter: Vivaldi',
    year: 2012,
    genre: 'Deep Work',
    coverColor: '#3b82f6',
    vibe: "A modern, looping reimagining of Vivaldi that builds momentum.",
    externalUrl: 'https://open.spotify.com/track/5xbuJuQsTVhe9hlkRiDqbX',
    funFact: "Richter discarded 75% of Vivaldi's original notes.",
    addedAt: NOW - 500,
    rank: 6
  },
  {
    id: 'dw-7',
    title: 'Cornfield Chase',
    artist: 'Hans Zimmer',
    album: 'Interstellar OST',
    year: 2014,
    genre: 'Deep Work',
    coverColor: '#ca8a04',
    vibe: "Epic, organ-driven inspiration for complex problem solving.",
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b27339d2495d4d38c644d715915d',
    externalUrl: 'https://open.spotify.com/track/1SLrXDRxspN7e8U8f6Ff1y',
    funFact: "Zimmer wrote the main theme without knowing the movie was about space.",
    addedAt: NOW - 600,
    rank: 7
  },
  {
    id: 'dw-8',
    title: 'A Walk',
    artist: 'Tycho',
    album: 'Dive',
    year: 2011,
    genre: 'Deep Work',
    coverColor: '#f97316', // Sunset orange
    vibe: "Warm, sun-drenched electronica for creative flow states.",
    externalUrl: 'https://open.spotify.com/track/6c2xF1d7w4h6b5a8c9d0e',
    funFact: "Tycho (Scott Hansen) is also a graphic designer known as ISO50.",
    addedAt: NOW - 700,
    rank: 8
  },
  {
    id: 'dw-9',
    title: 'Milky Way',
    artist: 'Ben Prunty',
    album: 'FTL: Faster Than Light OST',
    year: 2012,
    genre: 'Deep Work',
    coverColor: '#7c3aed',
    vibe: "Spacey chiptune ambiance for coding and engineering.",
    externalUrl: 'https://open.spotify.com/track/4d2Wefk2WqZ7lq6J7Z4j5w',
    funFact: "Created on an iPad using basic synthesizer apps.",
    addedAt: NOW - 800,
    rank: 9
  },
  {
    id: 'dw-10',
    title: 'The Goldberg Variations',
    artist: 'J.S. Bach (Glenn Gould)',
    album: '1981 Recording',
    year: 1981,
    genre: 'Deep Work',
    coverColor: '#000000',
    vibe: "Mathematical precision and clarity for structured thinking.",
    externalUrl: 'https://open.spotify.com/search/Goldberg%20Variations%20Glenn%20Gould%201981',
    funFact: "Gould hums audibly throughout the recording.",
    addedAt: NOW - 900,
    rank: 10
  },

  // --- OTHERS (Older additions) ---
  {
    id: '2',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    album: 'Suite bergamasque',
    year: 1905,
    genre: 'Classical',
    coverColor: '#1e3a8a',
    vibe: "Melancholic yet soothing piano for late night study sessions.",
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Debussy_Suite_bergamasque.jpg/640px-Debussy_Suite_bergamasque.jpg',
    externalUrl: 'https://open.spotify.com/search/Clair%20de%20Lune%20Debussy',
    funFact: "The title means 'Moonlight' in French, inspired by a Paul Verlaine poem.",
    addedAt: NOW - (ONE_DAY * 10) // 10 days ago
  },
  {
    id: '6',
    title: 'After Dark',
    artist: 'Mr.Kitty',
    album: 'Time',
    year: 2014,
    genre: 'Synthwave',
    coverColor: '#701a75',
    vibe: "Nostalgic synth beats for coding or night driving.",
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2732c525f050519f4a13838411d',
    externalUrl: 'https://open.spotify.com/track/2LKOHdMsL0K9KwcPRlJK2v',
    funFact: "Gained massive popularity years after release due to TikTok editors.",
    addedAt: NOW - (ONE_DAY * 15) // 15 days ago
  }
];

export const SHELF_TEXTURE_GRADIENT = "linear-gradient(180deg, #222 0%, #111 100%)";
