'use client';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showLabel?: boolean;
}

export default function ShareButtons({ 
  url, 
  title, 
  className,
  variant = 'horizontal',
  showLabel = false
}: ShareButtonsProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  // Utiliser l'URL du navigateur si aucune URL n'est fournie
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Configuration des boutons de partage
  const networks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className={cn(
      variant === 'horizontal' ? 'flex space-x-3' : 'flex flex-col space-y-3',
      className
    )}>
      {showLabel && (
        <div className={cn(
          'text-sm font-semibold mr-2',
          isDark ? 'text-white' : 'text-black'
        )}>
          Partager:
        </div>
      )}
      
      {networks.map((network) => (
        <a
          key={network.name}
          href={network.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'transition-all duration-200 flex items-center justify-center',
            isDark 
              ? 'text-white hover:bg-[#D9FF4B] hover:text-black' 
              : 'text-black hover:bg-[#D9FF4B]',
            variant === 'horizontal' ? 'w-10 h-10 rounded-full' : 'w-full py-2 px-4 rounded-lg'
          )}
          aria-label={`Partager sur ${network.name}`}
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
          }}
        >
          {network.icon}
          {variant === 'vertical' && (
            <span className="ml-2 text-sm">{network.name}</span>
          )}
        </a>
      ))}
    </div>
  );
} 