"use client";

import AvatarGroup from './AvatarGroup';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const teamAvatars = [
  {
    src: "/hero/brice-maurin.webp",
    alt: "Brice Maurin"
  },
  {
    src: "/hero/denis.webp",
    alt: "Denis Cohen"
  },
  {
    src: "/hero/jean.webp",
    alt: "Jean"
  },
  {
    src: "/hero/benoit.webp",
    alt: "Benoit"
  },
  {
    src: "/hero/cabane.webp",
    alt: "Cabane"
  }
];

export default function SocialProof() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <div className="flex flex-col gap-1">
      <span className={cn(
        "flex items-center gap-1.5 text-xs font-medium tracking-wide",
        isDark ? "text-white/70" : "text-black/70"
      )}>
        ✓ Recommandé par
      </span>
      <AvatarGroup
        avatars={teamAvatars}
        text=""
        className="min-w-[180px]"
      />
    </div>
  );
} 