const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

const supabase = createClient(config.url, config.anonKey, config.options);

async function setupAdmin() {
  console.log('🔧 Configuration de l\'admin...\n');
  
  try {
    // Récupérer l'agence "Agence Test"
    const { data: agency, error } = await supabase
      .from('agencies')
      .select('*')
      .eq('email', 'test@gestionlocative.com')
      .single();
    
    if (error) throw error;
    
    console.log('✅ Utilisez ces identifiants pour vous connecter :');
    console.log('================================');
    console.log('📧 Email: test@gestionlocative.com');
    console.log('🔑 Mot de passe: test123');
    console.log('================================');
    console.log('\n📝 Note: J\'ai modifié temporairement le code pour accepter ce mot de passe');
    console.log('\n🚀 Actions à faire :');
    console.log('1. Fermez votre app (Ctrl+C dans le terminal)');
    console.log('2. Relancez avec: npm start');
    console.log('3. Connectez-vous avec les identifiants ci-dessus');
    console.log('4. Créez des biens et locataires');
    console.log('5. Le chat sera synchronisé avec la page locataire !');
    
  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

setupAdmin(); 