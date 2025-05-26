const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

const supabase = createClient(config.url, config.anonKey, config.options);

async function creerLocataireCayenne() {
  console.log('🚀 Création du locataire cayenne99@gmail.com...\n');
  
  try {
    // Utiliser l'agence "Agence Test" existante
    const { data: agencies } = await supabase
      .from('agencies')
      .select('id')
      .eq('email', 'test@gestionlocative.com')
      .single();
    
    const agencyId = agencies.id;
    
    // Créer un bien pour ce locataire
    console.log('🏠 Création d\'un bien...');
    const { data: property, error: propError } = await supabase
      .from('properties')
      .insert({
        agency_id: agencyId,
        title: 'Appartement Vue Mer',
        type: 'Appartement T2',
        address: '25 Avenue de la Plage, 97300 Cayenne',
        surface: 65,
        rooms: 2,
        rent: 1200,
        charges: 150,
        deposit: 2400,
        energy_class: 'B',
        gas_emission: 'C',
        heating_type: 'Électrique',
        amenities: ['Climatisation', 'Terrasse', 'Parking']
      })
      .select()
      .single();
    
    if (propError) throw propError;
    console.log('✅ Bien créé:', property.title);
    
    // Créer le locataire
    console.log('\n👤 Création du locataire...');
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        agency_id: agencyId,
        property_id: property.id,
        email: 'cayenne99@gmail.com',
        password: '123456',
        first_name: 'Jean',
        last_name: 'Martin',
        phone: '0694123456',
        lease_start_date: '2025-01-01',
        lease_duration: 12,
        score: 85
      })
      .select()
      .single();
    
    if (tenantError) throw tenantError;
    console.log('✅ Locataire créé !');
    
    // Créer une conversation
    console.log('\n💬 Création de la conversation...');
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .insert({
        agency_id: agencyId,
        tenant_id: tenant.id
      })
      .select()
      .single();
    
    if (convError) throw convError;
    
    console.log('\n✅ TOUT EST PRÊT !');
    console.log('================================');
    console.log('📧 Email: cayenne99@gmail.com');
    console.log('🔑 Mot de passe: 123456');
    console.log('🏠 Bien: Appartement Vue Mer');
    console.log('📍 Adresse: 25 Avenue de la Plage, Cayenne');
    console.log('================================');
    console.log('\n🎯 Vous pouvez maintenant vous connecter sur la page locataire !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

creerLocataireCayenne(); 