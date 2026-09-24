import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import MuiLink from '@mui/material/Link';

import StorageIcon from '@mui/icons-material/Storage';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TuneIcon from '@mui/icons-material/Tune';
import ScoreIcon from '@mui/icons-material/Score';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


function About() {
  const statPaperStyle = {
    p: { xs: 2.5, md: 3 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  };

  return (
    <div className="page-shell animate-fade-slide-up">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2, color: 'primary.dark' }}>
          About the Project
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto', fontSize: { xs: '1rem', md: '1.125rem' } }}>
          This tool uses machine learning to assess cardiovascular disease risk based on clinical and lifestyle data, built as an academic ML project.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2, fontStyle: 'italic' }}>
          * Designed for educational and research purposes, not as a medical diagnosis tool.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
          <StorageIcon color="primary" /> Data Insights
        </Typography>
        
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Data Source
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Cardiovascular Disease Clinical Dataset
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper variant="outlined" sx={statPaperStyle}>
                  <StorageIcon sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>
                    70,000
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Raw Records
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper variant="outlined" sx={statPaperStyle}>
                  <BlockIcon sx={{ fontSize: 32, color: 'error.main', mb: 1, opacity: 0.7 }} />
                  <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>
                    1,557
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Rows Removed (2.22%)
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper variant="outlined" sx={statPaperStyle}>
                  <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main', mb: 1, opacity: 0.8 }} />
                  <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>
                    68,443
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Final Records for Training
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InfoOutlinedIcon color="primary" /> Understanding CVD
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Cardiovascular disease (CVD) covers conditions affecting the heart and blood vessels — coronary artery disease, heart attack, stroke. Risk drivers include blood pressure, cholesterol, glucose, and age. The model identifies patterns in historical clinical data to estimate risk probabilities for screening/research purposes — not a diagnosis. Consult a healthcare professional for medical decisions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="primary" /> Ideal Ranges Reference
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Blood Pressure:</strong> ~120/80 mmHg</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Cholesterol (Total):</strong> &lt; 200 mg/dL</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Fasting Glucose:</strong> 70-99 mg/dL</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>BMI:</strong> 18.5-24.9</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Resting Heart Rate:</strong> 60-100 bpm</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Activity:</strong> &ge; 150 min/week</Typography>
                </Box>
                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                  Note: Values outside these ranges can increase cardiovascular risk when combined.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssessmentIcon color="primary" /> Model Information
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AssessmentIcon sx={{ color: 'text.secondary' }} />
                  <Typography variant="subtitle1">Architecture</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}><strong>Algorithm:</strong> GradientBoostingClassifier</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}><strong>Library:</strong> scikit-learn</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}><strong>Features Used:</strong> 14</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Trained At:</strong> {new Date().toLocaleDateString()}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TuneIcon sx={{ color: 'text.secondary' }} />
                  <Typography variant="subtitle1">Hyperparameters</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}><strong>Estimators:</strong> 300</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}><strong>Learning Rate:</strong> 0.05</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}><strong>Max Depth:</strong> 4</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Min Samples/Leaf:</strong> 3</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ScoreIcon sx={{ color: 'text.secondary' }} />
                  <Typography variant="subtitle1">Performance</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Accuracy</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>73.1%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={73.1} />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>F1 Score</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>71.7%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={71.7} />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>ROC AUC</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>79.7%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={79.7} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <TrendingUpIcon color="primary" />
              <Typography variant="h6">Top Feature Importance</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>Systolic BP (ap_hi)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>68.9%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={68.9} 
                  sx={{ height: 12 }}
                />
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>Age</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>12.8%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={12.8} 
                  sx={{ height: 12 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Paper 
          variant="outlined"
          sx={{ 
            p: { xs: 2.5, md: 3 },
            background: 'rgba(254,242,242,0.7)',
            borderColor: 'error.light',
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <WarningAmberIcon sx={{ color: 'error.main', mt: 0.5, flexShrink: 0 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'error.dark', mb: 0.5 }}>
              Disclaimer
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              This tool is built for academic/educational purposes as part of a Machine Learning course project. Predictions are based on a trained statistical model and are <strong>NOT a medical diagnosis</strong>. Always consult a qualified healthcare professional for medical advice.
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Divider sx={{ mb: 6 }} />
        <Button
          component={Link}
          to="/predict"
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{
            maxWidth: '100%',
            whiteSpace: { xs: 'normal', sm: 'nowrap' },
            py: { xs: 1.5, md: 1.75 },
            px: { xs: 3, md: 4 },
          }}
        >
          Ready to check your risk? Try the Assessment
        </Button>
      </Box>

    </div>
  );
}

export default About;
