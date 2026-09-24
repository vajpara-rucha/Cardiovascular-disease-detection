import { createTheme } from '@mui/material/styles';

const CARDIO_GREEN = {
  main: '#25a27b',
  dark: '#1b7d5e',
  light: '#3fc397',
  softBg: '#e6f7f0',
};

const CARDIO_DARK = {
  bg: '#0a1118',
  paper: '#121d27',
  card: '#162432',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: CARDIO_GREEN.main,
      dark: CARDIO_GREEN.dark,
      light: CARDIO_GREEN.light,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#14b8a6',
      light: '#2dd4bf',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    divider: 'rgba(15, 23, 42, 0.08)',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: '"Outfit", "Sora", "Plus Jakarta Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
      fontSize: '2.5rem',
      '@media (min-width:600px)': { fontSize: '3.5rem' },
    },
    h2: {
      fontFamily: '"Outfit", "Sora", "Plus Jakarta Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
      fontSize: '2rem',
      '@media (min-width:600px)': { fontSize: '2.75rem' },
    },
    h3: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: '1.5rem',
      '@media (min-width:600px)': { fontSize: '2rem' },
    },
    h4: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 20,
  },
  custom: {
    colors: {
      green: CARDIO_GREEN,
      darkBg: CARDIO_DARK,
      mintBg: '#e6f7f0',
      creamBg: '#fdfbf7',
    },
    gradients: {
      page: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      heroDark: 'linear-gradient(135deg, #0b1520 0%, #112233 100%)',
      cardGreen: 'linear-gradient(135deg, #e6f7f0 0%, #d1f2e4 100%)',
      cardCream: 'linear-gradient(135deg, #fdfbf7 0%, #f7f2e8 100%)',
      riskHigh: 'linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%)',
      riskLow: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    },
    shadows: {
      card: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
      cardHover: '0 20px 40px -10px rgba(37, 162, 123, 0.15)',
      glow: '0 0 25px rgba(37, 162, 123, 0.4)',
    },
    radii: {
      card: 24,
      pill: 9999,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontFamily: '"Outfit", "Inter", sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(37, 162, 123, 0.25)',
          },
        },
        containedPrimary: {
          backgroundColor: CARDIO_GREEN.main,
          '&:hover': {
            backgroundColor: CARDIO_GREEN.dark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default theme;
