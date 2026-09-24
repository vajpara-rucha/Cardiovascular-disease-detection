import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';

import { Link } from 'react-router-dom';
import { getPredictionHistory, clearPredictionHistory } from '../utils/historyStorage';
import Footer from '../components/Footer';

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  useEffect(() => {
    setHistory(getPredictionHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all saved prediction history?')) {
      clearPredictionHistory();
      setHistory([]);
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.gender.toLowerCase().includes(search.toLowerCase()) ||
      item.model_used.toLowerCase().includes(search.toLowerCase());

    if (filterRisk === 'HIGH') return matchesSearch && item.prediction === 1;
    if (filterRisk === 'LOW') return matchesSearch && item.prediction === 0;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);
  const paginatedHistory = filteredHistory.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: { xs: 4, md: 6 } }}>
      
      {/* HEADER BANNER */}
      <Box sx={{ background: 'linear-gradient(135deg, #0b1520 0%, #172a3a 100%)', color: '#ffffff', py: { xs: 6, md: 8 }, mb: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
            <Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.6, borderRadius: 9999, backgroundColor: 'rgba(37, 162, 123, 0.2)', color: '#3fc397', mb: 2 }}>
                <HistoryIcon fontSize="small" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                  AUDIT & EVALUATION LOGS
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ color: '#ffffff', fontWeight: 800, mb: 1 }}>
                Prediction History Records
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                Auditable log of all cardiovascular risk assessments performed by Cardio.AI models.
              </Typography>
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
                '&:hover': { backgroundColor: '#1b7d5e' },
              }}
            >
              New Prediction
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 10 }}>
        
        {/* FILTER & SEARCH TOOLBAR */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 5,
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Search Input */}
          <TextField
            placeholder="Search by Patient ID, Gender, Model..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: { md: 320 }, '& .MuiOutlinedInput-root': { borderRadius: 9999 } }}
          />

          {/* Risk Filters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <FilterListIcon sx={{ color: '#64748b', mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', mr: 1 }}>
              Risk Status:
            </Typography>

            {[
              { label: 'All Records', value: 'ALL' },
              { label: 'High Risk Only', value: 'HIGH' },
              { label: 'Low Risk Only', value: 'LOW' },
            ].map((f) => (
              <Chip
                key={f.value}
                label={f.label}
                onClick={() => { setFilterRisk(f.value); setPage(0); }}
                sx={{
                  fontWeight: 700,
                  backgroundColor: filterRisk === f.value ? '#25a27b' : '#f1f5f9',
                  color: filterRisk === f.value ? '#ffffff' : '#475569',
                  '&:hover': { backgroundColor: filterRisk === f.value ? '#1b7d5e' : '#e2e8f0' },
                }}
              />
            ))}
          </Box>

          {history.length > 0 && (
            <Button
              variant="text"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleClear}
              sx={{ fontWeight: 700, borderRadius: 9999 }}
            >
              Clear Logs
            </Button>
          )}
        </Paper>

        {/* MODERN HISTORY TABLE */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 6,
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 12px 35px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>Patient Reference</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>Demographics</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>BP (Systolic/Diastolic)</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>Cholesterol</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>Risk Status</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>Prob. %</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>Model Used</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedHistory.length > 0 ? (
                  paginatedHistory.map((row) => {
                    const isHigh = row.prediction === 1;
                    return (
                      <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>
                          {row.id}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                          {row.date}
                        </TableCell>
                        <TableCell sx={{ color: '#334155', fontWeight: 600 }}>
                          {row.age_years} yrs • {row.gender}
                        </TableCell>
                        <TableCell sx={{ color: '#334155', fontWeight: 700 }}>
                          {row.ap_hi} / {row.ap_lo} mmHg
                        </TableCell>
                        <TableCell sx={{ color: '#64748b' }}>
                          {row.cholesterol}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={isHigh ? 'High Risk' : 'Low Risk'}
                            size="small"
                            icon={isHigh ? <WarningAmberIcon /> : <CheckCircleIcon />}
                            sx={{
                              backgroundColor: isHigh ? '#fef2f2' : '#e6f7f0',
                              color: isHigh ? '#dc2626' : '#166534',
                              fontWeight: 800,
                              px: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 900, color: isHigh ? '#dc2626' : '#25a27b' }}>
                          {(row.probability * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                          {row.model_used}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                      <Typography variant="body1" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                        No prediction logs match your search criteria.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9' }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredHistory.length)} of {filteredHistory.length} records
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  sx={{ border: '1px solid #cbd5e1' }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#0f172a', px: 1 }}>
                  Page {page + 1} of {totalPages}
                </Typography>
                <IconButton
                  size="small"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(page + 1)}
                  sx={{ border: '1px solid #cbd5e1' }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Paper>

      </Container>

      <Footer />
    </Box>
  );
}
