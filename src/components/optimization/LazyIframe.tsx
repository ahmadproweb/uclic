'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyIframeProps {
  src: string;
  title: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholder?: React.ReactNode;
  intersectionThreshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyIframe({
  src,
  title,
  width = '100%',
  height = '315',
  className,
  placeholder,
  intersectionThreshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError
}: LazyIframeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: intersectionThreshold,
        rootMargin
      }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, [intersectionThreshold, rootMargin, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        ref={iframeRef}
        className={cn(
          'flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded',
          className
        )}
        style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
      >
        <span className="text-gray-400 text-sm">Contenu non disponible</span>
      </div>
    );
  }

  return (
    <div
      ref={iframeRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
    >
      {isInView ? (
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          className={cn(
            'w-full h-full border-0 rounded',
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          allowFullScreen
        />
      ) : (
        placeholder || (
          <div
            className={cn(
              'w-full h-full bg-gray-200 dark:bg-gray-800',
              'flex items-center justify-center',
              'animate-pulse rounded'
            )}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Chargement...</p>
            </div>
          </div>
        )
      )}

      {/* Overlay de chargement */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center rounded">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Composant spécialisé pour YouTube
interface LazyYouTubeProps {
  videoId: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  showInfo?: boolean;
  rel?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyYouTube({
  videoId,
  title = 'YouTube video',
  width = '100%',
  height = '315',
  className,
  autoplay = false,
  muted = false,
  controls = true,
  showInfo = true,
  rel = false,
  onLoad,
  onError
}: LazyYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const buildYouTubeUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: muted ? '1' : '0',
      controls: controls ? '1' : '0',
      showinfo: showInfo ? '1' : '0',
      rel: rel ? '1' : '0',
      modestbranding: '1',
      playsinline: '1'
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={cn(
          'flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded',
          className
        )}
        style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
      >
        <span className="text-gray-400 text-sm">Vidéo non disponible</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded', className)}
      style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
    >
      {isInView ? (
        <iframe
          src={buildYouTubeUrl()}
          title={title}
          width={width}
          height={height}
          className={cn(
            'w-full h-full border-0',
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          className={cn(
            'w-full h-full bg-gray-200 dark:bg-gray-800',
            'flex items-center justify-center',
            'animate-pulse'
          )}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-500">Chargement de la vidéo...</p>
          </div>
        </div>
      )}

      {/* Overlay de chargement */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
