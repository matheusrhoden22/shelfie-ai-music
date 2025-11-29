
import React, { useState } from 'react';
import { Song } from '../types';

interface SongItemProps {
  book: Song;
}

// --- Audio Logic ---
let sharedAudioCtx: AudioContext | null = null;

const playVinylSound = () => {
  try {
    if (!sharedAudioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass();
      }
    }
    
    const ctx = sharedAudioCtx;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
    }

    // Modern "Swish" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);

  } catch (e) {
    // Ignore audio errors
  }
};

const getRankBadgeStyles = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-black border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.6)]";
    if (rank === 2) return "bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 text-black border-gray-100 shadow-[0_0_15px_rgba(209,213,219,0.5)]";
    if (rank === 3) return "bg-gradient-to-b from-orange-300 via-orange-400 to-orange-600 text-black border-orange-200 shadow-[0_0_15px_rgba(251,146,60,0.5)]";
    return "bg-[#111]/90 backdrop-blur-md text-white border-white/20";
};

export const BookItem: React.FC<SongItemProps> = ({ book: song }) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Album dimensions
  const albumClass = "w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48";

  return (
    <div 
        className={`relative group ${albumClass} z-10 transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)`}
        style={{ zIndex: isHovered ? 100 : 10, transform: isHovered ? 'scale(1.3) translateY(-30px)' : 'scale(1)' }}
    >
        <div 
            onMouseEnter={() => {
                setIsHovered(true);
                playVinylSound();
            }}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-full block perspective-1000 cursor-pointer"
        >
            <div className="w-full h-full relative transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                
                {/* --- RIGHT INNER (Vinyl Record) --- */}
                <div 
                    className="absolute inset-1 bg-[#111] rounded-full shadow-2xl z-0 flex items-center justify-center border border-gray-800 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                        transform: isHovered ? 'translateX(50%) rotate(180deg)' : 'translateX(0) rotate(0deg)'
                    }}
                >
                    {/* Vinyl Texture */}
                    <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(#111_0,#111_2px,#222_3px)] opacity-50"></div>
                    {/* Spectral Highlight */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30 transform rotate-45"></div>

                    {/* Label */}
                    <div className="relative w-16 h-16 rounded-full shadow-lg border-[3px] border-[#111]" style={{ backgroundColor: song.coverColor }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[6px] text-black/50 font-black uppercase text-center leading-none px-1 line-clamp-2">
                                {song.artist}
                            </span>
                        </div>
                    </div>
                    {/* Center Hole */}
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-black border border-gray-800"></div>

                    {/* Play Button Overlay (Visible on Hover) */}
                    {isHovered && (
                        <a 
                            href={song.externalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute z-50 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(29,185,84,0.6)] hover:scale-110 transition-transform animate-float"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="w-6 h-6 text-black fill-current ml-1" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </a>
                    )}
                </div>

                {/* --- GATEFOLD COVER (Container) --- */}
                <div 
                    className="absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 transform-style-3d"
                    style={{ 
                        transform: isHovered ? 'rotateY(-110deg)' : 'rotateY(0deg)',
                    }}
                >
                    {/* --- FRONT COVER (Outer Face) --- */}
                    <div 
                        className="absolute inset-0 rounded shadow-2xl overflow-hidden backface-hidden bg-[#111]"
                        style={{ backgroundColor: song.coverColor }}
                    >
                         {/* Rank Badge */}
                         {song.rank && (
                            <div className={`absolute top-2 left-2 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center z-50 shadow-lg border ${getRankBadgeStyles(song.rank)}`}>
                                <span className="font-display font-bold text-xs md:text-sm leading-none pt-[1px]">{song.rank}</span>
                            </div>
                         )}

                         {song.coverUrl && !imgError ? (
                            <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" onError={() => setImgError(true)} />
                         ) : (
                            <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-white/10 to-black/60 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/20 mix-blend-overlay blur-xl"></div>
                                <div className="relative z-10 mt-6">
                                    <h3 className="text-white font-display font-bold text-lg uppercase tracking-tight leading-none drop-shadow-md break-words">{song.title}</h3>
                                </div>
                                <div className="relative z-10 border-t-2 border-white/50 pt-2 w-12">
                                    <p className="text-white/90 text-xs font-mono uppercase tracking-widest truncate">{song.artist}</p>
                                </div>
                            </div>
                         )}
                         
                         {/* Glossy Sheen Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none z-30"></div>
                         
                         {/* Spine Highlight when closed */}
                         <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/30 z-40"></div>
                    </div>

                    {/* --- INNER SLEEVE (Inside Face) --- */}
                    <div 
                        className="absolute inset-0 bg-[#151515] rounded backface-hidden p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden border border-gray-800"
                        style={{ 
                            transform: 'rotateY(180deg)',
                        }}
                    >
                         {/* Inner Paper Texture */}
                         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

                         <div className="relative z-10 h-full flex flex-col text-left">
                            <div className="mb-2">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-[10px] font-bold text-[#444] font-mono uppercase tracking-widest mb-1">TRACK INFO</h4>
                                    {song.rank && <span className="text-[10px] text-yellow-500 font-mono">#{song.rank}</span>}
                                </div>
                                <h2 className="text-md text-white font-display font-bold leading-tight">{song.title}</h2>
                                <p className="text-xs text-gray-400 font-sans">{song.artist}</p>
                            </div>

                            <div className="my-2 h-[1px] bg-gradient-to-r from-gray-700 to-transparent"></div>
                            
                            <div className="space-y-2">
                                <div>
                                    <h4 className="text-[8px] font-bold text-blue-500 font-mono uppercase tracking-widest mb-0.5">VIBE</h4>
                                    <p className="text-[9px] leading-[1.4] text-gray-300 font-sans">
                                        {song.vibe || "Loading vibes..."}
                                    </p>
                                </div>
                                
                                {song.funFact && (
                                    <div>
                                        <h4 className="text-[8px] font-bold text-purple-500 font-mono uppercase tracking-widest mb-0.5">NOTE</h4>
                                        <p className="text-[8px] leading-[1.3] text-gray-500 italic font-serif">
                                            "{song.funFact}"
                                        </p>
                                    </div>
                                )}
                            </div>
                         </div>
                    </div>
                </div>

            </div>
        </div>
        
        {/* Shadow on Shelf */}
        <div 
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/60 blur-lg rounded-full transition-all duration-300"
            style={{
                opacity: isHovered ? 0.4 : 0.8,
                transform: isHovered ? 'scale(0.8) translateY(10px)' : 'scale(1)'
            }}
        ></div>
    </div>
  );
};
