/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          glow: {
            center: 'rgba(34, 197, 94, 0.2)',
            mid: 'rgba(34, 197, 94, 0.1)',
            outer: 'rgba(34, 197, 94, 0.05)',
          }
        }
      },
      clipPath: {
        notch: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 20% 50%)',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'slide': 'slide 40s linear infinite',
        'slide-reverse': 'slide 40s linear infinite reverse',
        'scroll': 'scroll 30s linear infinite',
        'scroll-reverse': 'scroll 30s linear infinite reverse'
      }
    }
  },
  plugins: [
    // Ajoutez ce plugin pour supporter les clip-path personnalisés
    function ({ addUtilities }) {
      addUtilities({
        '.clip-path-notch': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 20% 50%)',
        },
        '.pause': {
          'animation-play-state': 'paused',
        }
      })
    },
  ],
  // ... reste de la config
} 