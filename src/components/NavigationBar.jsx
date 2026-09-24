import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Predict Risk', path: '/predict' },
  { label: 'About', path: '/about' },
];

function NavigationBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: scrolled ? 1 : 0,
          background: scrolled
            ? 'rgba(255, 255, 255, 0.92)'
            : 'transparent',
        }}
      >
        <Toolbar
          sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}
          disableGutters
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <LocalHospitalIcon sx={{ color: 'primary.main', fontSize: 26 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                fontSize: '1.1rem',
              }}
            >
              CardioRisk AI
            </Typography>
          </Link>

          <div className="flex-1" />

          {!isMobile && (
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  variant="text"
                  sx={{
                    color: isActive(link.path) ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive(link.path) ? 700 : 500,
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    backgroundColor: isActive(link.path) ? 'action.selected' : 'transparent',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                      transform: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          )}

          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            pt: 2,
          },
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3">
          <LocalHospitalIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
            CardioRisk AI
          </Typography>
        </div>
        <Divider sx={{ mb: 1 }} />
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                selected={isActive(link.path)}
                sx={{ mx: 1 }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: isActive(link.path) ? 700 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Toolbar />
    </>
  );
}

export default NavigationBar;
