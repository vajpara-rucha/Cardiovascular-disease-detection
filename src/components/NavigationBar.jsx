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
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeartOutlined';
import HistoryIcon from '@mui/icons-material/HistoryOutlined';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Link, useLocation } from 'react-router-dom';
import { getUserProfile } from '../utils/profileStorage';

const navLinks = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon fontSize="small" /> },
  { label: 'Predict Risk', path: '/predict', icon: <MonitorHeartIcon fontSize="small" /> },
  { label: 'History Logs', path: '/history', icon: <HistoryIcon fontSize="small" /> },
  { label: 'Health Guide', path: '/health', icon: <HealthAndSafetyIcon fontSize="small" /> },
  { label: 'About Project', path: '/about', icon: <InfoOutlinedIcon fontSize="small" /> },
  { label: 'Profile', path: '/profile', icon: <PersonOutlineIcon fontSize="small" /> },
];

function NavigationBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profile, setProfile] = useState(getUserProfile());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const syncProfile = () => setProfile(getUserProfile());
    window.addEventListener('profile_updated', syncProfile);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('profile_updated', syncProfile);
    };
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          top: 12,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1240,
            width: '94%',
            mx: 'auto',
            px: { xs: 2.5, md: 3 },
            py: 0.8,
            backgroundColor: '#ffffff',
            borderRadius: '9999px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: scrolled
              ? '0 12px 35px rgba(0, 0, 0, 0.12)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
          }}
          disableGutters
        >
          {/* Logo with Green Heart Icon */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  backgroundColor: '#e6f7f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FavoriteIcon sx={{ color: '#25a27b', fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: '#0f172a',
                  fontSize: '1.3rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Cardio<span style={{ color: '#25a27b' }}>.AI</span>
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Nav Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    variant="text"
                    startIcon={link.icon}
                    disableRipple
                    sx={{
                      color: active ? '#25a27b' : '#475569',
                      fontWeight: active ? 700 : 500,
                      px: 2,
                      py: 0.75,
                      fontSize: '0.92rem',
                      borderRadius: '9999px',
                      backgroundColor: active ? '#e6f7f0' : 'transparent',
                      '&:hover': {
                        backgroundColor: active ? '#d1f2e4' : '#f1f5f9',
                        color: '#25a27b',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}

              <Button
                component={Link}
                to="/predict"
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  ml: 1.5,
                  backgroundColor: '#25a27b',
                  color: '#ffffff',
                  fontWeight: 700,
                  px: 2.8,
                  py: 0.9,
                  fontSize: '0.88rem',
                  borderRadius: '9999px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#1b7d5e',
                    boxShadow: '0 4px 15px rgba(37, 162, 123, 0.3)',
                  },
                }}
              >
                New Predict
              </Button>

              <Tooltip title="View Physician Profile">
                <IconButton
                  component={Link}
                  to="/profile"
                  sx={{ ml: 1, p: 0.5, border: '2px solid #25a27b' }}
                >
                  <Avatar
                    alt="Dr. Sarah Jenkins"
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: '#0f172a' }}
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 290,
            background: '#ffffff',
            pt: 3,
            px: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, py: 1 }}>
          <Avatar
            alt="Dr. Sarah Jenkins"
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
            sx={{ width: 42, height: 42, border: '2px solid #25a27b' }}
          />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>
              Dr. Sarah Jenkins
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Chief Cardiologist
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <List>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={() => setDrawerOpen(false)}
                  selected={active}
                  sx={{
                    borderRadius: 3,
                    mb: 1,
                    backgroundColor: active ? '#e6f7f0' : 'transparent',
                    color: active ? '#25a27b' : '#334155',
                  }}
                >
                  <Box sx={{ mr: 1.5, display: 'flex', color: active ? '#25a27b' : '#64748b' }}>
                    {link.icon}
                  </Box>
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ fontWeight: active ? 700 : 500 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              fullWidth
              component={Link}
              to="/predict"
              onClick={() => setDrawerOpen(false)}
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                backgroundColor: '#25a27b',
                color: '#ffffff',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '9999px',
                '&:hover': { backgroundColor: '#1b7d5e' },
              }}
            >
              Start New Predict
            </Button>
          </ListItem>
        </List>
      </Drawer>

      <Toolbar sx={{ mb: 3 }} />
    </>
  );
}

export default NavigationBar;
