import { ThemeColors } from './types/theme';

export const colors: ThemeColors = {
  colors: {
    primary: {
      main: '#E0FF5C',      // Vert principal
      light: '#E5FF7E',     // Version plus claire
      dark: '#AECC3C',      // Version plus foncée
      contrastText: '#000000',
      hover: '#ffffff',
      text: '#000000',
    },
    secondary: {
      main: '#512FEB',      // Violet principal
      light: '#8160ff',     // Version plus claire
      dark: '#2800b8',      // Version plus foncée
      contrastText: '#ffffff',
    },
    accent: {
      main: '#F5F5F5',      // Gris clair utilisé dans les cards
      light: '#ffffff',
      dark: '#c2c2c2',
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#F5F5F5',
      dark: 'rgba(0, 0, 0, 0.9)',
      light: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    status: {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196f3',
    },
    gradients: {
      primary: 'linear-gradient(to right, rgba(45, 33, 93, 0.8), rgba(0, 0, 0, 0.9))',
      secondary: 'linear-gradient(to right, #512FEB, #99eb47)',
      dark: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95))',
    },
    header: {
      text: {
        light: '#ffffff',
        dark: '#000000',
      },
      background: {
        transparent: 'rgba(0, 0, 0, 0.85)',
        gradient: 'linear-gradient(to right, rgba(45, 33, 93, 0.8), rgba(0, 0, 0, 0.9))',
      },
      border: {
        light: 'rgba(255, 255, 255, 0.3)',
        lighter: 'rgba(255, 255, 255, 0.5)',
        transparent: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  effects: {
    blur: {
      default: '12px',
      strong: '16px',
    },
  },
};

// Utilitaire pour accéder aux couleurs avec transparence
export const withOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Hook personnalisé pour utiliser les couleurs
export const useThemeColors = () => {
  return colors;
}; 