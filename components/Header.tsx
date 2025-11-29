
import React, { useState } from 'react';
import { SortOption } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  onSortChange: (option: SortOption) => void;
  onAddClick: () => void;
  currentSort: SortOption;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onSortChange, onAddClick, currentSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <header className="pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl w-full max-w-5xl h-16 flex items-center justify-between px-4 sm:px-6 transition-all duration-300">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3 select-none">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
            </div>
            <div className="hidden sm:flex flex-col justify-center">
                <span className="text-white font-display font-bold text-lg leading-none tracking-tight">
                    JUKEBOX
                </span>
            </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
                
                {/* Search */}
                <div className="relative group hidden sm:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    </div>
                    <input
                    type="text"
                    placeholder="Search..."
                    className="block w-32 md:w-48 pl-10 pr-3 py-2 bg-white/5 border border-transparent hover:border-white/10 focus:border-white/30 rounded-lg text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:bg-white/10 transition-all font-sans"
                    value={searchTerm}
                    onChange={handleSearch}
                    />
                </div>

                {/* Sort Dropdown (New) */}
                <div className="relative group">
                    <select
                        value={currentSort}
                        onChange={handleSortChange}
                        className="appearance-none bg-white/5 border border-transparent hover:border-white/10 focus:border-white/30 text-white py-2 pl-3 pr-8 rounded-lg text-sm font-sans cursor-pointer focus:outline-none"
                    >
                        <option value={SortOption.DateAdded} className="bg-[#111]">Recent</option>
                        <option value={SortOption.Title} className="bg-[#111]">Title</option>
                        <option value={SortOption.Artist} className="bg-[#111]">Artist</option>
                        <option value={SortOption.Year} className="bg-[#111]">Year</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                         <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                </div>

                {/* Add Button */}
                <button 
                    onClick={onAddClick}
                    className="group relative flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-lg bg-blue-600 text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-cyan-500 opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline font-bold text-sm tracking-wide">Add</span>
                    </div>
                </button>
            </div>
        </header>
    </div>
  );
};
