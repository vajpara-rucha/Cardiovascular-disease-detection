import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Clinical Demo Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 6 }, background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, borderRadius: 9999, backgroundColor: '#e6f7f0', color: '#25a27b', mb: 2 }}>
            <SupportAgentIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              CONTACT US
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ color: '#0f172a', fontWeight: 800, mb: 2 }}>
            Get in Touch with Cardio.AI Specialists
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', maxWidth: 650, mx: 'auto', fontSize: '1.1rem' }}>
            Have questions about our medical software, clinical trial integration, or continuous ECG biosensors? Our cardiac technology team is ready to assist.
          </Typography>
        </Box>

        <Grid container spacing={5} alignItems="stretch">
          
          {/* Contact Details Card */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                height: '100%',
                background: 'linear-gradient(135deg, #0b1520 0%, #162a3c 100%)',
                color: '#ffffff',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 40px rgba(11, 21, 32, 0.25)',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(37, 162, 123, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MedicalServicesIcon sx={{ color: '#25a27b' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff' }}>
                    Cardio.AI Diagnostics
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4, lineHeight: 1.7 }}>
                  We empower hospitals, clinics, and cardiologists with certified automated ECG analysis and AI disease prediction.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <PhoneInTalkIcon sx={{ color: '#25a27b', mt: 0.5 }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>24/7 CLINICAL HOTLINE</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#ffffff' }}>+1 (800) 227-3461</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <EmailIcon sx={{ color: '#25a27b', mt: 0.5 }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>EMAIL INQUIRIES</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#ffffff' }}>support@cardio.ai</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <LocationOnIcon sx={{ color: '#25a27b', mt: 0.5 }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>HEADQUARTERS</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#ffffff' }}>100 Heart Health Blvd, Suite 400<br />Boston, MA 02115, USA</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 2.5, borderRadius: 4, backgroundColor: 'rgba(37, 162, 123, 0.12)', border: '1px solid rgba(37, 162, 123, 0.25)' }}>
                <Typography variant="subtitle2" sx={{ color: '#25a27b', fontWeight: 700, mb: 0.5 }}>
                  Instant AI Support Available
                </Typography>
                <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                  Our automated risk evaluation API is operational 24/7/365 with 99.9% clinical uptime.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Interactive Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                height: '100%',
                backgroundColor: '#ffffff',
                borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
                Send Us a Message
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                Fill out the form below and a clinical product specialist will respond within 24 hours.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Work Email"
                      type="email"
                      variant="outlined"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Inquiry Type"
                      variant="outlined"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    >
                      <MenuItem value="Clinical Demo Inquiry">Clinical Demo Inquiry</MenuItem>
                      <MenuItem value="ECG Biosensor Purchase">ECG Biosensor Hardware</MenuItem>
                      <MenuItem value="API Integration">Cardio AI Predict API Integration</MenuItem>
                      <MenuItem value="General Question">General Health & Medical Query</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Message / Requirements"
                      variant="outlined"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<SendIcon />}
                        sx={{
                          py: 1.6,
                          px: 4,
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          backgroundColor: '#25a27b',
                          borderRadius: 9999,
                          '&:hover': {
                            backgroundColor: '#1b7d5e',
                          },
                        }}
                      >
                        Submit Contact Inquiry
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={submitted}
          autoHideDuration={6000}
          onClose={() => setSubmitted(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%', borderRadius: 3, fontWeight: 700 }}>
            Thank you! Your message has been received. Our clinical team will reach out shortly.
          </Alert>
        </Snackbar>

      </Box>
    </Box>
  );
}
