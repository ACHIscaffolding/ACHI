import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#28509E',
      light: '#4A73C5',
      dark: '#1E3B7A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#F8F9FA',
      dark: '#E9ECEF',
      contrastText: '#28509E',
    },
    success: {
      main: '#28509E',
    },
    warning: {
      main: '#FF6B35',
    },
    error: {
      main: '#F04A3A',
    },
    info: {
      main: '#F8F9FA',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#28509E',
      secondary: '#6C757D',
    },
    divider: 'rgba(40, 80, 158, 0.15)',
  },
  typography: {
    fontFamily: "'Oxanium', sans-serif",
    h4: {
      fontFamily: "'Oxanium', sans-serif",
      fontWeight: 700,
      fontSize: '1.55rem',
      lineHeight: 1,
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: "'Oxanium', sans-serif",
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: 1,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    },
    h6: {
      fontFamily: "'Oxanium', sans-serif",
      fontWeight: 700,
      fontSize: '0.88rem',
      lineHeight: 1,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontFamily: "'Oxanium', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    subtitle2: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 500,
      fontSize: '0.72rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#7A7468',
    },
    body1: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '0.82rem',
      color: '#D9D2C5',
    },
    body2: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '0.74rem',
      color: '#7A7468',
    },
    button: {
      fontFamily: "'Oxanium', sans-serif",
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: '#FFFFFF',
        },
        body: {
          backgroundColor: '#FFFFFF',
          color: '#28509E',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(40, 80, 158, 0.15)',
          background: '#FFFFFF',
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(40, 80, 158, 0.15)',
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(40, 80, 158, 0.15)',
        },
      },
    },
  },
});

export default theme;