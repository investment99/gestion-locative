const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

const supabase = createClient(config.url, config.anonKey, config.options);

async function synchroniserEricBoubou() {
  console.log('🔄 Synchronisation d\'Eric Boubou...\n');
  
  try {
    // D'abord, supprimer l'ancien locataire cayenne99
    console.log('🗑️  Suppression de l\'ancien locataire...');
    await supabase
      .from('tenants')
      .delete()
      .eq('email', 'cayenne99@gmail.com');
    
    // Utiliser l'agence Test
    const { data: agency } = await supabase
      .from('agencies')
      .select('id')
      .eq('email', 'test@gestionlocative.com')
      .single();
    
    // Créer un bien qui correspond à celui de votre app
    console.log('🏠 Création du bien baba immeuble...');
    const { data: property, error: propError } = await supabase
      .from('properties')
      .insert({
        agency_id: agency.id,
        title: 'baba immeuble Appartement T1',
        type: 'Appartement T1',
        address: '11 Rue de Pommard, Paris, France',
        surface: 35,
        rooms: 1,
        rent: 800,
        charges: 100,
        deposit: 1600,
        energy_class: 'D',
        gas_emission: 'E',
        heating_type: 'Électrique'
      })
      .select()
      .single();
    
    if (propError) throw propError;
    
    // Créer Eric Boubou
    console.log('👤 Création d\'Eric Boubou...');
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        agency_id: agency.id,
        property_id: property.id,
        email: 'cayenne99@gmail.com',
        password: '123456',
        first_name: 'eric',
        last_name: 'boubou',
        phone: '0909090909',
        lease_start_date: '2025-05-25',
        lease_duration: 36,
        score: 83
      })
      .select()
      .single();
    
    if (tenantError) throw tenantError;
    
    // Créer la conversation
    console.log('💬 Création de la conversation...');
    const { data: conversation } = await supabase
      .from('conversations')
      .insert({
        agency_id: agency.id,
        tenant_id: tenant.id
      })
      .select()
      .single();
    
    console.log('\n✅ SYNCHRONISATION RÉUSSIE !');
    console.log('================================');
    console.log('👤 Nom: eric boubou');
    console.log('📧 Email: cayenne99@gmail.com');
    console.log('🔑 Mot de passe: 123456');
    console.log('🏠 Bien: baba immeuble Appartement T1');
    console.log('📍 Score: 83/100');
    console.log('================================');
    console.log('\n🔄 Rafraîchissez la page locataire et reconnectez-vous !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

synchroniserEricBoubou(); 