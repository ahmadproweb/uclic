'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface StickyShareButtonsProps {
  url: string;
  title: string;
}

export default function StickyShareButtons({ url, title }: StickyShareButtonsProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [isVisible, setIsVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState(url);
  
  // Mettre à jour l'URL une fois côté client seulement
  useEffect(() => {
    // Utiliser l'URL du navigateur si aucune URL n'est fournie
    if (!url && typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, [url]);

  // Détecter le scroll pour afficher/masquer les boutons
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: title,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div 
      className={cn(
        'fixed right-4 md:right-8 z-40 transition-all duration-500 ease-in-out',
        'flex flex-col space-y-3 items-center',
        'top-1/2 transform -translate-y-1/2',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
      )}
    >
      <div className={cn(
        'py-3 px-1 rounded-full shadow-lg backdrop-blur-sm',
        isDark 
          ? 'bg-black/40 border border-white/10' 
          : 'bg-white/40 border border-black/10'
      )}>
        <button
          onClick={handleNativeShare}
          className={cn(
            'w-10 h-10 my-2 rounded-full flex items-center justify-center transition-all',
            isDark 
              ? 'text-white hover:bg-[#E0FF5C] hover:text-black' 
              : 'text-black hover:bg-[#E0FF5C]'
          )}
          aria-label="Partager cet article"
          title="Partager cet article"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}