// Script pour vérifier l'état des modes
const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

const supabase = createClient(config.url, config.anonKey, config.options);

async function verifierModes() {
    console.log('🔍 Vérification de l\'état des modes...\n');
    
    try {
        // Récupérer toutes les agences
        const { data: agencies, error } = await supabase
            .from('agencies')
            .select('*');
        
        if (error) throw error;
        
        console.log('📊 ÉTAT ACTUEL DES AGENCES :');
        console.log('================================\n');
        
        for (const agency of agencies) {
            console.log(`🏢 ${agency.name}`);
            console.log(`📧 Email: ${agency.email}`);
            
            // Récupérer les paramètres séparément
            const { data: settings, error: settingsError } = await supabase
                .from('agency_settings')
                .select('*')
                .eq('agency_id', agency.id)
                .single();
            
            if (!settingsError && settings) {
                const modeEmoji = settings.global_mode === 'auto' ? '🤖' : '👤';
                const modeText = settings.global_mode === 'auto' ? 'AUTOMATIQUE' : 'MANUEL';
                
                console.log(`${modeEmoji} Mode: ${modeText}`);
                console.log(`⚙️  Paramètres de relances:`);
                console.log(`   - Paiements: ${settings.auto_payment_reminders ? '✅' : '❌'}`);
                console.log(`   - Documents: ${settings.auto_document_reminders ? '✅' : '❌'}`);
                console.log(`   - Baux: ${settings.auto_lease_reminders ? '✅' : '❌'}`);
                console.log(`   - Maintenance: ${settings.auto_maintenance_reminders ? '✅' : '❌'}`);
                console.log(`🕐 Dernière mise à jour: ${new Date(settings.updated_at).toLocaleString('fr-FR')}`);
            } else {
                console.log('❌ Aucun paramètre configuré');
            }
            console.log('--------------------------------\n');
        }
        
        // Vérifier s'il y a des conversations actives
        const { data: conversations, error: convError } = await supabase
            .from('conversations')
            .select('id')
            .limit(1);
        
        if (!convError && conversations && conversations.length > 0) {
            console.log('💬 Des conversations sont actives');
            console.log('✅ Le système est prêt à fonctionner !');
        } else {
            console.log('ℹ️  Aucune conversation active pour le moment');
        }
        
        console.log('\n📝 RÉSUMÉ :');
        console.log('- Les modes automatique/manuel sont maintenant configurés dans Supabase');
        console.log('- L\'application desktop doit lire ces paramètres depuis Supabase');
        console.log('- Les boutons de l\'interface doivent mettre à jour agency_settings');
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

// Lancer la vérification
verifierModes(); 