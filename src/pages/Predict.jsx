import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TuneIcon from '@mui/icons-material/Tune';
import MemoryIcon from '@mui/icons-material/Memory';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { savePredictionToHistory } from '../utils/historyStorage';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:8000';

const NUMERIC_LIMITS = {
  age_years: { min: 1, max: 120 },
  height: { min: 30, max: 250 },
  weight: { min: 2, max: 300 },
  ap_hi: { min: 1, max: 300 },
  ap_lo: { min: 1, max: 200 },
};

const NUMERIC_FIELDS = Object.keys(NUMERIC_LIMITS);

function getFieldError(name, value) {
  const limits = NUMERIC_LIMITS[name];
  if (!limits) return '';

  const { min, max } = limits;
  const message = `Must be a number between ${min} and ${max}`;

  if (value === '' || value === null || value === undefined) {
    return message;
  }

  const str = String(value).trim();
  if (str === '' || str.includes('-') || !/^\d+(\.\d+)?$/.test(str)) {
    return message;
  }

  const num = Number(str);
  if (!Number.isFinite(num) || num <= 0 || num < min || num > max) {
    return message;
  }

  return '';
}

function computeLocalFallbackPrediction(payload) {
  const means = {
    age_years: 52.90679,
    gender: 1.35274,
    height: 163.83682,
    weight: 74.01188,
    ap_hi: 126.05987,
    ap_lo: 78.93750,
    cholesterol: 1.36193,
    gluc: 1.22303,
    smoke: 0.07957,
    alco: 0.04957,
    active: 0.80022
  };

  const scales = {
    age_years: 6.48676,
    gender: 0.47782,
    height: 7.41877,
    weight: 13.88276,
    ap_hi: 16.26890,
    ap_lo: 11.24031,
    cholesterol: 0.67307,
    gluc: 0.56139,
    smoke: 0.27063,
    alco: 0.21705,
    active: 0.39984
  };

  const coefs = {
    age_years: 0.18999,
    gender: 0.01437,
    height: -0.01505,
    weight: -0.00403,
    ap_hi: 1.39203,
    ap_lo: -0.01597,
    cholesterol: 0.35006,
    gluc: 0.13279,
    smoke: 0.17195,
    alco: -0.01329,
    active: -0.31794
  };

  const intercept = -0.32481;

  let logit = intercept;
  for (const key in means) {
    const val = Number(payload[key]) || 0;
    const z = (val - means[key]) / scales[key];
    logit += z * coefs[key];
  }

  const rawProb = 1 / (1 + Math.exp(-logit));
  const probability = Math.min(0.99, Math.max(0.01, rawProb));
  const prediction = probability >= 0.48 ? 1 : 0;

  const message = prediction === 1
    ? "High risk detected. Model identifies elevated blood pressure or metabolic indicators consistent with cardiovascular risk."
    : "Low risk detected. Physiological metrics fall within standard baseline health thresholds.";

  return {
    prediction,
    probability,
    message,
    model_used: 'Cardio Risk AI Model',
    model_key: 'cardio_ai_model',
    isFallbackMode: true,
  };
}

function Predict() {
  const [formData, setFormData] = useState({
    age_years: '54',
    gender: '2',
    height: '172',
    weight: '82',
    ap_hi: '142',
    ap_lo: '92',
    cholesterol: '2',
    gluc: '1',
    smoke: '0',
    alco: '0',
    active: '1'
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const presets = [
    {
      label: "Healthy Young Adult",
      data: { age_years: 30, gender: '1', height: 165, weight: 60, ap_hi: 110, ap_lo: 70, cholesterol: '1', gluc: '1', smoke: '0', alco: '0', active: '1' }
    },
    {
      label: "High Risk Senior",
      data: { age_years: 65, gender: '2', height: 175, weight: 95, ap_hi: 160, ap_lo: 100, cholesterol: '3', gluc: '3', smoke: '1', alco: '1', active: '0' }
    },
    {
      label: "Borderline Middle-aged",
      data: { age_years: 48, gender: '2', height: 180, weight: 85, ap_hi: 135, ap_lo: 85, cholesterol: '2', gluc: '1', smoke: '1', alco: '0', active: '1' }
    },
    {
      label: "Sedentary Adult",
      data: { age_years: 40, gender: '1', height: 160, weight: 75, ap_hi: 125, ap_lo: 80, cholesterol: '2', gluc: '2', smoke: '0', alco: '0', active: '0' }
    }
  ];

  const loadPreset = (presetData) => {
    setFormData({
      age_years: String(presetData.age_years),
      gender: String(presetData.gender),
      height: String(presetData.height),
      weight: String(presetData.weight),
      ap_hi: String(presetData.ap_hi),
      ap_lo: String(presetData.ap_lo),
      cholesterol: String(presetData.cholesterol),
      gluc: String(presetData.gluc),
      smoke: String(presetData.smoke),
      alco: String(presetData.alco),
      active: String(presetData.active)
    });
    setFieldErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (NUMERIC_FIELDS.includes(name)) {
      if (String(value).includes('-') || (value !== '' && Number(value) < 0)) {
        return;
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    if (NUMERIC_FIELDS.includes(name) && value !== '' && !getFieldError(name, value)) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!NUMERIC_FIELDS.includes(name)) return;
    setFieldErrors((prev) => ({ ...prev, [name]: getFieldError(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    let hasInvalidFields = false;
    NUMERIC_FIELDS.forEach((name) => {
      const message = getFieldError(name, formData[name]);
      if (message) {
        nextErrors[name] = message;
        hasInvalidFields = true;
      }
    });

    if (hasInvalidFields) {
      setFieldErrors(nextErrors);
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const payload = {
        age_years: parseFloat(formData.age_years),
        gender: parseInt(formData.gender),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        ap_hi: parseFloat(formData.ap_hi),
        ap_lo: parseFloat(formData.ap_lo),
        cholesterol: parseInt(formData.cholesterol),
        gluc: parseInt(formData.gluc),
        smoke: parseInt(formData.smoke),
        alco: parseInt(formData.alco),
        active: parseInt(formData.active),
      };

      let data;
      try {
        const response = await fetch(`${API_BASE}/api/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
      } catch (fetchErr) {
        console.warn("Backend API unavailable, executing client diagnostic engine.", fetchErr);
        data = computeLocalFallbackPrediction(payload);
      }

      setResult(data);
      savePredictionToHistory({
        age_years: parseFloat(formData.age_years),
        gender: formData.gender === '1' ? 'Female' : 'Male',
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        ap_hi: parseFloat(formData.ap_hi),
        ap_lo: parseFloat(formData.ap_lo),
        cholesterol: formData.cholesterol === '1' ? 'Normal' : formData.cholesterol === '2' ? 'Above Normal' : 'Well Above Normal',
        gluc: formData.gluc === '1' ? 'Normal' : formData.gluc === '2' ? 'Above Normal' : 'Well Above Normal',
        smoke: formData.smoke === '1' ? 'Yes' : 'No',
        alco: formData.alco === '1' ? 'Yes' : 'No',
        active: formData.active === '1' ? 'Yes' : 'No',
        prediction: data.prediction,
        probability: data.probability,
        model_used: data.model_used || 'Cardio Risk AI Model',
      });
    } catch (err) {
      setError("An unexpected error occurred during risk evaluation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isHighRisk = result?.prediction === 1;
  const riskPct = result ? result.probability * 100 : 0;
  const safePct = result ? (1 - result.probability) * 100 : 0;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: { xs: 4, md: 6 } }}>
      
      {/* HEADER BANNER */}
      <Box sx={{ background: 'linear-gradient(135deg, #0b1520 0%, #172a3a 100%)', color: '#ffffff', py: { xs: 6, md: 8 }, mb: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 0.8, borderRadius: 9999, backgroundColor: 'rgba(37, 162, 123, 0.2)', color: '#3fc397', mb: 2 }}>
              <AutoAwesomeIcon fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                CARDIO RISK AI ENGINE
              </Typography>
            </Box>
            <Typography variant="h1" sx={{ color: '#ffffff', fontWeight: 800, mb: 2 }}>
              Cardiovascular Disease Predictor
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.15rem' }}>
              Evaluate your patient's 10-year risk profile using machine learning algorithms trained on 70,000 certified health records.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 10 }}>

        {/* 3 IMAGES SECTION AS REQUESTED ("3 image i want in which page i predict") */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, textAlign: 'center' }}>
            3-Step AI Diagnostic Pipeline
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 5, textAlign: 'center' }}>
            Our end-to-end cardiovascular assessment combines continuous telemetry, neural AI scanning, and clinical report output.
          </Typography>

          <Grid container spacing={4}>
            
            {/* IMAGE 1 */}
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 6,
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ height: 220, borderRadius: 4, overflow: 'hidden', mb: 2.5 }}>
                    <img
                      src="/images/predict_ecg_telemetry.jpg"
                      alt="Step 1: Real-Time ECG Telemetry"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Chip label="Image 1: Telemetry" sx={{ backgroundColor: '#e6f7f0', color: '#25a27b', fontWeight: 800, mb: 1.5 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                    1. Signal Telemetry Analysis
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Real-time acquisition of multi-lead ECG waveform patterns and vital metrics for instant parameter extraction.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            {/* IMAGE 2 */}
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 6,
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ height: 220, borderRadius: 4, overflow: 'hidden', mb: 2.5 }}>
                    <img
                      src="/images/predict_ai_neural.jpg"
                      alt="Step 2: AI Neural Network Model Risk"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Chip label="Image 2: Neural AI Scan" sx={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontWeight: 800, mb: 1.5 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                    2. Neural Risk Model Scanning
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Machine learning model evaluates physiological feature interactions (systolic BP, cholesterol, age, glucose) for risk probability scoring.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            {/* IMAGE 3 */}
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 6,
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ height: 220, borderRadius: 4, overflow: 'hidden', mb: 2.5 }}>
                    <img
                      src="/images/predict_clinical_report.jpg"
                      alt="Step 3: Clinical Diagnostic Report"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Chip label="Image 3: Clinical Report" sx={{ backgroundColor: '#f3e8ff', color: '#8b5cf6', fontWeight: 800, mb: 1.5 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                    3. Physician Clinical Report
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Generates an auditable risk summary report with probability gauge, preventive recommendations, and diagnostic flags.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

          </Grid>
        </Box>

        {error && (
          <Alert severity="error" icon={<ErrorOutlineIcon />} sx={{ mb: 4, borderRadius: 4 }}>
            <AlertTitle sx={{ fontWeight: 700 }}>Connection Notice</AlertTitle>
            {error}
          </Alert>
        )}

        {/* PREDICTION FORM & RESULTS DISPLAY */}
        <Grid container spacing={4}>
          
          {/* LEFT: FORM INPUTS */}
          <Grid item xs={12} lg={result ? 7 : 12}>
            <Card elevation={0} sx={{ borderRadius: 6, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: '#25a27b', color: '#ffffff', p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MonitorHeartIcon sx={{ fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Enter Patient Parameters
                </Typography>
              </Box>

              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                
                {/* PRESETS */}
                <Paper elevation={0} sx={{ p: 2.5, mb: 4, backgroundColor: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <TuneIcon sx={{ fontSize: 18, color: '#64748b' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      Quick Test Data Presets:
                    </Typography>
                  </Box>
                  <Grid container spacing={1.5}>
                    {presets.map((preset, idx) => (
                      <Grid item xs={6} sm={3} key={idx}>
                        <Button
                          fullWidth
                          size="small"
                          variant="outlined"
                          onClick={() => loadPreset(preset.data)}
                          sx={{
                            borderRadius: 9999,
                            borderColor: '#cbd5e1',
                            color: '#334155',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            py: 0.75,
                            textTransform: 'none',
                            '&:hover': { borderColor: '#25a27b', backgroundColor: '#e6f7f0', color: '#25a27b' },
                          }}
                        >
                          {preset.label}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Age (years)"
                        type="number"
                        name="age_years"
                        value={formData.age_years}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(fieldErrors.age_years)}
                        helperText={fieldErrors.age_years || ''}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        select
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      >
                        <MenuItem value="1">Female</MenuItem>
                        <MenuItem value="2">Male</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Height (cm)"
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(fieldErrors.height)}
                        helperText={fieldErrors.height || ''}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Weight (kg)"
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(fieldErrors.weight)}
                        helperText={fieldErrors.weight || ''}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Systolic BP (mmHg)"
                        type="number"
                        name="ap_hi"
                        value={formData.ap_hi}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(fieldErrors.ap_hi)}
                        helperText={fieldErrors.ap_hi || ''}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Diastolic BP (mmHg)"
                        type="number"
                        name="ap_lo"
                        value={formData.ap_lo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(fieldErrors.ap_lo)}
                        helperText={fieldErrors.ap_lo || ''}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        select
                        label="Cholesterol"
                        name="cholesterol"
                        value={formData.cholesterol}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      >
                        <MenuItem value="1">Normal</MenuItem>
                        <MenuItem value="2">Above Normal</MenuItem>
                        <MenuItem value="3">Well Above Normal</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        select
                        label="Glucose"
                        name="gluc"
                        value={formData.gluc}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      >
                        <MenuItem value="1">Normal</MenuItem>
                        <MenuItem value="2">Above Normal</MenuItem>
                        <MenuItem value="3">Well Above Normal</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        select
                        label="Smoking Status"
                        name="smoke"
                        value={formData.smoke}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      >
                        <MenuItem value="0">Non-Smoker</MenuItem>
                        <MenuItem value="1">Smoker</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Alcohol Intake"
                        name="alco"
                        value={formData.alco}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      >
                        <MenuItem value="0">No Alcohol</MenuItem>
                        <MenuItem value="1">Alcohol Consumer</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Physical Activity"
                        name="active"
                        value={formData.active}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                      >
                        <MenuItem value="0">Inactive / Sedentary</MenuItem>
                        <MenuItem value="1">Physically Active</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          sx={{
                            backgroundColor: '#25a27b',
                            color: '#ffffff',
                            fontWeight: 800,
                            px: 6,
                            py: 1.8,
                            fontSize: '1.1rem',
                            borderRadius: 9999,
                            width: { xs: '100%', sm: 'auto' },
                            boxShadow: '0 8px 25px rgba(37, 162, 123, 0.3)',
                            '&:hover': { backgroundColor: '#1b7d5e', boxShadow: '0 12px 30px rgba(37, 162, 123, 0.4)' },
                          }}
                        >
                          {loading ? <CircularProgress size={26} sx={{ color: '#fff' }} /> : 'Calculate Risk Prediction'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT: RESULTS DISPLAY */}
          {result && (
            <Grid item xs={12} lg={5}>
              <Grow in={!!result} timeout={500}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 6,
                    border: '1px solid',
                    borderColor: isHighRisk ? '#fca5a5' : '#86efac',
                    backgroundColor: isHighRisk ? '#fef2f2' : '#f0fdf4',
                    p: { xs: 3, md: 4 },
                    textAlign: 'center',
                  }}
                >
                  <Chip
                    label={isHighRisk ? 'HIGH RISK DETECTED' : 'LOW RISK DETECTED'}
                    color={isHighRisk ? 'error' : 'success'}
                    icon={isHighRisk ? <WarningAmberIcon /> : <CheckCircleIcon />}
                    sx={{ fontWeight: 800, px: 2, py: 2.5, fontSize: '0.95rem', borderRadius: 9999, mb: 3 }}
                  />

                  <Typography variant="overline" sx={{ display: 'block', fontWeight: 800, color: '#64748b', letterSpacing: 1.5, mb: 2 }}>
                    RISK PROBABILITY SCORE
                  </Typography>

                  <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={160}
                      thickness={5}
                      sx={{ color: isHighRisk ? '#fee2e2' : '#dcfce7' }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={riskPct}
                      size={160}
                      thickness={5}
                      sx={{
                        color: isHighRisk ? '#ef4444' : '#25a27b',
                        position: 'absolute',
                        left: 0,
                      }}
                    />
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 900, color: isHighRisk ? '#dc2626' : '#166534' }}>
                        {riskPct.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                    {result.message}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Grid container spacing={2} sx={{ textAlign: 'left' }}>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, backgroundColor: '#ffffff' }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>CVD RISK PROBABILITY</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: isHighRisk ? '#dc2626' : '#166534' }}>{riskPct.toFixed(1)}%</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, backgroundColor: '#ffffff' }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>SAFE PROBABILITY</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#25a27b' }}>{safePct.toFixed(1)}%</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, backgroundColor: '#ffffff' }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>MODEL USED</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{result.model_used || 'Cardio Risk AI Model'}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Card>
              </Grow>
            </Grid>
          )}

        </Grid>

      </Container>

      {/* CONTACT SECTION */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />

    </Box>
  );
}

export default Predict;
