import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#091118', color: '#94a3b8', pt: 10, pb: 6, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ mb: 8 }}>
          
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#25a27b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FavoriteIcon sx={{ color: '#ffffff', fontSize: 20 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Cardio<span style={{ color: '#25a27b' }}>.AI</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.8, mb: 3, maxWidth: 320 }}>
              Certified AI-Powered Cardiovascular Risk Prediction & Continuous Remote ECG Telemetry System for clinical decision support.
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
              ISO 13485 & CE Medical Device Standard Compliant Architecture.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 800, mb: 2.5 }}>
              Platform
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" component={Link} to="/" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: '#25a27b' } }}>
                Home
              </Typography>
              <Typography variant="body2" component={Link} to="/predict" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: '#25a27b' } }}>
                Cardio Predict
              </Typography>
              <Typography variant="body2" component={Link} to="/health" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: '#25a27b' } }}>
                Health Related
              </Typography>
              <Typography variant="body2" component={Link} to="/health#faq" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: '#25a27b' } }}>
                Clinical Guidelines
              </Typography>
            </Box>
          </Grid>

          {/* Solutions */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 800, mb: 2.5 }}>
              Services & Technology
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Single Use ECG Biosensors
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Remote Arrhythmia Detection
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                24/7 Clinical Holter Reports
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Decision Tree ML Model
              </Typography>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 800, mb: 2.5 }}>
              Clinical Updates
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
              Subscribe for the latest machine learning medical publications and cardiac care updates.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder="Enter email..."
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 9999,
                  input: { color: '#fff', fontSize: '0.9rem' },
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.15)', borderRadius: 9999 },
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#25a27b',
                  borderRadius: 9999,
                  px: 2.5,
                  '&:hover': { backgroundColor: '#1b7d5e' },
                }}
              >
                Join
              </Button>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} Cardio.AI Inc. All rights reserved. For clinical evaluation and risk screening.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="caption" sx={{ color: '#64748b', cursor: 'pointer', '&:hover': { color: '#94a3b8' } }}>
              Privacy Policy
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', cursor: 'pointer', '&:hover': { color: '#94a3b8' } }}>
              Terms of Service
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', cursor: 'pointer', '&:hover': { color: '#94a3b8' } }}>
              HIPAA Compliance
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
