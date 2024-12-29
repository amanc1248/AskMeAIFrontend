import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#1a73e8' : '#90caf9',
      light: mode === 'light' ? '#4285f4' : '#b3e5fc',
      dark: mode === 'light' ? '#1557b0' : '#0d47a1',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#202124' : '#ffffff',
      secondary: mode === 'light' ? '#5f6368' : '#b0b0b0',
    },
    divider: mode === 'light' ? '#e0e0e0' : '#2d2d2d',
  },
  typography: {
    fontFamily: "'Raleway', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    h2: {
      fontWeight: 700,
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    h3: {
      fontWeight: 600,
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    h4: {
      fontWeight: 600,
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    h5: {
      fontWeight: 500,
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    h6: {
      fontWeight: 500,
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    subtitle1: {
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    subtitle2: {
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    body1: {
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    body2: {
      fontFamily: "'Raleway', 'Arial', sans-serif",
    },
    button: {
      fontFamily: "'Raleway', 'Arial', sans-serif",
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: 'none',
          fontFamily: "'Raleway', 'Arial', sans-serif",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

export default getTheme; 