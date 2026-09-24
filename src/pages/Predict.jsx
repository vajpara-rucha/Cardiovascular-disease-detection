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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TuneIcon from '@mui/icons-material/Tune';
import MemoryIcon from '@mui/icons-material/Memory';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:8000';
const FALLBACK_MODELS = [
  { key: 'decision_tree', name: 'Decision Tree' },
];

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
  const message = `Must be a positive number between ${min} and ${max}`;

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

function Predict() {
  const [formData, setFormData] = useState({
    age_years: '',
    gender: '1',
    height: '',
    weight: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '1',
    gluc: '1',
    smoke: '0',
    alco: '0',
    active: '1'
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [availableModels, setAvailableModels] = useState(FALLBACK_MODELS);
  const [selectedModel, setSelectedModel] = useState(FALLBACK_MODELS[0].key);
  const [modelsLoading, setModelsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadModels() {
      setModelsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/models`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const catalog = Array.isArray(data.models) ? data.models : [];
        if (!cancelled && catalog.length > 0) {
          setAvailableModels(catalog);
          const defaultKey = data.default || catalog.find((m) => m.default)?.key || catalog[0].key;
          setSelectedModel(defaultKey);
        }
      } catch (err) {
        console.error('Failed to load model list; using fallback.', err);
        if (!cancelled) {
          setAvailableModels(FALLBACK_MODELS);
          setSelectedModel(FALLBACK_MODELS[0].key);
        }
      } finally {
        if (!cancelled) {
          setModelsLoading(false);
        }
      }
    }

    loadModels();
    return () => {
      cancelled = true;
    };
  }, []);

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

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

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
        model: selectedModel,
      };

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

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to connect to the prediction server. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isHighRisk = result?.prediction === 1;
  const riskPct = result ? result.probability * 100 : 0;
  const safePct = result ? (1 - result.probability) * 100 : 0;
  const selectedModelName =
    availableModels.find((m) => m.key === selectedModel)?.name || selectedModel;

  return (
    <div className="page-shell animate-fade-slide-up" style={{ '--hp-max-width': '1400px' }}>

      {error && (
        <Alert
          severity="error"
          icon={<ErrorOutlineIcon />}
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          <AlertTitle sx={{ fontWeight: 700 }}>Connection Error</AlertTitle>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {result && (
          <Grid size={{ xs: 12, lg: 6 }} sx={{ order: { xs: 1, lg: 2 } }}>
            <Grow in={!!result} timeout={500}>
              <div style={{ height: '100%' }}>
                <Card
                  className="animate-slide-down"
                  sx={(theme) => ({
                    height: '100%',
                background: isHighRisk
                  ? theme.custom.gradients.riskHigh
                  : theme.custom.gradients.riskLow,
                border: '1px solid',
                borderColor: isHighRisk ? 'error.light' : 'success.light',
                boxShadow: isHighRisk
                  ? '0 12px 40px -8px rgba(239,68,68,0.2)'
                  : '0 12px 40px -8px rgba(16,185,129,0.2)',
              })}
            >
              <CardContent sx={{ textAlign: 'center', p: { xs: 3, md: 6 } }}>
                <Chip
                  label={isHighRisk ? 'High Risk Detected' : 'Low Risk Detected'}
                  color={isHighRisk ? 'error' : 'success'}
                  icon={isHighRisk ? <WarningAmberIcon /> : <CheckCircleIcon />}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    px: 1.5,
                    mb: 4,
                    height: 40,
                    boxShadow: isHighRisk ? '0 4px 12px rgba(239,68,68,0.3)' : '0 4px 12px rgba(16,185,129,0.3)',
                  }}
                />

                <Typography
                  variant="overline"
                  sx={{ 
                    display: 'block',
                    fontWeight: 800, 
                    letterSpacing: 1.5,
                    color: isHighRisk ? 'error.main' : 'success.main',
                    mb: 2,
                    lineHeight: 1
                  }}
                >
                  RISK PROBABILITY
                </Typography>

                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={150}
                    thickness={4}
                    sx={{ color: isHighRisk ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)' }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={riskPct}
                    size={150}
                    thickness={4}
                    sx={{
                      color: isHighRisk ? 'error.main' : 'success.main',
                      position: 'absolute',
                      left: 0,
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ 
                        color: isHighRisk ? 'error.dark' : 'success.dark', 
                        fontWeight: 900,
                        textShadow: isHighRisk ? '0 2px 12px rgba(239,68,68,0.3)' : '0 2px 12px rgba(16,185,129,0.3)',
                      }}
                    >
                      {riskPct.toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 4, borderColor: isHighRisk ? 'error.light' : 'success.light', opacity: 0.5 }} />

                <Grid container spacing={2} sx={{ mb: 3, textAlign: 'left' }}>
                  {[
                    {
                      label: 'MODEL OUTCOME',
                      value: isHighRisk ? 'High Risk' : 'Low Risk',
                      icon: isHighRisk ? <WarningAmberIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />,
                    },
                    {
                      label: 'CVD RISK PROB.',
                      value: `${riskPct.toFixed(1)}%`,
                      icon: <FavoriteBorderIcon fontSize="small" />,
                    },
                    {
                      label: 'SAFE PROB.',
                      value: `${safePct.toFixed(1)}%`,
                      icon: <ShieldOutlinedIcon fontSize="small" />,
                    },
                    {
                      label: 'MODEL USED',
                      value: result.model_used || selectedModelName,
                      icon: <MemoryIcon fontSize="small" />,
                    },
                  ].map((stat) => (
                    <Grid key={stat.label} size={{ xs: 12, sm: 6 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: '100%',
                          backgroundColor: 'rgba(255,255,255,0.85)',
                          borderRadius: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            p: 0.5, 
                            borderRadius: '50%', 
                            backgroundColor: isHighRisk ? 'error.light' : 'success.light',
                            color: 'white'
                          }}>
                            {stat.icon}
                          </Box>
                          <Typography 
                            variant="caption" 
                            sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5 }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', ml: 0.5 }}>
                          {stat.value}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ 
                  mt: 4, 
                  p: 2.5, 
                  backgroundColor: 'rgba(255,255,255,0.95)', 
                  borderRadius: 3,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.primary', fontWeight: 800, mb: 0.5 }}
                  >
                    {result.message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {isHighRisk 
                      ? "Please consult a healthcare professional for clinical advice and a comprehensive check-up." 
                      : "Maintain a healthy lifestyle, diet, and regular exercise to keep your heart healthy!"}
                  </Typography>
                </Box>
              </CardContent>
                </Card>
              </div>
            </Grow>
          </Grid>
        )}

        <Grid size={{ xs: 12, lg: result ? 6 : 12 }} sx={{ order: { xs: 2, lg: 1 }, transition: 'all 0.3s ease-in-out' }}>
          <Card sx={{ overflow: 'hidden', height: '100%' }}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            backgroundImage: theme.custom.gradients.primary,
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.5, md: 3 },
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexWrap: 'wrap',
          })}
        >
          <MonitorHeartIcon sx={{ color: 'white', fontSize: 28 }} />
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontSize: { xs: '1.05rem', sm: '1.25rem' },
            }}
          >
            Cardiovascular Risk Assessment
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 5 } }}>

          <Paper
            variant="outlined"
            sx={{
              mb: 4,
              p: { xs: 2, md: 3 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TuneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="subtitle2">
                Quick Fill — Test Data Presets
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {presets.map((preset, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => loadPreset(preset.data)}
                    style={{ cursor: 'pointer', height: '100%' }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        height: '100%',
                        borderColor: 'primary.light',
                        backgroundColor: 'rgba(90,103,216,0.04)',
                        transition: 'background-color 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(90,103,216,0.08)',
                        }
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5, lineHeight: 1.2 }}>
                        {preset.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Age {preset.data.age_years} • BP {preset.data.ap_hi}/{preset.data.ap_lo}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  label="Age (years)"
                  type="number"
                  inputProps={{ step: 1, min: 1, max: 120 }}
                  name="age_years"
                  value={formData.age_years}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.age_years)}
                  helperText={fieldErrors.age_years || ''}
                  required
                  id="field-age"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  id="field-gender"
                >
                  <MenuItem value="1">Female</MenuItem>
                  <MenuItem value="2">Male</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  label="Height (cm)"
                  type="number"
                  inputProps={{ step: 0.1, min: 30, max: 250 }}
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.height)}
                  helperText={fieldErrors.height || ''}
                  required
                  id="field-height"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  label="Weight (kg)"
                  type="number"
                  inputProps={{ step: 0.1, min: 2, max: 300 }}
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.weight)}
                  helperText={fieldErrors.weight || ''}
                  required
                  id="field-weight"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  label="Systolic BP (mmHg)"
                  type="number"
                  inputProps={{ step: 1, min: 1, max: 300 }}
                  name="ap_hi"
                  value={formData.ap_hi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.ap_hi)}
                  helperText={fieldErrors.ap_hi || ''}
                  required
                  id="field-ap-hi"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  label="Diastolic BP (mmHg)"
                  type="number"
                  inputProps={{ step: 1, min: 1, max: 200 }}
                  name="ap_lo"
                  value={formData.ap_lo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(fieldErrors.ap_lo)}
                  helperText={fieldErrors.ap_lo || ''}
                  required
                  id="field-ap-lo"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  select
                  label="Cholesterol"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleChange}
                  id="field-cholesterol"
                >
                  <MenuItem value="1">Normal</MenuItem>
                  <MenuItem value="2">Above Normal</MenuItem>
                  <MenuItem value="3">Well Above Normal</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  select
                  label="Glucose"
                  name="gluc"
                  value={formData.gluc}
                  onChange={handleChange}
                  id="field-gluc"
                >
                  <MenuItem value="1">Normal</MenuItem>
                  <MenuItem value="2">Above Normal</MenuItem>
                  <MenuItem value="3">Well Above Normal</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  select
                  label="Smoking"
                  name="smoke"
                  value={formData.smoke}
                  onChange={handleChange}
                  id="field-smoke"
                >
                  <MenuItem value="0">No</MenuItem>
                  <MenuItem value="1">Yes</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  select
                  label="Alcohol Intake"
                  name="alco"
                  value={formData.alco}
                  onChange={handleChange}
                  id="field-alco"
                >
                  <MenuItem value="0">No</MenuItem>
                  <MenuItem value="1">Yes</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  select
                  label="Physical Activity"
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                  id="field-active"
                >
                  <MenuItem value="0">No</MenuItem>
                  <MenuItem value="1">Yes</MenuItem>
                </TextField>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ mt: 2, mb: 1 }} />
              </Grid>

              <Grid size={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'stretch', md: 'center' },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <MemoryIcon sx={{ fontSize: 22, color: 'primary.main', flexShrink: 0 }} />
                    <Typography
                      variant="subtitle2"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Active ML Model:
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="medium"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={modelsLoading || availableModels.length === 0}
                      id="field-active-model"
                      sx={{ maxWidth: { md: 360 } }}
                    >
                      {modelsLoading ? (
                        <MenuItem value={selectedModel} disabled>
                          Loading models...
                        </MenuItem>
                      ) : (
                        availableModels.map((model) => (
                          <MenuItem key={model.key} value={model.key}>
                            {model.name}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                    {modelsLoading && (
                      <CircularProgress size={18} sx={{ color: 'primary.main', flexShrink: 0 }} />
                    )}
                  </Box>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      id="btn-submit-predict"
                      sx={{
                        flexShrink: 0,
                        width: { xs: '100%', md: 'auto' },
                        minWidth: { md: 240 },
                      }}
                    >
                      {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <CircularProgress size={20} sx={{ color: 'inherit' }} />
                          <span>Analyzing...</span>
                        </Box>
                      ) : (
                        'Generate Prediction'
                      )}
                    </Button>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Predict;
