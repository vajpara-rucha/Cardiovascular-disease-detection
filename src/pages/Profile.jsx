import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import SecurityIcon from '@mui/icons-material/Security';
import TuneIcon from '@mui/icons-material/Tune';

import Footer from '../components/Footer';
import { getUserProfile, saveUserProfile } from '../utils/profileStorage';

export default function Profile() {
  const [profile, setProfile] = useState(getUserProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const handleToggleEdit = () => {
    if (isEditing) {
      // If currently editing and user clicks the top button, save changes
      saveUserProfile(profile);
      setIsEditing(false);
      setSaved(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setProfile(getUserProfile()); // reset to last saved state
    setIsEditing(false);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    saveUserProfile(profile);
    setIsEditing(false);
    setSaved(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: { xs: 4, md: 6 } }}>
      
      {/* COVER BANNER */}
      <Box sx={{ background: 'linear-gradient(135deg, #0b1520 0%, #172a3a 100%)', color: '#ffffff', py: { xs: 6, md: 8 }, mb: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                sx={{ width: 90, height: 90, border: '4px solid #25a27b', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
              />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="h2" sx={{ color: '#ffffff', fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                    {profile.name}
                  </Typography>
                  <VerifiedIcon sx={{ color: '#25a27b', fontSize: 24 }} />
                </Box>
                <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontWeight: 500, mb: 1 }}>
                  {profile.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Certified Specialist" size="small" sx={{ backgroundColor: 'rgba(37, 162, 123, 0.25)', color: '#3fc397', fontWeight: 700 }} />
                  <Chip label={profile.hospital} size="small" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#cbd5e1' }} />
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {isEditing && (
                <Button
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={handleCancelEdit}
                  sx={{
                    borderRadius: 9999,
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    borderColor: '#94a3b8',
                    color: '#cbd5e1',
                    '&:hover': { borderColor: '#ffffff', color: '#ffffff' },
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant={isEditing ? 'contained' : 'outlined'}
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={handleToggleEdit}
                sx={{
                  borderRadius: 9999,
                  px: 3.5,
                  py: 1.2,
                  fontWeight: 700,
                  backgroundColor: isEditing ? '#25a27b' : 'transparent',
                  borderColor: '#25a27b',
                  color: '#ffffff',
                  '&:hover': { backgroundColor: isEditing ? '#1b7d5e' : 'rgba(37, 162, 123, 0.15)' },
                }}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={4}>
          
          {/* LEFT SIDEBAR: CLINICAL INFO CARD */}
          <Grid item xs={12} md={4}>
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
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 3 }}>
                Physician Credentials
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BadgeIcon sx={{ color: '#25a27b' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>MEDICAL LICENSE</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>{profile.license}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocalHospitalIcon sx={{ color: '#25a27b' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>DEPARTMENT</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>{profile.department}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon sx={{ color: '#25a27b' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>EMAIL ADDRESS</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>{profile.email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon sx={{ color: '#25a27b' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>DIRECT PHONE</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>{profile.phone}</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                Clinical Activity Stats:
              </Typography>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: '#e6f7f0', borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#25a27b' }}>1,284</Typography>
                    <Typography variant="caption" sx={{ color: '#166534', fontWeight: 700 }}>Assessments</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: '#fef2f2', borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#ef4444' }}>439</Typography>
                    <Typography variant="caption" sx={{ color: '#991b1b', fontWeight: 700 }}>High Risk Flags</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* RIGHT MAIN AREA: EDITABLE PROFILE & CLINICAL PREFERENCES */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 6,
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 12px 35px rgba(0,0,0,0.04)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  Account & Clinical Settings
                </Typography>
                {isEditing && (
                  <Chip label="Editing Mode Active" color="primary" sx={{ fontWeight: 700, backgroundColor: '#e6f7f0', color: '#25a27b' }} />
                )}
              </Box>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                {isEditing
                  ? 'Update your personal credentials, contact info, and machine learning settings below, then click Save.'
                  : 'Click "Edit Profile" above or edit fields below to update your account details and ML preferences.'}
              </Typography>

              <form onSubmit={handleSaveForm}>
                
                {/* SECTION 1: PERSONAL & CLINICAL CREDENTIALS */}
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#25a27b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonOutlineIcon /> Personal & Professional Credentials
                </Typography>

                <Grid container spacing={2.5} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      disabled={!isEditing}
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Professional Title"
                      disabled={!isEditing}
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Medical License ID"
                      disabled={!isEditing}
                      value={profile.license}
                      onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Hospital / Clinic"
                      disabled={!isEditing}
                      value={profile.hospital}
                      onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Department"
                      disabled={!isEditing}
                      value={profile.department}
                      onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      disabled={!isEditing}
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Direct Phone"
                      disabled={!isEditing}
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* SECTION 2: CLINICAL PREFERENCES */}
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#25a27b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TuneIcon /> ML Model Preferences
                </Typography>

                <Grid container spacing={2.5} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      disabled={!isEditing}
                      label="Default Machine Learning Model"
                      value={profile.defaultModel}
                      onChange={(e) => setProfile({ ...profile, defaultModel: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    >
                      <MenuItem value="decision_tree">Decision Tree Classifier</MenuItem>
                      <MenuItem value="random_forest">Random Forest Classifier</MenuItem>
                      <MenuItem value="xgboost">XGBoost Neural Net</MenuItem>
                      <MenuItem value="logistic_regression">Logistic Regression</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={!isEditing}
                      label="High-Risk Cutoff Threshold (%)"
                      type="number"
                      value={profile.riskThreshold}
                      onChange={(e) => setProfile({ ...profile, riskThreshold: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={profile.autoSaveLogs}
                          disabled={!isEditing}
                          onChange={(e) => setProfile({ ...profile, autoSaveLogs: e.target.checked })}
                          color="primary"
                        />
                      }
                      label="Auto-save evaluations to History Logs"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={profile.emailAlerts}
                          disabled={!isEditing}
                          onChange={(e) => setProfile({ ...profile, emailAlerts: e.target.checked })}
                          color="primary"
                        />
                      }
                      label="Send email alerts for High-Risk predictions"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* SECTION 3: API & SECURITY */}
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#25a27b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon /> API Key & Security
                </Typography>

                <Grid container spacing={2.5} sx={{ mb: 4 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      label="FastAPI Backend Endpoint"
                      value="http://localhost:8000/api/predict"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      label="Secret API Key"
                      value={profile.apiKey}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancelEdit}
                      sx={{
                        borderRadius: 9999,
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        borderColor: '#cbd5e1',
                        color: '#64748b',
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SaveIcon />}
                      sx={{
                        backgroundColor: '#25a27b',
                        color: '#ffffff',
                        fontWeight: 700,
                        px: 5,
                        py: 1.5,
                        borderRadius: 9999,
                        '&:hover': { backgroundColor: '#1b7d5e' },
                      }}
                    >
                      Save Profile Changes
                    </Button>
                  </Box>
                )}

              </form>
            </Paper>
          </Grid>

        </Grid>
      </Container>

      <Snackbar open={saved} autoHideDuration={4000} onClose={() => setSaved(false)}>
        <Alert severity="success" sx={{ borderRadius: 3, fontWeight: 700 }}>
          Profile preferences updated successfully!
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}
