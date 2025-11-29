
import React from 'react';
import { Song } from '../types';
import { BookItem } from './BookItem';

interface ShelfProps {
  books: Song[];
}

export const Shelf: React.FC<ShelfProps> = ({ books }) => {
  return (
    <div className="w-full flex flex-col items-center mb-16 group/shelf relative">
      
      {/* Dynamic Backglow based on shelf contents */}
      <div className="absolute top-1/2 left-1/4 right-1/4 h-32 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-[80px] rounded-full opacity-0 group-hover/shelf:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

      {/* Items Container */}
      <div className="flex flex-wrap justify-center items-end gap-6 sm:gap-12 px-4 sm:px-10 max-w-7xl mx-auto min-h-[260px] pb-4 relative z-20 perspective-2000">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
        
        {books.length === 0 && (
           <div className="h-56 w-full flex flex-col items-center justify-center text-gray-800 animate-pulse">
              <span className="text-4xl mb-2 opacity-10 blur-sm">EMPTY</span>
           </div>
        )}
      </div>

      {/* Modern Glass Shelf */}
      <div className="w-full relative h-10 max-w-[95%] mx-auto mt-[-10px] perspective-1000">
        
        {/* Glass Surface */}
        <div 
            className="absolute top-0 left-0 right-0 h-4 rounded-[2px] z-10"
            style={{ 
                background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(5px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px -10px rgba(0,0,0,0.8)'
            }}
        ></div>
        
        {/* Front Edge (Glowing) */}
        <div 
            className="absolute top-4 left-[2px] right-[2px] h-[3px] rounded-b-[1px] z-20 opacity-70"
            style={{
                background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)',
                boxShadow: '0 0 15px #3b82f6'
            }}
        ></div>
        
        {/* Reflection below */}
        <div 
            className="absolute top-6 left-10 right-10 h-10 bg-gradient-to-b from-white/5 to-transparent blur-md rounded-full opacity-30 transform scale-y-50"
        ></div>
      </div>
    </div>
  );
};
