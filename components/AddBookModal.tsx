
import React, { useState } from 'react';
import { suggestSongs } from '../services/geminiService';
import { Song } from '../types';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooks: (songs: Song[]) => void;
  existingBooks: Song[];
}

export const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAddBooks, existingBooks }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const existingList = existingBooks.map(s => `"${s.title}" by ${s.artist}`);
      const songs = await suggestSongs(query, existingList);
      
      if (songs.length > 0) {
        onAddBooks(songs);
        onClose();
        setQuery('');
      } else {
        setError('No new songs found. Try a different genre or artist.');
      }
    } catch (err) {
        setError('Failed to fetch music data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop with Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>

      {/* Modern Glass Modal */}
      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl shadow-blue-900/20 transform transition-all duration-300 scale-100 overflow-hidden group">
        
        {/* Decor Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Expand Library</h2>
        <p className="text-gray-400 text-sm mb-8 font-light">
          Describe the vibe, genre, or artist you want to add.
        </p>

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="relative mb-6">
             <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 10 psychedelic rock songs from the 70s..."
              className="w-full bg-[#151515] border border-gray-800 text-white rounded-xl p-4 pl-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-sans text-lg placeholder-gray-600 shadow-inner"
              autoFocus
            />
            {loading && (
                <div className="absolute right-4 top-4">
                     <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
          </div>

          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">{error}</div>}

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="px-8 py-3 rounded-xl text-sm bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
            >
              {loading ? 'Digging Crates...' : 'Add to Collection'}
            </button>
          </div>
        </form>
        
        <div className="mt-8 flex justify-center">
             <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Powered by Google Gemini 2.5</span>
        </div>
      </div>
    </div>
  );
};
