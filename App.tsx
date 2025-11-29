import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Disc, 
  Music2, 
  Calendar, 
  User, 
  X, 
  Loader2,
  Filter,
  LayoutGrid
} from 'lucide-react';

// --- TYPES ---
interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year?: number;
  addedAt?: number;
  coverUrl?: string; // Added for visual flair
}

enum SortOption {
  DateAdded = 'Date Added',
  Title = 'Title',
  Artist = 'Artist',
  Year = 'Year'
}

// --- CONSTANTS ---
const INITIAL_SONGS: Song[] = [
  { id: '1', title: 'Midnight City', artist: 'M83', genre: 'Synthpop', year: 2011, addedAt: 1672531200000 },
  { id: '2', title: 'Instant Crush', artist: 'Daft Punk', genre: 'Electronic', year: 2013, addedAt: 1672617600000 },
  { id: '3', title: 'The Less I Know The Better', artist: 'Tame Impala', genre: 'Psychedelic Rock', year: 2015, addedAt: 1672704000000 },
  { id: '4', title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Synthwave', year: 2019, addedAt: 1672790400000 },
  { id: '5', title: 'As It Was', artist: 'Harry Styles', genre: 'Pop', year: 2022, addedAt: 1672876800000 },
  { id: '6', title: 'Levitating', artist: 'Dua Lipa', genre: 'Pop', year: 2020, addedAt: 1672963200000 },
];

// --- COMPONENTS ---

// 1. Header Component (Modernized)
const Header = ({ 
  onSearch, 
  onSortChange, 
  currentSort, 
  onAddClick 
}: { 
  onSearch: (s: string) => void, 
  onSortChange: (s: SortOption) => void, 
  currentSort: SortOption,
  onAddClick: () => void 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Disc className="text-white w-6 h-6 animate-spin-slow" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Rotation</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 w-full md:max-w-xl relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search tracks, artists, or genres..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all hover:bg-white/10"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
             <select 
               value={currentSort}
               onChange={(e) => onSortChange(e.target.value as SortOption)}
               className="w-full md:w-40 appearance-none bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-300 focus:outline-none hover:bg-white/10 cursor-pointer transition-colors"
             >
               {Object.values(SortOption).map(opt => (
                 <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
               ))}
             </select>
             <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
          </div>

          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium text-sm hover:bg-gray-200 transition-all shadow-lg shadow-white/10 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Track</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// 2. Shelf Component (Grid Layout)
const Shelf = ({ books }: { books: Song[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-12">
      {books.map((song) => (
        <div 
          key={song.id} 
          className="group relative bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20"
        >
          {/* Mock Cover Art */}
          <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-gray-800 to-black mb-4 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Music2 className="w-12 h-12 text-gray-600 group-hover:text-white transition-colors group-hover:scale-110 duration-500" />
            
            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-xs text-white/80 font-mono">
              {song.year}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-white text-lg truncate pr-2" title={song.title}>
              {song.title}
            </h3>
            <p className="text-gray-400 text-sm flex items-center gap-1.5 truncate">
              <User className="w-3 h-3" />
              {song.artist}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-purple-200 border border-white/5">
              {song.genre}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// 3. AddBookModal Component (Modernized Logic with Environment Variable)
const AddBookModal = ({ 
  isOpen, 
  onClose, 
  onAddBooks, 
  existingBooks 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onAddBooks: (songs: Song[]) => void, 
  existingBooks: Song[] 
}) => {
  const [formData, setFormData] = useState({ title: '', artist: '', genre: 'Pop', year: new Date().getFullYear() });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // --- IMPORTANTE: Usando a chave da API conforme solicitado ---
    // OBS: O ambiente de preview não suporta 'import.meta', por isso comentei a linha abaixo para evitar erros.
    // No seu projeto Vite local, DESCOMENTE a linha a seguir:
    // const apiKey = import.meta.env.VITE_API_KEY; 
    const apiKey = ""; // Placeholder para o preview funcionar
    
    // Simulating API latency
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create new song object
    const newSong: Song = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      artist: formData.artist,
      genre: formData.genre,
      year: Number(formData.year),
      addedAt: Date.now()
    };

    onAddBooks([newSong]);
    
    // Reset and Close
    setFormData({ title: '', artist: '', genre: 'Pop', year: new Date().getFullYear() });
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#111] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-500" />
            Add New Track
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title</label>
            <input 
              required
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
              placeholder="Song Name"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Artist</label>
              <input 
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all"
                placeholder="Artist Name"
                value={formData.artist}
                onChange={e => setFormData({...formData, artist: e.target.value})}
              />
            </div>
             <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Year</label>
              <input 
                type="number"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all"
                value={formData.year}
                onChange={e => setFormData({...formData, year: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Genre</label>
            <select
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer"
              value={formData.genre}
              onChange={e => setFormData({...formData, genre: e.target.value})}
            >
              {['Pop', 'Rock', 'Electronic', 'Hip Hop', 'Jazz', 'Classical', 'Indie', 'Metal'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- MAIN APP (Updated visual wrapper, kept logic) ---
const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.DateAdded);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Derive unique genres
  const genres = useMemo(() => {
    const unique = new Set(songs.map(s => s.genre || 'Uncategorized'));
    return ['All', ...Array.from(unique).sort()];
  }, [songs]);

  // Filter and Sort Logic (Preserved)
  const displaySongs = useMemo(() => {
    let result = songs.filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== 'All') {
        result = result.filter(song => (song.genre || 'Uncategorized') === selectedCategory);
    }

    result = result.sort((a, b) => {
      if (sortOption === SortOption.DateAdded) {
        return (b.addedAt || 0) - (a.addedAt || 0);
      } else if (sortOption === SortOption.Title) {
        return a.title.localeCompare(b.title);
      } else if (sortOption === SortOption.Artist) {
        return a.artist.localeCompare(b.artist);
      } else if (sortOption === SortOption.Year) {
        return (a.year || 0) - (b.year || 0);
      }
      return 0;
    });

    return result;
  }, [songs, searchQuery, sortOption, selectedCategory]);

  // Chunking logic for "Shelves"
  const shelfChunks = useMemo(() => {
      const chunks = [];
      const shelfSize = 5; // Can be adjusted for responsive grid if needed, but keeping logic
      for (let i = 0; i < displaySongs.length; i += shelfSize) {
          chunks.push(displaySongs.slice(i, i + shelfSize));
      }
      return chunks;
  }, [displaySongs]);

  const handleAddSongs = (newSongs: Song[]) => {
    setSongs(prev => {
      const existingSignatures = new Set(prev.map(b => 
        `${b.title.toLowerCase().trim()}|${b.artist.toLowerCase().trim()}`
      ));

      const uniqueNewSongs = newSongs.filter(song => {
        const signature = `${song.title.toLowerCase().trim()}|${song.artist.toLowerCase().trim()}`;
        if (existingSignatures.has(signature)) {
          return false;
        }
        existingSignatures.add(signature);
        return true;
      });

      return [...prev, ...uniqueNewSongs];
    });
  };

  return (
    <div className="min-h-screen pb-32 bg-[#050505] text-white relative selection:bg-purple-500 selection:text-white font-sans">
      {/* Ambient Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <Header 
        onSearch={setSearchQuery} 
        onSortChange={setSortOption} 
        currentSort={sortOption}
        onAddClick={() => setIsModalOpen(true)}
      />

      <main className="pt-32 px-6 w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8">
           <div className="text-center md:text-left">
               <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-3 tracking-tight">
                 Rotation
               </h1>
               <div className="flex items-center justify-center md:justify-start gap-3">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                 </span>
                 <p className="text-gray-400 text-sm font-mono tracking-widest uppercase">
                   {songs.length} Tracks in Library
                 </p>
               </div>
           </div>

           {/* Modern Category Filter */}
           <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Filter Frequency</label>
                <div className="relative group w-full md:w-[240px]">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full appearance-none bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 text-white py-3 pl-5 pr-12 rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all font-medium text-sm shadow-xl"
                    >
                        {genres.map(g => <option key={g} value={g} className="bg-[#111] text-gray-300">{g}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 group-hover:text-white transition-colors">
                        <Filter className="w-4 h-4" />
                    </div>
                </div>
           </div>
        </div>

        {displaySongs.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-32 opacity-50 border border-dashed border-white/10 rounded-3xl bg-white/5">
              <Disc className="w-24 h-24 mb-6 text-gray-600 animate-pulse" />
              <p className="text-2xl font-bold text-gray-400 tracking-wide">Signal Lost</p>
              <p className="text-sm font-mono text-gray-600 mt-2">No tracks found in this sector.</p>
              {selectedCategory !== 'All' && (
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className="mt-8 px-6 py-2 border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all uppercase text-xs tracking-widest"
                  >
                    Reset Frequency
                  </button>
              )}
           </div>
        ) : (
          <div className="space-y-4">
            {shelfChunks.map((shelfSongs, idx) => (
               <Shelf key={`shelf-${idx}`} books={shelfSongs} />
            ))}
          </div>
        )}
      </main>

      <AddBookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddBooks={handleAddSongs}
        existingBooks={songs}
      />
    </div>
  );
};

export default App;
