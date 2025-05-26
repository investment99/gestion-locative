const fs = require('fs');
const path = require('path');

console.log('🔧 Restauration des modes Automatique/Manuel...\n');

const htmlPath = path.join(__dirname, 'gestion-locative-supabase-clean.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Chercher la section du mode automatique
const modeSection = htmlContent.indexOf('Mode de Gestion');
if (modeSection === -1) {
    console.log('❌ Section Mode de Gestion non trouvée');
    process.exit(1);
}

// Vérifier si les fonctions toggleGlobalMode existent
if (!htmlContent.includes('function toggleGlobalMode')) {
    console.log('⚠️  La fonction toggleGlobalMode est manquante, je la restaure...');
    
    // Ajouter la fonction toggleGlobalMode avant la fermeture du dernier script
    const toggleFunction = `
        
        // Fonction pour basculer entre les modes
        function toggleGlobalMode(mode) {
            const isAutomatic = mode === 'automatic';
            localStorage.setItem('globalAutomaticMode', isAutomatic);
            
            // Mettre à jour l'interface
            updateModeDisplay();
            
            if (isAutomatic) {
                showNotification('🤖 Mode Automatique activé - L\'IA gère tout automatiquement');
            } else {
                showNotification('👤 Mode Manuel activé - Vous gardez le contrôle total');
            }
        }
        
        // Mettre à jour l'affichage du mode
        function updateModeDisplay() {
            const isAutomatic = localStorage.getItem('globalAutomaticMode') === 'true';
            const modeInfo = document.querySelector('.mode-info');
            
            if (modeInfo) {
                if (isAutomatic) {
                    modeInfo.innerHTML = \`
                        <h4>🤖 Mode Automatique Activé</h4>
                        <ul>
                            <li>L'IA répond automatiquement aux locataires</li>
                            <li>Création automatique des interventions</li>
                            <li>Contact automatique des prestataires</li>
                            <li>Planification intelligente des rendez-vous</li>
                            <li>Gestion automatique des devis</li>
                        </ul>
                    \`;
                } else {
                    modeInfo.innerHTML = \`
                        <h4>👤 Mode Manuel Activé</h4>
                        <ul>
                            <li>Vous gérez directement tous les chats avec les locataires</li>
                            <li>Notifications sonores pour chaque nouveau message</li>
                            <li>Vous créez manuellement les interventions</li>
                            <li>Vous contactez vous-même les prestataires</li>
                        </ul>
                    \`;
                }
            }
        }`;
    
    // Insérer avant la dernière balise </script>
    const lastScriptEnd = htmlContent.lastIndexOf('</script>');
    htmlContent = htmlContent.substring(0, lastScriptEnd) + toggleFunction + '\n    ' + htmlContent.substring(lastScriptEnd);
}

// Vérifier et corriger les boutons de mode
const manualButtonRegex = /<button[^>]*onclick="toggleGlobalMode\('manual'\)"[^>]*>/;
const autoButtonRegex = /<button[^>]*onclick="toggleGlobalMode\('automatic'\)"[^>]*>/;

if (!htmlContent.match(manualButtonRegex)) {
    console.log('⚠️  Correction des boutons de mode...');
    
    // Chercher et remplacer les boutons
    htmlContent = htmlContent.replace(
        /<div class="mode-card"[^>]*>\s*<h3>.*?Mode\s*Manuel.*?<\/h3>/s,
        `<div class="mode-card" onclick="toggleGlobalMode('manual')" style="cursor: pointer;">
            <h3>👤 Mode Manuel</h3>`
    );
    
    htmlContent = htmlContent.replace(
        /<div class="mode-card active"[^>]*>\s*<h3>.*?Mode\s*Automatique.*?<\/h3>/s,
        `<div class="mode-card active" onclick="toggleGlobalMode('automatic')" style="cursor: pointer;">
            <h3>🤖 Mode Automatique</h3>`
    );
}

// Ajouter la div pour afficher les infos du mode si elle n'existe pas
if (!htmlContent.includes('class="mode-info"')) {
    const afterModeCards = htmlContent.indexOf('</div>', htmlContent.indexOf('Mode Automatique Activé'));
    if (afterModeCards !== -1) {
        const modeInfoDiv = '\n        <div class="mode-info" style="margin-top: 20px;"></div>';
        htmlContent = htmlContent.substring(0, afterModeCards + 6) + modeInfoDiv + htmlContent.substring(afterModeCards + 6);
    }
}

// Sauvegarder
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Modes Automatique/Manuel restaurés !');
console.log('\n📝 Fonctionnalités restaurées :');
console.log('- Clic sur les cartes pour changer de mode');
console.log('- Affichage des informations du mode actif');
console.log('- Sauvegarde du mode choisi');
console.log('\n🔄 Rafraîchissez l\'application (Cmd+R) pour voir les changements !'); 