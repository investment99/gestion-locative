const fs = require('fs');
const path = require('path');

console.log('🚨 NETTOYAGE ET RESTAURATION COMPLÈTE...\n');

// 1. Supprimer tous les fichiers créés pendant les modifications
const filesToDelete = [
    'gestion-locative-supabase.html',
    'gestion-locative-supabase-clean.html',
    'fix-mode-display.js',
    'fix-mode-info-display.js',
    'fix-auto-mode-display.js',
    'fix-sync-immediate.js',
    'add-sync-button.js',
    'fix-tenant-sync.js',
    'fix-correct-login.js',
    'fix-login-temp.js',
    'fix-login-final.js',
    'fix-all-login.js',
    'get-agency-id.js',
    'integrate-supabase-clean.js',
    'patch-supabase-functions.js',
    'migrer-vers-supabase.js'
];

filesToDelete.forEach(file => {
    try {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`🗑️  Supprimé: ${file}`);
        }
    } catch (err) {
        // Ignorer les erreurs
    }
});

// 2. Restaurer main.js
const mainPath = path.join(__dirname, 'main.js');
let mainContent = fs.readFileSync(mainPath, 'utf8');
mainContent = mainContent.replace(
    /mainWindow\.loadFile\([^)]+\);/,
    "mainWindow.loadFile('gestion-locative-complete.html');"
);
fs.writeFileSync(mainPath, mainContent);

// 3. Vérifier si le fichier original existe
const originalPath = path.join(__dirname, 'gestion-locative-complete.html');
if (!fs.existsSync(originalPath)) {
    console.log('❌ ERREUR: Le fichier original gestion-locative-complete.html n\'existe pas !');
    console.log('Vous devrez peut-être le récupérer depuis une sauvegarde.');
} else {
    console.log('✅ Fichier original trouvé et intact');
}

console.log('\n✅ NETTOYAGE TERMINÉ !');
console.log('\n🚀 Actions à faire :');
console.log('1. Fermez complètement l\'application (Ctrl+C)');
console.log('2. Relancez avec: npm start');
console.log('3. Votre application sera restaurée à son état original');
console.log('\n⚠️  Si des problèmes persistent, vous pouvez :');
console.log('- Récupérer gestion-locative-complete.html depuis votre sauvegarde');
console.log('- Ou me demander de recréer les fonctionnalités manquantes'); 