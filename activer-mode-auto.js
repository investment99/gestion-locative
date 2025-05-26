// Script pour activer le mode automatique
const { createClient } = require('@supabase/supabase-js');
const config = require('./supabase-config.js');

const supabase = createClient(config.url, config.anonKey, config.options);

async function activerModeAuto() {
    console.log('🤖 Activation du mode automatique...\n');
    
    try {
        // Afficher les agences disponibles
        const { data: agencies, error: listError } = await supabase
            .from('agencies')
            .select('id, name, email');
        
        if (listError) throw listError;
        
        console.log('📋 Agences disponibles :');
        agencies.forEach((agency, index) => {
            console.log(`${index + 1}. ${agency.name} (${agency.email})`);
        });
        
        // Activer le mode auto pour toutes les agences
        console.log('\n🔄 Activation du mode automatique pour toutes les agences...');
        
        for (const agency of agencies) {
            const { error: updateError } = await supabase
                .from('agency_settings')
                .update({ 
                    global_mode: 'auto',
                    updated_at: new Date().toISOString()
                })
                .eq('agency_id', agency.id);
            
            if (updateError) {
                console.error(`❌ Erreur pour ${agency.name}:`, updateError.message);
            } else {
                console.log(`✅ Mode automatique activé pour ${agency.name}`);
            }
        }
        
        console.log('\n🎉 Mode automatique activé avec succès !');
        console.log('\n📝 Les fonctionnalités suivantes sont maintenant actives :');
        console.log('- 🤖 Réponses automatiques de l\'IA aux locataires');
        console.log('- 🔧 Création automatique des interventions');
        console.log('- 📞 Contact automatique des prestataires');
        console.log('- 📅 Planification intelligente des RDV');
        console.log('- 💰 Gestion automatique des devis');
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

// Lancer l'activation
activerModeAuto(); 