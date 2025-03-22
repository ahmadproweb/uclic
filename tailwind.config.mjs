import { colors } from './src/config/theme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'marquee': 'marquee 30s linear infinite'
      },
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        status: colors.status,
      },
      backgroundColor: {
        primary: colors.primary.main,
        secondary: colors.secondary.main,
        accent: colors.accent.main,
      },
      textColor: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.disabled,
      },
      gradientColorStops: {
        'primary-start': colors.primary.light,
        'primary-end': colors.primary.dark,
        'secondary-start': colors.secondary.light,
        'secondary-end': colors.secondary.dark,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black'),
            a: {
              color: theme('colors.primary.main'),
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            h1: {
              color: theme('colors.black'),
              fontWeight: '600',
            },
            h2: {
              color: theme('colors.black'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.black'),
              fontWeight: '600',
            },
            h4: {
              color: theme('colors.black'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.primary.dark'),
              backgroundColor: theme('colors.gray.100'),
              borderRadius: '0.25rem',
              padding: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.white'),
              borderRadius: '0.5rem',
            },
            strong: {
              color: theme('colors.black'),
              fontWeight: '600',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.primary.light'),
              '&:hover': {
                color: theme('colors.primary.main'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.primary.light'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
} 