'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  start?: number;
  end?: number;
  lazy?: boolean;
  placeholder?: React.ReactNode;
}

export default function LazyYouTube({
  videoId,
  title,
  className,
  width = 560,
  height = 315,
  autoplay = false,
  muted = false,
  controls = true,
  start,
  end,
  lazy = true,
  placeholder
}: LazyYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy) {
      setIsIntersecting(true);
      return;
    }

    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const buildYouTubeUrl = () => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();

    if (autoplay) params.append('autoplay', '1');
    if (muted) params.append('mute', '1');
    if (!controls) params.append('controls', '0');
    if (start) params.append('start', start.toString());
    if (end) params.append('end', end.toString());
    
    // Optimisations de performance
    params.append('rel', '0'); // Pas de vidéos suggérées
    params.append('modestbranding', '1'); // Logo YouTube minimal
    params.append('iv_load_policy', '3'); // Pas d'annotations
    params.append('fs', '0'); // Pas de plein écran
    params.append('disablekb', '1'); // Pas de contrôles clavier
    params.append('playsinline', '1'); // Lecture inline sur mobile

    return `${baseUrl}?${params.toString()}`;
  };

  const defaultPlaceholder = (
    <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-90" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-white/80 text-xs">
          Cliquez pour charger la vidéo
        </p>
      </div>
    </div>
  );

  if (hasError) {
    return (
      <div className={cn("w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center", className)} style={{ height }}>
        <div className="text-center p-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Erreur de chargement de la vidéo</p>
          <button
            onClick={() => {
              setHasError(false);
              setIsLoaded(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      {!isIntersecting ? (
        <div onClick={() => setIsIntersecting(true)} className="cursor-pointer">
          {placeholder || defaultPlaceholder}
        </div>
      ) : !isLoaded ? (
        <div className="relative">
          {placeholder || defaultPlaceholder}
          <iframe
            src={buildYouTubeUrl()}
            title={title}
            width={width}
            height={height}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full opacity-0"
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </div>
      ) : (
        <iframe
          src={buildYouTubeUrl()}
          title={title}
          width={width}
          height={height}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full rounded-lg"
          loading="lazy"
        />
      )}
    </div>
  );
}
