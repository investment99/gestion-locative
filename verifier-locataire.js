const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

const supabase = createClient(config.url, config.anonKey, config.options);

async function verifierLocataire() {
  console.log('🔍 Recherche du locataire cayenne99@gmail.com...\n');
  
  try {
    // Chercher le locataire
    const { data: tenant, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('email', 'cayenne99@gmail.com');
    
    if (error) {
      console.error('❌ Erreur:', error);
      return;
    }
    
    if (!tenant || tenant.length === 0) {
      console.log('❌ Aucun locataire trouvé avec cet email.');
      console.log('\n💡 Solutions possibles:');
      console.log('1. Vérifiez que vous avez bien créé le locataire dans l\'app desktop');
      console.log('2. L\'app desktop n\'est peut-être pas connectée à Supabase');
      console.log('3. Créons le locataire directement dans Supabase');
      
      console.log('\n📝 Voulez-vous que je crée ce locataire maintenant ? (avec une agence de test)');
      
    } else {
      console.log('✅ Locataire trouvé !');
      console.log('Détails:', tenant[0]);
      console.log('\n🔑 Mot de passe enregistré:', tenant[0].password);
      
      if (tenant[0].password !== '123456') {
        console.log('\n⚠️  Le mot de passe dans la base est différent de celui que vous avez indiqué.');
        console.log('Essayez avec le mot de passe:', tenant[0].password);
      }
    }
    
    // Vérifier aussi les agences
    console.log('\n🏢 Vérification des agences...');
    const { data: agencies, error: agError } = await supabase
      .from('agencies')
      .select('id, name, email');
    
    if (agencies && agencies.length > 0) {
      console.log('Agences disponibles:');
      agencies.forEach(a => console.log(`- ${a.name} (${a.email})`));
    } else {
      console.log('Aucune agence trouvée.');
    }
    
  } catch (err) {
    console.error('Erreur:', err);
  }
}

verifierLocataire(); 