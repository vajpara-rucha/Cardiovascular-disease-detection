import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const clinicBenefits = [
    'ECG biosensors as consumables – no prepayment required',
    'Extended ECG analysis for 3-5-7 days',
    'Medical report ready for review in 24 working hours (at maximum)',
    'Reduces patient and staff time',
    'Eliminates the need for maintenance and repair',
    '24/7 access to ECG records/patient reports',
    'Remote monitoring capability',
    'Technical support and access to educational materials (video instructions and documentation)',
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', overflow: 'hidden' }}>
      
      {/* SECTION 1: HERO SECTION (From Screenshot 1) */}
      <Box sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 8, md: 12 }, px: { xs: 2, md: 6 }, background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            
            {/* Hero Left Text */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                
                <Typography
                  variant="h1"
                  sx={{
                    color: '#0f172a',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.8rem' },
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    mb: 3,
                  }}
                >
                  Cardio.AI – Certified Medical Software Device
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#475569',
                    fontSize: '1.25rem',
                    lineHeight: 1.7,
                    mb: 5,
                    maxWidth: 540,
                  }}
                >
                  Automatic annotation and interpretation of ECG recordings of any lead configuration and duration of up to 35 days
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    component="a"
                    href="#contact"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: '#25a27b',
                      color: '#ffffff',
                      fontWeight: 700,
                      px: 4,
                      py: 1.6,
                      fontSize: '1.05rem',
                      borderRadius: '9999px',
                      boxShadow: '0 8px 25px rgba(37, 162, 123, 0.3)',
                      '&:hover': {
                        backgroundColor: '#1b7d5e',
                      },
                    }}
                  >
                    Contact us
                  </Button>

                  <Button
                    component={Link}
                    to="/predict"
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderColor: '#cbd5e1',
                      color: '#0f172a',
                      fontWeight: 700,
                      px: 3.5,
                      py: 1.5,
                      fontSize: '1.05rem',
                      borderRadius: '9999px',
                      '&:hover': {
                        borderColor: '#25a27b',
                        backgroundColor: '#e6f7f0',
                      },
                    }}
                  >
                    Try Cardio Predict
                  </Button>
                </Box>

              </motion.div>
            </Grid>

            {/* Hero Right Visual: Laptop displaying ECG software */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 6,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                      boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <img
                      src="/images/cardio_laptop_ecg.jpg"
                      alt="Cardio.AI ECG Software Laptop Interface"
                      style={{
                        width: '100%',
                        borderRadius: 20,
                        display: 'block',
                        objectFit: 'cover',
                      }}
                    />
                  </Paper>
                </Box>
              </motion.div>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* SECTION 2: 3 PLATFORM CARDS (From Screenshot 2) */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          
          {/* Card 1: Cardio.AI Platform (Mint background) */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 250 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  backgroundColor: '#e6f7f0',
                  borderRadius: 6,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: 'none',
                }}
              >
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ height: 160, overflow: 'hidden', borderRadius: 4, mb: 3 }}>
                    <img src="/images/predict_ecg_telemetry.jpg" alt="Cardio Platform" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                    Cardio.AI Platform
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.7, mb: 4 }}>
                    State-of-the-art ECG analytics technology. Extended ECG analysis as a service for your precise diagnostic assessment – fast, reliable, simple!
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    component={Link}
                    to="/predict"
                    variant="contained"
                    sx={{
                      backgroundColor: '#25a27b',
                      color: '#ffffff',
                      fontWeight: 700,
                      px: 3.5,
                      py: 1.2,
                      borderRadius: '9999px',
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: '#1b7d5e' },
                    }}
                  >
                    Read more
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>

          {/* Card 2: Cardiac Service (Cream background) */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 250 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  backgroundColor: '#fdfbf7',
                  borderRadius: 6,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: 'none',
                }}
              >
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ height: 160, overflow: 'hidden', borderRadius: 4, mb: 3 }}>
                    <img src="/images/predict_clinical_report.jpg" alt="Cardiac Service" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                    Cardiac Service
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.7, mb: 4 }}>
                    Complete remote monitoring solution, we thought of everything end to end so that you can focus on your patients — and on building a world-class cardiovascular program
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    component={Link}
                    to="/health"
                    variant="contained"
                    sx={{
                      backgroundColor: '#25a27b',
                      color: '#ffffff',
                      fontWeight: 700,
                      px: 3.5,
                      py: 1.2,
                      borderRadius: '9999px',
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: '#1b7d5e' },
                    }}
                  >
                    Read more
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>

          {/* Card 3: Cases (White background with border) */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 250 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: 6,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ height: 160, overflow: 'hidden', borderRadius: 4, mb: 3 }}>
                    <img src="/images/predict_ai_neural.jpg" alt="Cases" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                    Cases & Evidence
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.7, mb: 4 }}>
                    Explore the comprehensive details of our successful initiation of multiple pilot projects in the realm of remote online monitoring.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    component={Link}
                    to="/health#faq"
                    variant="contained"
                    sx={{
                      backgroundColor: '#e6f7f0',
                      color: '#25a27b',
                      fontWeight: 700,
                      px: 3.5,
                      py: 1.2,
                      borderRadius: '9999px',
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: '#d1f2e4' },
                    }}
                  >
                    Read more
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>

        </Grid>
      </Container>

      {/* SECTION 3: DARK 3D HEART ECG ANALYTICS BANNER (From Screenshot 3) */}
      <Box sx={{ background: 'linear-gradient(135deg, #0b1520 0%, #112233 100%)', color: '#ffffff', py: { xs: 8, md: 12 }, px: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)', px: 2, py: 0.5, borderRadius: 9999, mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 600 }}>Web platform</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: '#ffffff', fontWeight: 800, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
                State-of-the-art ECG analytics technology
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.8, mb: 5, maxWidth: 500 }}>
                Extended ECG analysis as a service for your precise diagnostic assessment – fast, reliable, simple!
              </Typography>
              <Button
                component={Link}
                to="/predict"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#25a27b',
                  color: '#ffffff',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 9999,
                  '&:hover': { backgroundColor: '#1b7d5e' },
                }}
              >
                Try it for free
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', textAlign: 'center' }}>
                <img
                  src="/images/predict_ai_neural.jpg"
                  alt="3D Holographic Heart Scanning"
                  style={{ width: '100%', borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 4: BENEFITS FOR CLINICS (From Screenshot 4) */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 14 } }}>
        <Grid container spacing={8} alignItems="center">
          
          {/* Left: Doctors Team Photo with Floating Green Badge */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <img
                src="/images/clinic_doctors_team.jpg"
                alt="Clinic Doctors Team"
                style={{ width: '100%', borderRadius: 28, display: 'block', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              />

              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: 20,
                  right: 20,
                  backgroundColor: '#25a27b',
                  color: '#ffffff',
                  p: 3,
                  borderRadius: 5,
                  boxShadow: '0 15px 30px rgba(37, 162, 123, 0.3)',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 700, lineHeight: 1.5 }}>
                  Comprehensive Long-term ECG Monitoring: Convenient, Maintenance-Free, and Fast Reporting with 24/7 Access
                </Typography>
              </Paper>
            </Box>
          </Grid>

          {/* Right: Bullet List & Controls */}
          <Grid item xs={12} md={6} sx={{ pt: { xs: 6, md: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setSlideIndex((prev) => (prev === 0 ? 1 : 0))}
                  sx={{ border: '1px solid #cbd5e1', borderRadius: '50%' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setSlideIndex((prev) => (prev === 0 ? 1 : 0))}
                  sx={{ border: '1px solid #cbd5e1', borderRadius: '50%' }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
              <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700 }}>
                01/02
              </Typography>
            </Box>

            <Typography variant="h2" sx={{ color: '#0f172a', fontWeight: 800, mb: 4 }}>
              Benefits For Clinics
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
              {clinicBenefits.map((benefit, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: '#25a27b', fontSize: 20, mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body1" sx={{ color: '#334155', fontWeight: 500, lineHeight: 1.6 }}>
                    {benefit}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              component="a"
              href="#contact"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#25a27b',
                color: '#ffffff',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 9999,
                '&:hover': { backgroundColor: '#1b7d5e' },
              }}
            >
              Contact Us
            </Button>
          </Grid>

        </Grid>
      </Container>

      {/* SECTION 5: CARDIAC ANALYSIS SERVICES INCLUDE (From Screenshot 5) */}
      <Box sx={{ backgroundColor: '#fafafa', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ color: '#0f172a', fontWeight: 800, mb: 6, textAlign: 'center' }}>
            Cardiac Analysis Services include:
          </Typography>

          <Grid container spacing={4}>
            
            {/* Service 1 */}
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ height: '100%', borderRadius: 6, border: '1px solid rgba(0,0,0,0.06)', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ height: 180, overflow: 'hidden', borderRadius: 4, mb: 3 }}>
                    <img src="/images/cardio_laptop_ecg.jpg" alt="Setup Healthcare Service" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                    Set up the New Healthcare Service
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                    Full support in launching the end-to-end remote cardiac analysis service in the clinic, from staff training, access to all training materials and consumables (ECG biosensors), and further technical support and consulting.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Service 2 */}
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ height: '100%', borderRadius: 6, border: '1px solid rgba(0,0,0,0.06)', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ height: 180, overflow: 'hidden', borderRadius: 4, mb: 3 }}>
                    <img src="/images/cardiac_biosensor.jpg" alt="Single Use ECG Biosensor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                    Single Use ECG Biosensor
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                    We provide the LifeSignals 2-Channel ECG Wearable Biosensor, a clinical-grade device that is certificated and designed for the collection of data up to 7 days. Supports identification of arrhythmias enabling high-quality data.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Service 3 */}
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ height: '100%', borderRadius: 6, border: '1px solid rgba(0,0,0,0.06)', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ height: 180, overflow: 'hidden', borderRadius: 4, mb: 3 }}>
                    <img src="/images/predict_clinical_report.jpg" alt="High Quality Analysis Report" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                    High-Quality Analysis Report
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7, mb: 3 }}>
                    Full decoding of the ECG recording, verification by cardiac technicians, and provision of a comprehensive assessment report to the doctor, including full access to raw ECG signal.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    component={Link}
                    to="/predict"
                    variant="contained"
                    sx={{
                      backgroundColor: '#25a27b',
                      color: '#ffffff',
                      fontWeight: 700,
                      px: 3.5,
                      py: 1.2,
                      borderRadius: '9999px',
                      '&:hover': { backgroundColor: '#1b7d5e' },
                    }}
                  >
                    Get report
                  </Button>
                </Box>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* SECTION 6: CONTACT US SECTION */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />

    </Box>
  );
}
