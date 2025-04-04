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
      {/* Base Background gradient */}
      <div 
        className={cn(
          "fixed inset-0 transition-colors duration-300",
          isDark ? "bg-black/90" : "bg-white/90"
        )}
        onClick={closeVideoPopup}
      />

      {/* Grain effect overlay */}
      <div 
        className={cn(
          "fixed inset-0 mix-blend-soft-light transition-opacity duration-300",
          isDark ? "opacity-90" : "opacity-50"
        )}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
        onClick={closeVideoPopup}
      />
      
      {/* Content with backdrop blur */}
      <div className={cn(
        "relative w-full max-w-4xl p-6 md:p-8 rounded-2xl border backdrop-blur-2xl transition-all duration-300",
        isDark ? "bg-black/80 border-white/10" : "bg-white/80 border-black/5",
        "shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_30px_-15px_rgba(255,255,255,0.3)]"
      )}>
        {/* Close button */}
        <button 
          onClick={closeVideoPopup}
          className={cn(
            "absolute -top-4 -right-4 p-2 rounded-full",
            "transition-colors duration-200 shadow-xl",
            isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Title with better visibility */}
        <div className="mb-6">
          <h2 className={cn(
            "text-xl md:text-2xl font-semibold",
            isDark ? "text-white" : "text-black"
          )}>
            {title}
          </h2>
        </div>

        {/* Video container with better contrast */}
        <div className={cn(
          "relative rounded-xl overflow-hidden border",
          isDark ? "bg-black/60 border-white/10" : "bg-white/60 border-black/5"
        )}>
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