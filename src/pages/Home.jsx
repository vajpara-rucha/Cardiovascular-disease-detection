import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

// Material Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import TimelineIcon from '@mui/icons-material/Timeline';
import DatasetIcon from '@mui/icons-material/Dataset';

const HERO = {
  eyebrow: 'AI-Powered Health Intelligence',
  headline: ['Next-Generation', 'Cardiovascular', 'Risk Assessment'],
  body: 'A focused, dark-themed workspace for evaluating cardiovascular disease risk using a transparent machine-learning model and actionable metrics.',
  primaryCta: 'Start Evaluation',
  primaryTo: '/predict',
  secondaryCta: 'Explore Methodology',
  secondaryTo: '/about',
};

const STATS = [
  { value: '99.9%', label: 'Uptime' },
  { value: '70K+', label: 'Training Data Records' },
  { value: '< 200ms', label: 'Inference Speed' },
];

const FEATURES = [
  {
    title: 'Advanced Analytics',
    body: 'Deep neural evaluation of demographic, vital-sign, and lifestyle data.',
    icon: <AutoGraphIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Real-time Signal',
    body: 'Lightning-fast form inputs yield real-time model predictions and probabilities.',
    icon: <SpeedIcon fontSize="large" color="secondary" />,
  },
  {
    title: 'Secure & Transparent',
    body: 'Every risk calculation is fully auditable, offering clear insights.',
    icon: <SecurityIcon fontSize="large" sx={{ color: '#818cf8' }} />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      staggerChildren: 0.2,
      ease: "easeOut"
    } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden', position: 'relative', pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 }, px: { xs: 2, md: 6 } }}>
      
      {/* Background Decorative Elements */}
      <Box sx={{
        position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0, filter: 'blur(60px)', borderRadius: '50%'
      }} />
      <Box sx={{
        position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0, filter: 'blur(80px)', borderRadius: '50%'
      }} />

      <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          
          <Grid container spacing={6} alignItems="center" justifyContent="space-between">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, p: 1, pr: 2, borderRadius: '999px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <MonitorHeartIcon sx={{ color: '#818cf8', ml: 1 }} />
                  <Typography variant="subtitle2" sx={{ color: '#818cf8', fontWeight: 700, letterSpacing: 1.5 }}>
                    {HERO.eyebrow}
                  </Typography>
                </Box>
                
                <Typography variant="h1" sx={{ mb: 3, fontWeight: 900, background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {HERO.headline[0]} <br />
                  <span style={{ color: '#6366f1', WebkitTextFillColor: 'initial', textShadow: '0 0 30px rgba(99,102,241,0.5)' }}>{HERO.headline[1]}</span> <br />
                  {HERO.headline[2]}
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, fontSize: '1.2rem', maxWidth: 500, lineHeight: 1.8 }}>
                  {HERO.body}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 8 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      component={Link}
                      to={HERO.primaryTo}
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
                    >
                      {HERO.primaryCta}
                    </Button>
                  </motion.div>
                  <Button
                    component={Link}
                    to={HERO.secondaryTo}
                    variant="text"
                    size="large"
                    sx={{ color: '#9ca3af', '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.05)' } }}
                  >
                    {HERO.secondaryCta}
                  </Button>
                </Box>

                <Grid container spacing={4}>
                  {STATS.map((stat, i) => (
                    <Grid item key={i}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>{stat.value}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{stat.label}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>

            {/* Right Visual Dashboard instead of 3D Model */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants} whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card sx={{ 
                  background: 'rgba(17, 24, 39, 0.6)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.2)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ w: 10, h: 10, borderRadius: '50%', bgcolor: '#ef4444', width: 12, height: 12 }} />
                    <Box sx={{ w: 10, h: 10, borderRadius: '50%', bgcolor: '#eab308', width: 12, height: 12 }} />
                    <Box sx={{ w: 10, h: 10, borderRadius: '50%', bgcolor: '#22c55e', width: 12, height: 12 }} />
                    <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary', fontWeight: 600 }}>System Status: Active Evaluation</Typography>
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                      <Box>
                        <Typography variant="overline" sx={{ color: '#14b8a6' }}>Risk Probability</Typography>
                        <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800 }}>87.4%</Typography>
                      </Box>
                      <TimelineIcon sx={{ fontSize: 60, color: '#6366f1', opacity: 0.8 }} />
                    </Box>
                    <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.05)' }} />
                    <Grid container spacing={2}>
                      {[
                        { label: 'Patient Age', val: '54 yrs', icon: <DatasetIcon /> },
                        { label: 'Systolic BP', val: '142 mmHg', icon: <DatasetIcon /> },
                        { label: 'Cholesterol', val: '235 mg/dL', icon: <DatasetIcon /> }
                      ].map((item, i) => (
                        <Grid item xs={12} key={i}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, borderRadius: 2, background: 'rgba(255,255,255,0.03)' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
                              {item.icon} {item.label}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{item.val}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

          </Grid>

          <Box sx={{ mt: { xs: 10, md: 16 } }}>
            <Grid container spacing={4}>
              {FEATURES.map((feat, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }}>
                    <Card sx={{ height: '100%', p: 3, background: 'linear-gradient(180deg, rgba(31, 41, 55, 0.4) 0%, rgba(17, 24, 39, 0.4) 100%)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <Box sx={{ mb: 2, p: 2, display: 'inline-block', borderRadius: 3, background: 'rgba(255,255,255,0.05)' }}>
                        {feat.icon}
                      </Box>
                      <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>
                        {feat.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {feat.body}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
          
        </motion.div>
      </Box>
    </Box>
  );
}
