// Test complet Admin/Locataire avec Supabase
const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

// Créer le client Supabase
const supabase = createClient(config.url, config.anonKey, config.options);

async function testAdminLocataire() {
  console.log('🚀 TEST COMPLET ADMIN/LOCATAIRE\n');
  
  try {
    // 1. CRÉER UNE AGENCE (ADMIN)
    console.log('👔 ÉTAPE 1: Création de l\'agence...');
    const { data: agency, error: agencyError } = await supabase
      .from('agencies')
      .insert({
        name: 'Agence Immobilière Paris',
        email: 'admin@agenceparis.com',
        phone: '0142424242',
        address: '10 rue de la Paix, 75002 Paris',
        subscription_plan: 'pro'
      })
      .select()
      .single();
    
    if (agencyError) throw agencyError;
    console.log('✅ Agence créée:', agency.name);
    
    // 2. CRÉER UN BIEN IMMOBILIER
    console.log('\n🏠 ÉTAPE 2: Ajout d\'un bien...');
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert({
        agency_id: agency.id,
        title: 'Bel appartement Haussmannien',
        type: 'Appartement T3',
        address: '15 Boulevard Haussmann, 75009 Paris',
        surface: 85,
        rooms: 3,
        rent: 2500,
        charges: 200,
        deposit: 5000,
        energy_class: 'C',
        gas_emission: 'D',
        heating_type: 'Gaz collectif',
        amenities: ['Ascenseur', 'Balcon', 'Cave']
      })
      .select()
      .single();
    
    if (propertyError) throw propertyError;
    console.log('✅ Bien créé:', property.title);
    
    // 3. CRÉER UN LOCATAIRE
    console.log('\n👤 ÉTAPE 3: Création du locataire...');
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        agency_id: agency.id,
        property_id: property.id,
        email: 'marie.dupont@email.com',
        password: 'marie123',
        first_name: 'Marie',
        last_name: 'Dupont',
        phone: '0612345678',
        lease_start_date: '2025-06-01',
        lease_duration: 3,
        score: 95
      })
      .select()
      .single();
    
    if (tenantError) throw tenantError;
    console.log('✅ Locataire créé:', tenant.first_name, tenant.last_name);
    
    // 4. CRÉER UNE CONVERSATION
    console.log('\n💬 ÉTAPE 4: Création de la conversation...');
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .insert({
        agency_id: agency.id,
        tenant_id: tenant.id
      })
      .select()
      .single();
    
    if (convError) throw convError;
    console.log('✅ Conversation créée');
    
    // 5. SIMULER UN ÉCHANGE DE MESSAGES
    console.log('\n📨 ÉTAPE 5: Simulation d\'un chat...');
    
    // Message du locataire
    const { error: msg1Error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        sender_type: 'tenant',
        sender_id: tenant.id,
        content: 'Bonjour, j\'ai une fuite d\'eau dans la salle de bain !',
        is_automatic: false
      });
    
    if (msg1Error) throw msg1Error;
    console.log('  📤 Locataire: "Bonjour, j\'ai une fuite d\'eau dans la salle de bain !"');
    
    // Réponse de l'agence
    const { error: msg2Error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        sender_type: 'agency',
        sender_id: agency.id,
        content: 'Bonjour Mme Dupont, je m\'occupe immédiatement de votre problème. Un plombier sera chez vous demain à 14h.',
        is_automatic: false
      });
    
    if (msg2Error) throw msg2Error;
    console.log('  📥 Agence: "Bonjour Mme Dupont, je m\'occupe immédiatement..."');
    
    // 6. CRÉER UNE INTERVENTION
    console.log('\n🔧 ÉTAPE 6: Création d\'une intervention...');
    const { data: intervention, error: intError } = await supabase
      .from('interventions')
      .insert({
        agency_id: agency.id,
        property_id: property.id,
        tenant_id: tenant.id,
        type: 'plumbing',
        description: 'Fuite d\'eau salle de bain - Urgent',
        urgency: 'high',
        status: 'scheduled',
        provider_name: 'Plomberie Express',
        scheduled_date: '2025-05-26',
        created_by: 'agency'
      })
      .select()
      .single();
    
    if (intError) throw intError;
    console.log('✅ Intervention planifiée pour demain');
    
    // 7. AFFICHER LE RÉCAPITULATIF
    console.log('\n📊 RÉCAPITULATIF DU TEST:');
    console.log('================================');
    console.log(`🏢 Agence: ${agency.name}`);
    console.log(`🏠 Bien: ${property.title}`);
    console.log(`👤 Locataire: ${tenant.first_name} ${tenant.last_name}`);
    console.log(`📧 Email: ${tenant.email}`);
    console.log(`🔑 Mot de passe: marie123`);
    console.log(`💬 Conversation active avec messages`);
    console.log(`🔧 Intervention planifiée`);
    console.log('================================');
    
    // 8. LIRE TOUS LES MESSAGES
    console.log('\n📜 Historique de la conversation:');
    const { data: messages, error: readError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true });
    
    if (readError) throw readError;
    
    messages.forEach(msg => {
      const sender = msg.sender_type === 'tenant' ? '👤 Locataire' : '🏢 Agence';
      console.log(`${sender}: ${msg.content}`);
    });
    
    console.log('\n✅ TEST TERMINÉ AVEC SUCCÈS !');
    console.log('\n💡 Vous pouvez maintenant:');
    console.log('1. Ouvrir l\'app desktop et vous connecter en tant qu\'admin');
    console.log('2. Ouvrir la page web locataire et vous connecter avec marie.dupont@email.com / marie123');
    console.log('3. Les messages seront synchronisés en temps réel !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Lancer le test
testAdminLocataire(); 