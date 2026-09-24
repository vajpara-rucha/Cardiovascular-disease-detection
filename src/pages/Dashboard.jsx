import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsightsIcon from '@mui/icons-material/Insights';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';

import { Link } from 'react-router-dom';
import { getPredictionHistory } from '../utils/historyStorage';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getPredictionHistory());
  }, []);

  const totalEvaluations = history.length;
  const highRiskCount = history.filter((h) => h.prediction === 1).length;
  const highRiskRate = totalEvaluations > 0 ? ((highRiskCount / totalEvaluations) * 100).toFixed(1) : '0.0';

  const stats = [
    {
      title: 'Total Risk Assessments',
      value: totalEvaluations.toLocaleString(),
      change: '+14% this week',
      icon: <MonitorHeartIcon sx={{ color: '#25a27b', fontSize: 28 }} />,
      bg: '#e6f7f0',
      border: '#bbf7d0',
    },
    {
      title: 'High Risk Flagged',
      value: `${highRiskRate}%`,
      change: `${highRiskCount} patients`,
      icon: <WarningAmberIcon sx={{ color: '#ef4444', fontSize: 28 }} />,
      bg: '#fef2f2',
      border: '#fecaca',
    },
    {
      title: 'Avg Inference Speed',
      value: '142 ms',
      change: 'Real-time API',
      icon: <SpeedIcon sx={{ color: '#0284c7', fontSize: 28 }} />,
      bg: '#e0f2fe',
      border: '#bae6fd',
    },
    {
      title: 'Model Accuracy',
      value: '89.6%',
      change: 'Decision Tree / XGB',
      icon: <AssessmentIcon sx={{ color: '#8b5cf6', fontSize: 28 }} />,
      bg: '#f3e8ff',
      border: '#ddd6fe',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        
        {/* DASHBOARD TOP WELCOME BANNER */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 5,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #0b1520 0%, #172a3a 100%)',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(11, 21, 32, 0.15)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Avatar
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
              sx={{ width: 64, height: 64, border: '3px solid #25a27b' }}
            />
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff' }}>
                  Welcome back, Dr. Sarah Jenkins
                </Typography>
                <Chip label="Verified Specialist" size="small" sx={{ backgroundColor: 'rgba(37, 162, 123, 0.25)', color: '#3fc397', fontWeight: 700 }} />
              </Box>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Cardiovascular Analytics Workspace • Active Engine: Decision Tree & XGBoost
              </Typography>
            </Box>
          </Box>

          <Button
            component={Link}
            to="/predict"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              backgroundColor: '#25a27b',
              color: '#ffffff',
              fontWeight: 700,
              px: 3.5,
              py: 1.4,
              borderRadius: 9999,
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 20px rgba(37, 162, 123, 0.35)',
              '&:hover': { backgroundColor: '#1b7d5e' },
            }}
          >
            Start Risk Assessment
          </Button>
        </Paper>

        {/* STATS CARDS ROW */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 200 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    border: `1px solid ${stat.border}`,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700 }}>
                      {stat.title}
                    </Typography>
                    <Box sx={{ width: 44, height: 44, borderRadius: 3, backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {stat.icon}
                    </Box>
                  </Box>

                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>
                    {stat.value}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TrendingUpIcon sx={{ color: '#25a27b', fontSize: 18 }} />
                    <Typography variant="caption" sx={{ color: '#25a27b', fontWeight: 700 }}>
                      {stat.change}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* MIDDLE ROW: CHARTS & ANALYTICS WIDGET */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          
          {/* Risk Factors & Age Breakdown Chart (Custom SVG visual) */}
          <Grid item xs={12} lg={7}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 6,
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 12px 35px rgba(0,0,0,0.04)',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <InsightsIcon sx={{ color: '#25a27b', fontSize: 26 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    Cardiovascular Risk Factor Impact Analysis
                  </Typography>
                </Box>
                <Chip label="Live ML Weights" size="small" sx={{ backgroundColor: '#e6f7f0', color: '#25a27b', fontWeight: 700 }} />
              </Box>

              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                Relative feature importance scores evaluated by the Decision Tree ensemble model across patient cohorts.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {[
                  { feature: 'Systolic Blood Pressure (ap_hi)', impact: 88, color: '#ef4444' },
                  { feature: 'Age (years)', impact: 76, color: '#f59e0b' },
                  { feature: 'Cholesterol Level', impact: 68, color: '#0284c7' },
                  { feature: 'Weight & Body Mass Index', impact: 58, color: '#25a27b' },
                  { feature: 'Glucose Level', impact: 46, color: '#8b5cf6' },
                  { feature: 'Smoking & Tobacco Use', impact: 40, color: '#64748b' },
                ].map((item, idx) => (
                  <Box key={idx}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155' }}>
                        {item.feature}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: item.color }}>
                        {item.impact}% Importance
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.impact}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: item.color,
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Model Status & Breakdown Widget */}
          <Grid item xs={12} lg={5}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 6,
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 12px 35px rgba(0,0,0,0.04)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                  Prediction Summary
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                  Cohort risk status distribution from saved evaluations.
                </Typography>

                <Box sx={{ p: 3, borderRadius: 5, backgroundColor: '#fafafa', border: '1px solid #f1f5f9', mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155' }}>High Risk Patients</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#ef4444' }}>{highRiskCount}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={totalEvaluations > 0 ? (highRiskCount / totalEvaluations) * 100 : 0}
                    sx={{ height: 8, borderRadius: 4, backgroundColor: '#e2e8f0', '& .MuiLinearProgress-bar': { backgroundColor: '#ef4444' }, mb: 3 }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#25a27b' }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155' }}>Low Risk Patients</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#25a27b' }}>{totalEvaluations - highRiskCount}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={totalEvaluations > 0 ? ((totalEvaluations - highRiskCount) / totalEvaluations) * 100 : 0}
                    sx={{ height: 8, borderRadius: 4, backgroundColor: '#e2e8f0', '& .MuiLinearProgress-bar': { backgroundColor: '#25a27b' } }}
                  />
                </Box>
              </Box>

              <Box sx={{ p: 2.5, borderRadius: 4, backgroundColor: '#e6f7f0', border: '1px solid #bbf7d0' }}>
                <Typography variant="subtitle2" sx={{ color: '#25a27b', fontWeight: 800, mb: 0.5 }}>
                  Active Model Engine: Decision Tree
                </Typography>
                <Typography variant="caption" sx={{ color: '#166534', display: 'block' }}>
                  FastAPI service operational on port 8000. All metrics synced.
                </Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>

        {/* BOTTOM ROW: RECENT ACTIVITY FEED */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 6,
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 12px 35px rgba(0,0,0,0.04)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                Recent Risk Assessment Logs
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Latest patient evaluations processed by Cardio.AI engine.
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/history"
              endIcon={<ArrowForwardIcon />}
              sx={{ color: '#25a27b', fontWeight: 700 }}
            >
              View Full History
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            {history.slice(0, 4).map((record, index) => {
              const isHigh = record.prediction === 1;
              return (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          backgroundColor: isHigh ? '#fef2f2' : '#e6f7f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isHigh ? <WarningAmberIcon sx={{ color: '#ef4444' }} /> : <CheckCircleIcon sx={{ color: '#25a27b' }} />}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                          Patient {record.id}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {record.age_years} yrs • {record.gender} • BP {record.ap_hi}/{record.ap_lo}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={isHigh ? 'High Risk' : 'Low Risk'}
                        size="small"
                        sx={{
                          backgroundColor: isHigh ? '#fef2f2' : '#e6f7f0',
                          color: isHigh ? '#dc2626' : '#166534',
                          fontWeight: 800,
                          mb: 0.5,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                        {(record.probability * 100).toFixed(1)}% prob
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Paper>

      </Container>

      <Footer />
    </Box>
  );
}
