'use client';

import { memo, useCallback } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { colors as theme } from '@/config/theme';
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
    // Ajoutez ici votre logique d'inscription à la newsletter
    console.log('Email soumis:', email);
  }, [email]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <div className={`${isDark ? 'bg-white/10' : 'bg-black/5'} rounded-[32px] p-4 md:p-8 animate-fade-in-up`}>
      <h3 className="text-xs md:text-sm font-medium mb-4">Abonnez-vous</h3>
      <p className={`${isDark ? 'text-white/60' : 'text-gray-600'} text-xs md:text-sm mb-4`}>
        Profitez de conseil d&apos;experts dans votre boîte mail
      </p>
      <form className="relative mb-3 md:mb-4" onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email}
          onChange={handleEmailChange}
          placeholder="Votre email"
          className={`w-full ${isDark ? 'bg-white/5' : 'bg-black/5'} rounded-full py-2 md:py-3 px-4 text-xs md:text-sm ${
            isDark ? 'text-white' : 'text-gray-900'
          } ${
            isDark ? 'placeholder:text-white/40' : 'placeholder:text-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]`}
        />
        <SubmitButton />
      </form>
      <p className={`${isDark ? 'text-white/40' : 'text-gray-500'} text-xs`}>
        En vous inscrivant, vous acceptez de recevoir des emails marketing de notre part.
      </p>
    </div>
  );
}

NewsletterSection.displayName = 'NewsletterSection';

export default memo(NewsletterSection); 