const STORAGE_KEY = 'cardio_ai_prediction_history';

const INITIAL_MOCK_HISTORY = [
  {
    id: 'PAT-8921',
    date: '2026-09-24 16:30',
    age_years: 58,
    gender: 'Male',
    height: 175,
    weight: 84,
    ap_hi: 145,
    ap_lo: 92,
    cholesterol: 'Above Normal',
    gluc: 'Normal',
    smoke: 'Yes',
    alco: 'No',
    active: 'Yes',
    prediction: 1,
    probability: 0.842,
    model_used: 'Decision Tree',
  },
  {
    id: 'PAT-8920',
    date: '2026-09-24 14:15',
    age_years: 34,
    gender: 'Female',
    height: 162,
    weight: 58,
    ap_hi: 115,
    ap_lo: 74,
    cholesterol: 'Normal',
    gluc: 'Normal',
    smoke: 'No',
    alco: 'No',
    active: 'Yes',
    prediction: 0,
    probability: 0.125,
    model_used: 'Decision Tree',
  },
  {
    id: 'PAT-8919',
    date: '2026-09-24 11:40',
    age_years: 67,
    gender: 'Male',
    height: 170,
    weight: 92,
    ap_hi: 162,
    ap_lo: 98,
    cholesterol: 'Well Above Normal',
    gluc: 'Above Normal',
    smoke: 'Yes',
    alco: 'Yes',
    active: 'No',
    prediction: 1,
    probability: 0.915,
    model_used: 'Random Forest',
  },
  {
    id: 'PAT-8918',
    date: '2026-09-23 18:20',
    age_years: 42,
    gender: 'Female',
    height: 168,
    weight: 66,
    ap_hi: 122,
    ap_lo: 80,
    cholesterol: 'Normal',
    gluc: 'Normal',
    smoke: 'No',
    alco: 'No',
    active: 'Yes',
    prediction: 0,
    probability: 0.210,
    model_used: 'Decision Tree',
  },
  {
    id: 'PAT-8917',
    date: '2026-09-23 15:05',
    age_years: 51,
    gender: 'Male',
    height: 178,
    weight: 88,
    ap_hi: 138,
    ap_lo: 88,
    cholesterol: 'Above Normal',
    gluc: 'Normal',
    smoke: 'No',
    alco: 'Yes',
    active: 'Yes',
    prediction: 1,
    probability: 0.678,
    model_used: 'XGBoost',
  },
  {
    id: 'PAT-8916',
    date: '2026-09-22 09:50',
    age_years: 29,
    gender: 'Female',
    height: 160,
    weight: 54,
    ap_hi: 110,
    ap_lo: 70,
    cholesterol: 'Normal',
    gluc: 'Normal',
    smoke: 'No',
    alco: 'No',
    active: 'Yes',
    prediction: 0,
    probability: 0.082,
    model_used: 'Decision Tree',
  },
];

export function getPredictionHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_HISTORY));
      return INITIAL_MOCK_HISTORY;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_MOCK_HISTORY;
  }
}

export function savePredictionToHistory(entry) {
  try {
    const history = getPredictionHistory();
    const newRecord = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...entry,
    };
    const updated = [newRecord, ...history];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save history:', err);
    return [];
  }
}

export function clearPredictionHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}
