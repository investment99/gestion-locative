// Intégration Supabase pour l'application Gestion Locative
// Ce fichier doit être inclus dans gestion-locative-complete.html

// Configuration Supabase
const SUPABASE_URL = 'https://peigptntyyylgjtpnpmn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlaWdwdG50eXl5bGdqdHBucG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTMzNzQsImV4cCI6MjA2Mzc2OTM3NH0.Y-VqcoFNBt2x_hvA_IaIXLS0qNPb4tw5JLKpG_QKBc0';

// Variables globales
let supabaseClient = null;
let currentAgency = null;
let currentAgencySettings = null;

// Initialiser Supabase
function initSupabase() {
    if (typeof window !== 'undefined' && window.supabase) {
        const { createClient } = window.supabase;
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase initialisé');
        
        // Charger les paramètres de l'agence après connexion
        loadAgencySettings();
    } else {
        console.error('❌ Supabase non chargé');
    }
}

// Charger les paramètres de l'agence
async function loadAgencySettings() {
    if (!supabaseClient) return;
    
    try {
        // Pour le test, on prend la première agence
        // En production, il faudrait identifier l'agence de l'utilisateur connecté
        const { data: agencies, error: agencyError } = await supabaseClient
            .from('agencies')
            .select('*')
            .limit(1)
            .single();
        
        if (agencyError) throw agencyError;
        currentAgency = agencies;
        
        // Charger les paramètres
        const { data: settings, error: settingsError } = await supabaseClient
            .from('agency_settings')
            .select('*')
            .eq('agency_id', currentAgency.id)
            .single();
        
        if (!settingsError && settings) {
            currentAgencySettings = settings;
            updateModeDisplay(settings.global_mode);
            console.log('📋 Mode actuel:', settings.global_mode);
        }
        
    } catch (error) {
        console.error('Erreur chargement paramètres:', error);
    }
}

// Mettre à jour l'affichage du mode
function updateModeDisplay(mode) {
    const isAutomatic = mode === 'auto';
    
    // Mettre à jour les boutons radio
    const manualRadio = document.querySelector('input[value="manual"]');
    const autoRadio = document.querySelector('input[value="auto"]');
    
    if (manualRadio && autoRadio) {
        manualRadio.checked = !isAutomatic;
        autoRadio.checked = isAutomatic;
    }
    
    // Mettre à jour l'affichage des informations
    const manualDesc = document.getElementById('manualModeDesc');
    const autoDesc = document.getElementById('autoModeDesc');
    
    if (manualDesc && autoDesc) {
        manualDesc.style.display = isAutomatic ? 'none' : 'block';
        autoDesc.style.display = isAutomatic ? 'block' : 'none';
    }
    
    // Afficher une notification
    const modeText = isAutomatic ? 'Automatique' : 'Manuel';
    console.log(`✅ Mode ${modeText} activé`);
}

// Fonction pour changer le mode (appelée par les boutons)
window.setGlobalMode = async function(mode) {
    if (!supabaseClient || !currentAgency) {
        alert('Erreur: Connexion à Supabase non établie');
        return;
    }
    
    try {
        // Mettre à jour dans Supabase
        const { error } = await supabaseClient
            .from('agency_settings')
            .update({ 
                global_mode: mode,
                updated_at: new Date().toISOString()
            })
            .eq('agency_id', currentAgency.id);
        
        if (error) throw error;
        
        // Mettre à jour l'affichage
        updateModeDisplay(mode);
        
        // Afficher une notification
        const modeText = mode === 'auto' ? 'Automatique' : 'Manuel';
        if (typeof showNotification === 'function') {
            showNotification(`🎯 Mode ${modeText} activé avec succès !`);
        } else {
            alert(`Mode ${modeText} activé !`);
        }
        
        // Sauvegarder aussi en localStorage pour compatibilité
        localStorage.setItem('globalMode', mode);
        localStorage.setItem('globalAutomaticMode', mode === 'auto');
        
    } catch (error) {
        console.error('Erreur changement de mode:', error);
        alert('Erreur lors du changement de mode');
    }
}

// Fonction pour afficher une notification
window.showNotification = function(message) {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
} else {
    initSupabase();
}

console.log('🚀 Intégration Supabase chargée'); 