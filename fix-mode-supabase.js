// Script pour corriger les modes automatique/manuel dans Supabase
const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

// Créer le client Supabase
const supabase = createClient(config.url, config.anonKey, config.options);

async function fixModes() {
    console.log('🔧 Correction des modes automatique/manuel...\n');
    
    try {
        // 1. Récupérer toutes les agences
        console.log('📋 Récupération des agences...');
        const { data: agencies, error: agenciesError } = await supabase
            .from('agencies')
            .select('id, name, email');
        
        if (agenciesError) throw agenciesError;
        console.log(`✅ ${agencies.length} agence(s) trouvée(s)\n`);
        
        // 2. Pour chaque agence, vérifier/créer les paramètres
        for (const agency of agencies) {
            console.log(`🏢 Traitement de l'agence: ${agency.name}`);
            
            // Vérifier si les paramètres existent
            const { data: settings, error: settingsError } = await supabase
                .from('agency_settings')
                .select('*')
                .eq('agency_id', agency.id)
                .single();
            
            if (settingsError && settingsError.code !== 'PGRST116') {
                // Erreur autre que "pas trouvé"
                throw settingsError;
            }
            
            if (!settings) {
                // Créer les paramètres par défaut
                console.log('  ➕ Création des paramètres...');
                const { error: createError } = await supabase
                    .from('agency_settings')
                    .insert({
                        agency_id: agency.id,
                        global_mode: 'manual',
                        auto_payment_reminders: true,
                        auto_document_reminders: true,
                        auto_lease_reminders: true,
                        auto_maintenance_reminders: true
                    });
                
                if (createError) throw createError;
                console.log('  ✅ Paramètres créés en mode MANUEL');
            } else {
                console.log(`  ℹ️  Mode actuel: ${settings.global_mode}`);
            }
        }
        
        console.log('\n✅ Correction terminée !');
        console.log('\n📝 Pour changer le mode d\'une agence :');
        console.log('1. Connectez-vous à l\'interface admin');
        console.log('2. Utilisez les boutons Mode Manuel / Mode Automatique');
        console.log('3. Le changement sera synchronisé avec Supabase');
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

// Fonction pour changer le mode d'une agence spécifique
async function setAgencyMode(agencyEmail, mode) {
    console.log(`\n🔄 Changement du mode pour ${agencyEmail} vers ${mode}...`);
    
    try {
        // Trouver l'agence
        const { data: agency, error: agencyError } = await supabase
            .from('agencies')
            .select('id, name')
            .eq('email', agencyEmail)
            .single();
        
        if (agencyError) throw agencyError;
        
        // Mettre à jour le mode
        const { error: updateError } = await supabase
            .from('agency_settings')
            .update({ 
                global_mode: mode,
                updated_at: new Date().toISOString()
            })
            .eq('agency_id', agency.id);
        
        if (updateError) throw updateError;
        
        console.log(`✅ Mode ${mode} activé pour ${agency.name} !`);
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

// Lancer la correction
fixModes();

// Exemple pour changer le mode d'une agence spécifique
// Décommentez et modifiez selon vos besoins :
// setAgencyMode('admin@agenceparis.com', 'auto'); 