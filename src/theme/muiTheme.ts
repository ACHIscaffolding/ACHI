import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#28509E',
      light: '#4A72B8',
      dark: '#1C3A73',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F0F2F5',
      dark: '#E0E3E8',
      contrastText: '#1A2332',
    },
    success: {
      main: '#22C55E',
      light: '#86EFAC',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
    },
    info: {
      main: '#0EA5E9',
      light: '#7DD3FC',
    },
    background: {
      default: '#F5F6FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2332',
      secondary: '#64748B',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 700, fontSize: '1.5rem' },
    h5: { fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500, color: '#64748B' },
    body2: { color: '#64748B' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 600,
            backgroundColor: '#F8FAFC',
            color: '#475569',
            fontSize: '0.8125rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
        },
      },
    },
  },
});

export default theme;
