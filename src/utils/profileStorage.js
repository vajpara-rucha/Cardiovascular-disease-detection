const PROFILE_STORAGE_KEY = 'cardio_ai_user_profile';

export const DEFAULT_PROFILE = {
  name: 'Dr. Sarah Jenkins',
  title: 'Senior Cardiologist & Clinical Director',
  email: 'sarah.jenkins@cardio.ai',
  phone: '+1 (555) 389-2041',
  license: 'MD-849201-MA',
  hospital: 'Massachusetts General Heart Center',
  department: 'Preventive Cardiology & AI Diagnostics',
  defaultModel: 'decision_tree',
  autoSaveLogs: true,
  emailAlerts: true,
  riskThreshold: '50',
  apiKey: 'cai_live_89f92a10b48c129e47201',
};

export function getUserProfile() {
  try {
    const data = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(updatedProfile) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    // Dispatch custom event so other components (Navbar, Dashboard, Profile header) update instantly
    window.dispatchEvent(new Event('profile_updated'));
    return updatedProfile;
  } catch (err) {
    console.error('Failed to save profile:', err);
    return updatedProfile;
  }
}
