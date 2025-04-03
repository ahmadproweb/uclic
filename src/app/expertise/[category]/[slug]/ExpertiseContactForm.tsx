'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';

export default function ExpertiseContactForm() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <div className="w-full h-full max-w-md mx-auto">
      <div className={cn(
        "w-full h-full rounded-2xl p-8",
        "border backdrop-blur-sm",
        isDark ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"
      )}>
        <form className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/90" : "text-black/90"
              )}
            >
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]"
              )}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/90" : "text-black/90"
              )}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]"
              )}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label 
              htmlFor="phone" 
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/90" : "text-black/90"
              )}
            >
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]"
              )}
              placeholder="+33 1 23 45 67 89"
            />
          </div>

          <div>
            <label 
              htmlFor="message" 
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/90" : "text-black/90"
              )}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]"
              )}
              placeholder="Décrivez votre projet..."
            />
          </div>

          <button
            type="submit"
            className={cn(
              "w-full py-3 px-4 bg-[#E0FF5C] text-black hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-[#E0FF5C]/90 rounded-full font-bold transition-all duration-200"
            )}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
} 