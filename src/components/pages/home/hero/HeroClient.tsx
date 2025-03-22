"use client";

import { useTheme } from "@/context/ThemeContext";

export default function HeroClient() {
  const { theme } = useTheme();
  
  return (
    <style jsx global>{`
      /* Animations et transitions uniquement */
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Transitions pour le thème */
      .transition-theme {
        transition: background-color 0.3s ease-in-out,
                    color 0.3s ease-in-out,
                    opacity 0.3s ease-in-out;
      }
    `}</style>
  );
} 