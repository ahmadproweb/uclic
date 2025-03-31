import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
        },
        'pulse-slower': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.05)', opacity: '0.5' },
        },
        'pulse-slowest': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.02)', opacity: '0.4' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 8s ease-in-out infinite',
        'pulse-slowest': 'pulse-slowest 10s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards'
      },
    },
  },
  // ... rest of your existing configuration
} satisfies Config

export default config 