const fs = require('fs');
const path = require('path');

console.log('🚨 RESTAURATION URGENTE de l\'application...\n');

// Restaurer main.js pour charger le fichier original
const mainPath = path.join(__dirname, 'main.js');
let mainContent = fs.readFileSync(mainPath, 'utf8');

// Remplacer pour charger le fichier original
mainContent = mainContent.replace(
    /mainWindow\.loadFile\([^)]+\);/,
    "mainWindow.loadFile('gestion-locative-complete.html');"
);

fs.writeFileSync(mainPath, mainContent);

console.log('✅ Application restaurée !');
console.log('\n🚀 Actions à faire :');
console.log('1. Fermez l\'application (Ctrl+C)');
console.log('2. Relancez avec: npm start');
console.log('3. L\'application fonctionnera normalement');
console.log('\n📝 Pour Supabase, on reprendra plus tard avec une approche plus prudente.'); 