"use client";

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useVideoPopup } from '@/context/VideoPopupContext';

export default function VideoPopup() {
  const { theme: currentTheme } = useTheme();
  const { isOpen, closeVideoPopup, videoId, title } = useVideoPopup();
  const isDark = currentTheme === 'dark';

  // Empêcher le scroll et cacher le header quand la popup est ouverte
  useEffect(() => {
    const header = document.querySelector('header');
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (header) {
        header.style.visibility = 'hidden';
      }
    } else {
      document.body.style.overflow = 'unset';
      if (header) {
        header.style.visibility = 'visible';
      }
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      if (header) {
        header.style.visibility = 'visible';
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
      {/* Overlay with stronger blur and opacity */}
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
        onClick={closeVideoPopup}
      />
      
      {/* Content with stronger contrast */}
      <div className="relative bg-black rounded-2xl w-full max-w-4xl p-6 md:p-8 shadow-2xl border border-white/10">
        {/* Close button */}
        <button 
          onClick={closeVideoPopup}
          className={cn(
            "absolute -top-4 -right-4 p-2 rounded-full bg-white hover:bg-white/90",
            "text-black",
            "transition-colors duration-200",
            "shadow-xl"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Title with better visibility */}
        <div className="mb-6">
          <h2 className="text-white text-xl md:text-2xl font-semibold">
            {title}
          </h2>
        </div>

        {/* Video container with better contrast */}
        <div className="relative rounded-xl overflow-hidden bg-black border border-white/10">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
} 