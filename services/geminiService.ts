
import { GoogleGenAI, Type } from "@google/genai";
import { Song } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const suggestSongs = async (query: string, existingSongs: string[] = []): Promise<Song[]> => {
  try {
    const ai = getAiClient();
    
    const prompt = `
      You are an expert Music Curator and DJ.
      
      User Query: "${query}"

      CONTEXT - EXISTING LIBRARY:
      The user ALREADY HAS these songs (DO NOT suggest these):
      ${JSON.stringify(existingSongs)}

      INSTRUCTIONS:
      1. DUPLICATE CHECK:
         - Compare your suggestions against the "EXISTING LIBRARY" list.
         - If a song is already there, find a DIFFERENT song.

      2. CRITICAL - QUANTITY CHECK: 
         - Analyze the User Query for a specific number (e.g. "top 10", "5 songs", "list of 20").
         - If a number is specified, YOU MUST RETURN EXACTLY THAT NUMBER OF SONGS.
         - Do not return 8 if they asked for 10. Do not return 9. Return 10.
         - If no number is specified, return exactly 7 songs.

      3. RANKING (IMPORTANT):
         - If the user implies a ranked list (words like "top", "best", "greatest", "ranked", "popular"), assign a 'rank' number to each song starting from 1.
         - 1 is the best/highest match.
      
      4. DATA PER SONG:
         - Title, Artist, Album, Year, Genre.
         - VIBE: A short, 1-sentence description of why this song fits the mood/task (max 12 words).
         - FUN_FACT: One interesting trivia fact about the song or artist.
         - COVER_COLOR: A hex code matching the album art vibe.
         - SEARCH_QUERY: A string to search for this song on Spotify/YouTube (e.g. "Song Name Artist Name").
      
      5. OUTPUT FORMAT:
         - Return ONLY a raw JSON array. 
         - Do not wrap in markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              album: { type: Type.STRING },
              year: { type: Type.INTEGER },
              genre: { type: Type.STRING },
              rank: { type: Type.INTEGER, description: "The rank position if this is a top list (1, 2, 3...)" },
              vibe: { type: Type.STRING },
              funFact: { type: Type.STRING },
              coverColor: { type: Type.STRING },
              searchQuery: { type: Type.STRING, description: "String to use for generating a link" }
            },
            required: ["title", "artist", "album", "genre", "coverColor", "vibe", "searchQuery"]
          }
        }
      }
    });

    let rawText = response.text;
    if (!rawText) return [];

    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(rawText) as any[];
    
    return data.map((item, index) => ({
      id: `gemini-song-${Date.now()}-${index}`,
      title: item.title,
      artist: item.artist,
      album: item.album,
      year: item.year,
      genre: item.genre,
      coverColor: item.coverColor,
      vibe: item.vibe,
      funFact: item.funFact || "A great addition to your collection.",
      rank: item.rank,
      coverUrl: undefined, 
      externalUrl: `https://open.spotify.com/search/${encodeURIComponent(item.searchQuery || item.title + " " + item.artist)}`,
      addedAt: Date.now() // Timestamp for sorting
    }));

  } catch (error) {
    console.error("Gemini song suggestion failed:", error);
    return [];
  }
};
