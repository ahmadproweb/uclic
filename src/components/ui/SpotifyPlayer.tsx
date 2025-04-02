"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface SpotifyPlayerProps {
  episodeId: string;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function SpotifyPlayer({ 
  episodeId,
  isPlaying,
  setIsPlaying
}: SpotifyPlayerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  // Fonction pour contrôler la lecture
  const togglePlay = () => {
    if (!iframeLoaded) {
      setIframeLoaded(true);
      setIsMinimized(false);
    } else if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isPlaying ? 'pause' : 'play';
      iframe.contentWindow?.postMessage({ command: message }, '*');
      setIsPlaying(!isPlaying);
    }
  };

  // Écouter les messages de l'iframe pour synchroniser l'état de lecture
  useEffect(() => {
    if (!iframeLoaded) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        if (!event.origin.includes('spotify.com')) return;
        const data = event.data;
        if (typeof data === 'object' && data !== null) {
          if (data.type === 'playback_update' && typeof data.data?.isPlaying === 'boolean') {
            setIsPlaying(data.data.isPlaying);
          }
        }
      } catch (error) {
        console.debug('Error handling Spotify message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setIsPlaying, iframeLoaded]);

  // Détecter le scroll pour afficher le player
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeVisible = isVisible || isPlaying;

  // Charger l'iframe uniquement quand nécessaire
  const handleExpandClick = () => {
    if (!iframeLoaded) {
      setIframeLoaded(true);
    }
    setIsMinimized(false);
  };

  return (
    <div 
      ref={playerRef}
      className={cn(
        "fixed bottom-0 left-0 w-full transition-all duration-500 z-50",
        isDark ? "bg-black/95" : "bg-white/95",
        "border-t border-[#E0FF5C]/20",
        "backdrop-blur-xl shadow-2xl",
        shouldBeVisible ? "translate-y-0" : "translate-y-full",
        isMinimized ? "h-12" : "h-auto"
      )}
    >
      <div className="max-w-[1250px] mx-auto px-4 py-2 relative">
        {shouldBeVisible && (
          <button 
            onClick={handleExpandClick}
            className={cn(
              "absolute -top-[21px] right-4 bg-[#E0FF5C] text-black px-3 py-0.5 rounded-t-lg",
              "hover:bg-[#E0FF5C]/90 transition-colors duration-200",
              "text-xs font-medium flex items-center gap-0.5"
            )}
          >
            {isMinimized ? (
              <>
                <span>Agrandir</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </>
            ) : (
              <>
                <span>Réduire</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </>
            )}
          </button>
        )}

        <div className={cn(
          "transition-all duration-500",
          isMinimized ? "h-0 opacity-0 invisible" : "h-[80px] opacity-100 visible"
        )}>
          {iframeLoaded && (
            <iframe
              ref={iframeRef}
              src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=${isDark ? '0' : '1'}`}
              width="100%"
              height="80"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg border border-[#E0FF5C]/20"
            />
          )}
        </div>

        {isMinimized && (
          <div className="flex items-center justify-between h-8">
            <div className="flex items-center gap-3 flex-1">
              <button 
                onClick={togglePlay}
                className="hover:scale-105 transition-transform p-1.5 hover:bg-[#E0FF5C]/10 rounded-full"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E0FF5C]">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M10 15V9M14 15V9"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E0FF5C]">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                )}
              </button>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#1DB954]/90 text-white inline-flex items-center gap-1.5 whitespace-nowrap">
                  <i className="ri-spotify-line"></i>
                  Podcast chez Wild Marketer
                </span>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className={cn(
                    "font-medium text-sm truncate flex-1",
                    isDark ? "text-white" : "text-black"
                  )}>
                    #1 Wladimir Delcros - CodinGame : Automatiser à 100% sa Lead Generation B2B avec des Outils No-Code
                  </span>
                  <span className={cn(
                    "text-xs whitespace-nowrap",
                    isDark ? "text-[#E0FF5C]/90" : "text-[#1DB954]"
                  )}>
                    Wladimir Fondateur de Uclic
                  </span>
                </div>
              </div>
            </div>
            <a 
              href={`https://open.spotify.com/episode/${episodeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "ml-4 p-1.5 rounded-full hover:bg-[#E0FF5C]/10 transition-colors",
                "hover:text-[#E0FF5C] transition-colors duration-200",
                isDark ? "text-white/70" : "text-black/70"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 