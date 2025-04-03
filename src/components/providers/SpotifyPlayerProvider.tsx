"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import SpotifyPlayer from '../ui/SpotifyPlayer';

interface SpotifyPlayerContextType {
  playlistId: string;
  episodeId: string;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const SpotifyPlayerContext = createContext<SpotifyPlayerContextType | undefined>(undefined);

interface SpotifyPlayerProviderProps {
  children: ReactNode;
  playlistId?: string;
  episodeId?: string;
}

export function SpotifyPlayerProvider({ 
  children, 
  playlistId = "37i9dQZF1DX1YPTAhwehsC",
  episodeId = "6oN7OBOaooqdFnT0czddrc"
}: SpotifyPlayerProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const value = {
    playlistId,
    episodeId,
    isPlaying,
    setIsPlaying
  };

  return (
    <SpotifyPlayerContext.Provider value={value}>
      {children}
      <SpotifyPlayer 
        episodeId={episodeId}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </SpotifyPlayerContext.Provider>
  );
}

export function useSpotifyPlayer() {
  const context = useContext(SpotifyPlayerContext);
  if (context === undefined) {
    throw new Error('useSpotifyPlayer must be used within a SpotifyPlayerProvider');
  }
  return context;
} 