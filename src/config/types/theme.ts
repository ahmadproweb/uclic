export interface ThemeColors {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
      hover: string;
      text: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    accent: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    background: {
      default: string;
      paper: string;
      dark: string;
      light: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    common: {
      black: string;
      white: string;
    };
    status: {
      success: string;
      error: string;
      warning: string;
      info: string;
    };
    gradients: {
      primary: string;
      secondary: string;
      dark: string;
    };
    header: {
      text: {
        light: string;
        dark: string;
      };
      background: {
        transparent: string;
        gradient: string;
      };
      border: {
        light: string;
        lighter: string;
        transparent: string;
      };
    };
  };
  effects: {
    blur: {
      default: string;
      strong: string;
    };
  };
} 