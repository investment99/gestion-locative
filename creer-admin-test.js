const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

const supabase = createClient(config.url, config.anonKey, config.options);

async function creerAdminTest() {
  console.log('🔑 Création du compte admin de test...\n');
  
  try {
    // Créer une agence de test
    const { data: agency, error } = await supabase
      .from('agencies')
      .insert({
        name: 'Mon Agence Test',
        email: 'admin@test.com',
        password: 'admin123',
        phone: '0123456789',
        address: 'Paris, France',
        subscription_plan: 'pro'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    console.log('✅ Compte admin créé !');
    console.log('================================');
    console.log('📧 Email: admin@test.com');
    console.log('🔑 Mot de passe: admin123');
    console.log('================================');
    console.log('\n🚀 Fermez votre app (Ctrl+C) et relancez avec: npm start');
    console.log('Puis connectez-vous avec ces identifiants !');
    
  } catch (err) {
    if (err.message.includes('duplicate')) {
      console.log('ℹ️  Le compte admin existe déjà');
      console.log('📧 Email: admin@test.com');
      console.log('🔑 Mot de passe: admin123');
    } else {
      console.error('❌ Erreur:', err.message);
    }
  }
}

creerAdminTest(); 