'use client';

import { memo, useCallback } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { FormEvent, useState } from 'react';

// Memoized Components
const SubmitButton = memo(() => (
  <button 
    type="submit"
    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors hover:bg-white/10"
    aria-label="S'abonner à la newsletter"
  >
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      className="w-3 h-3 md:w-4 md:h-4"
    >
      <path 
        d="M4 12h16m0 0l-6-6m6 6l-6 6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </button>
));

SubmitButton.displayName = 'SubmitButton';

function NewsletterSection() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log('Email soumis:', email);
  }, [email]);

  return (
    <div className={`${isDark ? 'bg-white/20' : 'bg-black/10'} rounded-[32px] p-4 md:p-8 animate-fade-in-up`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h3 className={`text-xs md:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Abonnez-vous
          </h3>
          <p className={`${isDark ? 'text-white/90' : 'text-gray-700'} text-xs md:text-sm`}>
            Profitez de conseil d&apos;experts dans votre boîte mail
          </p>
        </div>

        <div className="relative">
          <input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Votre email"
            className={`w-full ${isDark ? 'bg-white/10' : 'bg-black/10'} rounded-full py-2 md:py-3 px-4 text-xs md:text-sm ${
              isDark ? 'text-white placeholder:text-white/70' : 'text-gray-900 placeholder:text-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]`}
          />
          <SubmitButton />
        </div>

        <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} text-xs`}>
          En vous inscrivant, vous acceptez de recevoir des emails marketing de notre part.
        </p>
      </form>
    </div>
  );
}

NewsletterSection.displayName = 'NewsletterSection';

export default memo(NewsletterSection); 