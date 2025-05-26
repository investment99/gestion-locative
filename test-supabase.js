// Test de connexion Supabase
const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

// Créer le client Supabase
const supabase = createClient(config.url, config.anonKey, config.options);

async function testConnection() {
  console.log('🔄 Test de connexion à Supabase...');
  
  try {
    // Test 1: Vérifier la connexion
    const { data, error } = await supabase
      .from('agencies')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message);
      return;
    }
    
    console.log('✅ Connexion réussie à Supabase!');
    
    // Test 2: Créer une agence de test
    console.log('\n📝 Création d\'une agence de test...');
    const { data: agency, error: createError } = await supabase
      .from('agencies')
      .insert({
        name: 'Agence Test',
        email: 'test@gestionlocative.com',
        phone: '0123456789',
        subscription_plan: 'free'
      })
      .select()
      .single();
    
    if (createError) {
      console.error('❌ Erreur lors de la création:', createError.message);
      return;
    }
    
    console.log('✅ Agence créée avec succès!');
    console.log('📊 Données:', agency);
    
    // Test 3: Lire les données
    console.log('\n📖 Lecture des agences...');
    const { data: agencies, error: readError } = await supabase
      .from('agencies')
      .select('*');
    
    if (readError) {
      console.error('❌ Erreur lors de la lecture:', readError.message);
      return;
    }
    
    console.log(`✅ ${agencies.length} agence(s) trouvée(s)`);
    agencies.forEach(a => {
      console.log(`  - ${a.name} (${a.email})`);
    });
    
  } catch (err) {
    console.error('❌ Erreur générale:', err);
  }
}

// Lancer le test
testConnection(); 