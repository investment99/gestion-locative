// Configuration Supabase pour Gestion Locative Pro
// Remplacez les valeurs par vos propres clés

const SUPABASE_CONFIG = {
  // URL de votre projet Supabase
  url: 'https://peigptntyyylgjtpnpmn.supabase.co',
  
  // Clé publique (anon key)
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlaWdwdG50eXl5bGdqdHBucG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTMzNzQsImV4cCI6MjA2Mzc2OTM3NH0.Y-VqcoFNBt2x_hvA_IaIXLS0qNPb4tw5JLKpG_QKBc0',
  
  // Options de configuration
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
};

// Export pour Node.js/Electron
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}

// Export pour le navigateur
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
} 