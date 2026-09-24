import { createTheme } from '@mui/material/styles';

const INDIGO = {
  main: '#6366f1',
  dark: '#4f46e5',
  light: '#818cf8',
  violet: '#8b5cf6',
};

const TEAL = {
  main: '#14b8a6',
  light: '#2dd4bf',
};

const GRAY = {
  50: '#f9fafb',
  100: '#f3f4f6',
  800: '#1f2937',
  900: '#111827',
  950: '#030712',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: INDIGO.main,
      dark: INDIGO.dark,
      light: INDIGO.light,
      contrastText: '#ffffff',
    },
    secondary: {
      main: TEAL.main,
      light: TEAL.light,
      contrastText: '#ffffff',
    },
    background: {
      default: GRAY[950],
      paper: 'rgba(17, 24, 39, 0.7)',
    },
    text: {
      primary: '#f9fafb',
      secondary: '#9ca3af',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.04em',
      lineHeight: 1.1,
      fontSize: '2.5rem',
      '@media (min-width:600px)': { fontSize: '3.5rem' },
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  custom: {
    gradients: {
      page: `linear-gradient(135deg, ${GRAY[950]} 0%, ${GRAY[900]} 100%)`,
      primary: `linear-gradient(135deg, ${INDIGO.main} 0%, ${INDIGO.violet} 100%)`,
      brand: `linear-gradient(135deg, ${INDIGO.main} 0%, ${TEAL.light} 100%)`,
    },
    surfaces: {
      glass: 'rgba(31, 41, 55, 0.4)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
      nav: 'rgba(3, 7, 18, 0.8)',
    },
    radii: {
      card: 24,
      pill: 9999,
    },
    shadows: {
      card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      glow: '0 0 20px rgba(99, 102, 241, 0.5)',
    },
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeArg) => ({
        body: {
          background: themeArg.custom.gradients.page,
          minHeight: '100vh',
          color: themeArg.palette.text.primary,
        },
        '::selection': {
          background: themeArg.palette.primary.main,
          color: '#fff',
        }
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.custom.radii.pill,
          transition: t.custom.transition,
        }),
        contained: ({ theme: t }) => ({
          backgroundImage: t.custom.gradients.primary,
          boxShadow: t.custom.shadows.glow,
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.8)',
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          background: t.custom.surfaces.glass,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${t.custom.surfaces.glassBorder}`,
          borderRadius: t.custom.radii.card,
          boxShadow: t.custom.shadows.card,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          background: t.custom.surfaces.nav,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${t.custom.surfaces.glassBorder}`,
        }),
      },
    },
  },
});

export default theme;

