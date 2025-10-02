"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string; // mp4 url (can include #t=)
  poster?: string;
  className?: string;
  preload?: "none" | "metadata";
  controls?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  onVisiblePlay?: boolean; // auto-play muted when visible
}

export default function LazyVideo({
  src,
  poster,
  className,
  preload = "none",
  controls = true,
  muted = true,
  playsInline = true,
  onVisiblePlay = false,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // attach source only once
            if (!isLoaded) {
              const source = document.createElement("source");
              source.src = src;
              source.type = "video/mp4";
              el.appendChild(source);
              el.load();
              setIsLoaded(true);
              if (onVisiblePlay) {
                el.play().catch(() => {});
              }
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, isLoaded]);

  const handleClick = () => {
    if (!isLoaded && ref.current) {
      const source = document.createElement("source");
      source.src = src;
      source.type = "video/mp4";
      ref.current.appendChild(source);
      ref.current.load();
      setIsLoaded(true);
      ref.current.play().catch(() => {});
    }
  };

  return (
    <video
      ref={ref}
      className={className}
      preload={preload}
      poster={poster}
      controls={controls}
      muted={muted}
      playsInline={playsInline}
      onClick={handleClick}
    >
      {/* source injected lazily */}
    </video>
  );
}



