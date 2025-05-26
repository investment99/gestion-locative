const fs = require('fs');
const path = require('path');

console.log('🔧 Réparation de l\'application en cours...\n');

// 1. Sauvegarder le fichier actuel
const backupPath = 'gestion-locative-complete.backup.html';
const originalPath = 'gestion-locative-complete.html';

if (fs.existsSync(originalPath)) {
    fs.copyFileSync(originalPath, backupPath);
    console.log('✅ Sauvegarde créée:', backupPath);
}

// 2. Restaurer depuis clean-restore.js si possible
if (fs.existsSync('clean-restore.js')) {
    console.log('\n🔄 Tentative de restauration depuis clean-restore.js...');
    try {
        require('./clean-restore.js');
        console.log('✅ Restauration réussie !');
    } catch (error) {
        console.log('❌ Erreur lors de la restauration:', error.message);
    }
}

// 3. Remettre main.js sur le bon fichier
const mainJsPath = 'main.js';
let mainContent = fs.readFileSync(mainJsPath, 'utf8');
mainContent = mainContent.replace(
    /mainWindow\.loadFile\(['"].*?['"]\);/,
    "mainWindow.loadFile('gestion-locative-complete.html');"
);
fs.writeFileSync(mainJsPath, mainContent);
console.log('\n✅ main.js mis à jour pour charger le bon fichier');

// 4. Créer des données de test
console.log('\n📝 Création de données de test...');

const testData = {
    properties: [
        {
            id: 1,
            type: 'Appartement T3',
            propertyTitle: 'Bel appartement lumineux',
            address: '123 rue de la Paix, Paris',
            surface: '75',
            rooms: '3',
            rent: '1200',
            charges: '150',
            images: []
        }
    ],
    tenants: [
        {
            id: 1,
            firstName: 'Marie',
            lastName: 'Dupont',
            email: 'marie.dupont@email.com',
            phone: '0612345678',
            password: 'marie123',
            propertyId: 1,
            score: 95
        }
    ],
    conversations: {},
    documents: {}
};

// Sauvegarder dans localStorage (simulé)
const localStorageScript = `
<script>
// Initialiser les données de test
if (!localStorage.getItem('properties')) {
    localStorage.setItem('properties', '${JSON.stringify(testData.properties)}');
    localStorage.setItem('tenants', '${JSON.stringify(testData.tenants)}');
    localStorage.setItem('conversations', '{}');
    localStorage.setItem('documents', '{}');
    console.log('✅ Données de test initialisées');
}
</script>
`;

console.log('\n✅ Script de réparation terminé !');
console.log('\n📋 Instructions :');
console.log('1. Relancez l\'application avec: npm start');
console.log('2. Connectez-vous avec:');
console.log('   - Admin: admin@gestion.com / admin123');
console.log('   - Locataire: marie.dupont@email.com / marie123');
console.log('\n💡 Si ça ne marche toujours pas, utilisez simple-test.html'); 