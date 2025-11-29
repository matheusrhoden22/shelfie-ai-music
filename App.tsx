
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Shelf } from './components/Shelf';
import { AddBookModal } from './components/AddBookModal';
import { Song, SortOption } from './types';
import { INITIAL_SONGS } from './constants';

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

  // Filter and Sort
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
        // Newest (highest timestamp) first
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

  const shelfChunks = useMemo(() => {
      const chunks = [];
      const shelfSize = 5;
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
    <div className="min-h-screen pb-32 bg-[#050505] text-white relative selection:bg-blue-500 selection:text-white">
      {/* Ambient Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <Header 
        onSearch={setSearchQuery} 
        onSortChange={setSortOption} 
        currentSort={sortOption}
        onAddClick={() => setIsModalOpen(true)}
      />

      <main className="pt-32 px-6 w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 mx-auto max-w-7xl">
           <div className="text-center md:text-left">
               <h1 className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-3 tracking-tight">
                 Rotation
               </h1>
               <div className="flex items-center justify-center md:justify-start gap-3">
                 <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                 <p className="text-gray-400 text-sm font-mono tracking-widest uppercase">
                   {songs.length} Tracks Loaded
                 </p>
               </div>
           </div>

           {/* Modern Category Filter */}
           <div className="flex flex-col items-end gap-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Filter Frequency</label>
                <div className="relative group min-w-[200px]">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full appearance-none bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 text-white py-3 pl-5 pr-12 rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-display font-medium text-sm shadow-xl"
                    >
                        {genres.map(g => <option key={g} value={g} className="bg-[#111] text-gray-300">{g}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 group-hover:text-white transition-colors">
                        <svg className="h-4 w-4 fill-current transform group-hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                        </svg>
                    </div>
                </div>
           </div>
        </div>

        {displaySongs.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-32 opacity-30">
              <span className="text-8xl mb-6 blur-[1px]">💿</span>
              <p className="text-2xl font-display text-gray-400 tracking-wide">Signal Lost</p>
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
          <div className="space-y-12">
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
