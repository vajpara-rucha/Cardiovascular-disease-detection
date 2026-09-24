import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalculateIcon from '@mui/icons-material/Calculate';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function HealthGuide() {
  // BMI & Target Heart Rate Calculator State
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [ageYears, setAgeYears] = useState('45');
  const [calcResult, setCalcResult] = useState(null);

  const calculateHealthMetrics = (e) => {
    e.preventDefault();
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm) / 100;
    const a = parseFloat(ageYears);

    if (w > 0 && h > 0 && a > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      const maxHr = 220 - a;
      const targetMin = Math.round(maxHr * 0.5);
      const targetMax = Math.round(maxHr * 0.85);

      let bmiCategory = 'Normal Weight';
      let bmiColor = '#25a27b';
      if (bmi < 18.5) { bmiCategory = 'Underweight'; bmiColor = '#3b82f6'; }
      else if (bmi >= 25 && bmi < 30) { bmiCategory = 'Overweight'; bmiColor = '#f59e0b'; }
      else if (bmi >= 30) { bmiCategory = 'Obese'; bmiColor = '#ef4444'; }

      setCalcResult({ bmi, bmiCategory, bmiColor, maxHr, targetMin, targetMax });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: { xs: 6, md: 8 } }}>
      
      {/* Hero Banner */}
      <Box sx={{ background: 'linear-gradient(135deg, #0b1520 0%, #172a3a 100%)', color: '#ffffff', py: { xs: 8, md: 10 }, px: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 9999, backgroundColor: 'rgba(37, 162, 123, 0.2)', color: '#3fc397', mb: 3 }}>
                <HealthAndSafetyIcon fontSize="small" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                  CARDIOVASCULAR HEALTH EDUCATION
                </Typography>
              </Box>

              <Typography variant="h1" sx={{ color: '#ffffff', fontWeight: 800, mb: 3 }}>
                Understanding Heart Risk & Preventive Cardiology
              </Typography>

              <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.8, mb: 4, maxWidth: 600 }}>
                Learn how lifestyle choices, blood pressure, cholesterol levels, and continuous telemetry monitoring protect your long-term heart health.
              </Typography>

              <Button
                component={Link}
                to="/predict"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
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
                Assess Your Heart Risk Now
              </Button>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <img
                  src="/images/predict_ai_neural.jpg"
                  alt="Heart Health Scanning"
                  style={{ width: '100%', borderRadius: 16, objectFit: 'cover', height: 260 }}
                />
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MonitorHeartIcon sx={{ color: '#25a27b' }} />
                  <Typography variant="subtitle2" sx={{ color: '#e2e8f0', fontWeight: 700 }}>
                    AI-Driven Diagnostic Insights
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 4 Pillars Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ color: '#0f172a', fontWeight: 800, mb: 2 }}>
            4 Core Pillars of Cardiovascular Prevention
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 650, mx: 'auto', fontSize: '1.1rem' }}>
            Cardiovascular diseases remain the leading global cause of mortality, yet up to 80% of heart attacks and strokes are preventable.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              title: 'Heart-Healthy Nutrition',
              icon: <RestaurantIcon sx={{ fontSize: 36, color: '#25a27b' }} />,
              bg: '#e6f7f0',
              text: 'Emphasize leafy greens, whole grains, omega-3 rich fish, and olive oil while reducing sodium intake under 2,000 mg daily.',
            },
            {
              title: 'Regular Aerobic Exercise',
              icon: <FitnessCenterIcon sx={{ fontSize: 36, color: '#0284c7' }} />,
              bg: '#e0f2fe',
              text: 'Engage in at least 150 minutes of moderate-intensity aerobic physical activity per week to improve vascular elastic resilience.',
            },
            {
              title: 'Quality Sleep & Stress Management',
              icon: <BedtimeIcon sx={{ fontSize: 36, color: '#8b5cf6' }} />,
              bg: '#f3e8ff',
              text: 'Aim for 7-9 hours of restful sleep every night. Chronic mental stress elevates cortisol and resting blood pressure.',
            },
            {
              title: 'Routine Health Screenings',
              icon: <FavoriteIcon sx={{ fontSize: 36, color: '#ef4444' }} />,
              bg: '#ffe4e6',
              text: 'Regularly measure systolic/diastolic blood pressure, fasting lipid panel, and blood glucose with your physician.',
            },
          ].map((pillar, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 250 }}>
                <Card sx={{ height: '100%', borderRadius: 5, border: '1px solid rgba(0,0,0,0.06)', p: 1 }}>
                  <CardContent>
                    <Box sx={{ width: 64, height: 64, borderRadius: 4, backgroundColor: pillar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                      {pillar.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.5 }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                      {pillar.text}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Interactive Health Metric Calculator */}
        <Box sx={{ mt: 10 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 6,
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <CalculateIcon sx={{ color: '#25a27b', fontSize: 32 }} />
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    Quick Health Metric Calculator
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 4, lineHeight: 1.7 }}>
                  Calculate your Body Mass Index (BMI) and recommended Target Exercise Heart Rate Zone based on your age and physical parameters.
                </Typography>

                <form onSubmit={calculateHealthMetrics}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Age (years)"
                        type="number"
                        value={ageYears}
                        onChange={(e) => setAgeYears(e.target.value)}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Height (cm)"
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Weight (kg)"
                        type="number"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: '#25a27b',
                          fontWeight: 700,
                          py: 1.2,
                          px: 4,
                          borderRadius: 9999,
                          '&:hover': { backgroundColor: '#1b7d5e' },
                        }}
                      >
                        Calculate My Metrics
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>

              <Grid item xs={12} md={6}>
                {calcResult ? (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 5,
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <Typography variant="overline" sx={{ fontWeight: 800, color: '#64748b' }}>
                      YOUR CALCULATED RESULTS
                    </Typography>
                    
                    <Box sx={{ my: 2, display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <Typography variant="h2" sx={{ fontWeight: 900, color: calcResult.bmiColor }}>
                        {calcResult.bmi}
                      </Typography>
                      <Chip
                        label={calcResult.bmiCategory}
                        sx={{
                          backgroundColor: `${calcResult.bmiColor}15`,
                          color: calcResult.bmiColor,
                          fontWeight: 800,
                          fontSize: '0.9rem',
                        }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                      Heart Rate Metrics:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569', mb: 0.5 }}>
                      • Estimated Max Heart Rate: <strong>{calcResult.maxHr} BPM</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      • Target Aerobic Exercise Zone (50-85%): <strong>{calcResult.targetMin} - {calcResult.targetMax} BPM</strong>
                    </Typography>
                  </Paper>
                ) : (
                  <Box sx={{ p: 4, textAlign: 'center', borderRadius: 5, border: '2px dashed #cbd5e1' }}>
                    <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 600 }}>
                      Enter your parameters and click "Calculate My Metrics" to view your BMI and heart rate training zones.
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* FAQs */}
        <Box id="faq" sx={{ mt: 10 }}>
          <Typography variant="h3" sx={{ color: '#0f172a', fontWeight: 800, mb: 4, textAlign: 'center' }}>
            Frequently Asked Questions on Cardiac Health
          </Typography>

          {[
            {
              q: 'What is Cardiovascular Disease (CVD)?',
              a: 'Cardiovascular disease refers to a group of disorders of the heart and blood vessels, including coronary heart disease, cerebrovascular disease, rheumatic heart disease, and peripheral arterial disease.',
            },
            {
              q: 'How does the Cardio.AI Machine Learning Predictor work?',
              a: 'Cardio.AI uses a clinical machine learning model (such as Decision Tree / XGBoost) trained on 70,000 patient records to analyze key risk indicators like age, blood pressure, cholesterol, glucose, smoking status, and physical activity level.',
            },
            {
              q: 'What are normal Blood Pressure readings?',
              a: 'Normal blood pressure is generally defined as Systolic under 120 mmHg and Diastolic under 80 mmHg. Readings consistently above 130/80 mmHg indicate hypertension and require lifestyle modifications or clinical review.',
            },
            {
              q: 'How long can the wearable ECG biosensor monitor?',
              a: 'The LifeSignals 2-Channel wearable biosensor patch allows continuous wireless ECG telemetry monitoring for 3 to 7 days up to 35 days, providing high-precision arrhythmia detection.',
            },
          ].map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, borderRadius: 3, '&:before': { display: 'none' }, boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

      </Container>

      {/* Contact Us Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

    </Box>
  );
}
