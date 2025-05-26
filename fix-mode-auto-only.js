// Script pour réparer UNIQUEMENT le mode automatique
// Ne touche à RIEN d'autre dans l'application

console.log('🔧 Réparation du mode automatique...\n');

// Code à injecter dans la console de l'application
const fixCode = `
// Vérifier si la fonction toggleGlobalMode existe
if (typeof window.toggleGlobalMode === 'undefined') {
    console.log('❌ La fonction toggleGlobalMode n\'existe pas, je la crée...');
    
    window.toggleGlobalMode = function(mode) {
        const isAutomatic = mode === 'automatic';
        
        // Sauvegarder le mode
        localStorage.setItem('globalAutomaticMode', isAutomatic);
        
        // Mettre à jour l'interface
        const manualCard = document.querySelector('.mode-card:first-child');
        const autoCard = document.querySelector('.mode-card:last-child');
        
        if (manualCard && autoCard) {
            if (isAutomatic) {
                manualCard.classList.remove('active');
                autoCard.classList.add('active');
                
                // Mettre à jour le texte d'info
                const infoText = document.querySelector('.mode-info');
                if (infoText) {
                    infoText.innerHTML = '<h3>🤖 Mode Automatique Activé</h3>' +
                        '<ul>' +
                        '<li>L\\'IA répond automatiquement aux locataires 24/7</li>' +
                        '<li>Création automatique des interventions urgentes</li>' +
                        '<li>Contact automatique des prestataires</li>' +
                        '<li>Vous êtes notifié des actions importantes</li>' +
                        '</ul>';
                }
                
                alert('✅ Mode Automatique activé !');
            } else {
                manualCard.classList.add('active');
                autoCard.classList.remove('active');
                
                // Mettre à jour le texte d'info
                const infoText = document.querySelector('.mode-info');
                if (infoText) {
                    infoText.innerHTML = '<h3>✋ Mode Manuel Activé</h3>' +
                        '<ul>' +
                        '<li>Vous gérez directement tous les chats avec les locataires</li>' +
                        '<li>Notifications sonores pour chaque nouveau message</li>' +
                        '<li>Vous créez manuellement les interventions</li>' +
                        '<li>Vous contactez vous-même les prestataires</li>' +
                        '</ul>';
                }
                
                alert('✅ Mode Manuel activé !');
            }
        }
        
        console.log('✅ Mode changé vers:', mode);
    };
    
    console.log('✅ Fonction toggleGlobalMode créée !');
} else {
    console.log('✅ La fonction toggleGlobalMode existe déjà');
}

// Ajouter les événements click sur les cartes
const manualCard = document.querySelector('.mode-card:first-child');
const autoCard = document.querySelector('.mode-card:last-child');

if (manualCard && !manualCard.onclick) {
    manualCard.onclick = () => window.toggleGlobalMode('manual');
    console.log('✅ Click ajouté sur Mode Manuel');
}

if (autoCard && !autoCard.onclick) {
    autoCard.onclick = () => window.toggleGlobalMode('automatic');
    console.log('✅ Click ajouté sur Mode Automatique');
}

console.log('\\n🎉 Réparation terminée ! Vous pouvez maintenant cliquer sur les modes.');
`;

console.log('📋 Instructions :');
console.log('1. Ouvrez la console dans l\'application (Cmd+Option+I sur Mac)');
console.log('2. Copiez et collez le code suivant :');
console.log('----------------------------------------');
console.log(fixCode);
console.log('----------------------------------------');
console.log('\n3. Appuyez sur Entrée pour exécuter');
console.log('4. Les modes devraient maintenant fonctionner !');

// Sauvegarder aussi dans un fichier pour faciliter
const fs = require('fs');
fs.writeFileSync('fix-mode-console.js', fixCode);
console.log('\n💾 Code sauvegardé dans: fix-mode-console.js'); 