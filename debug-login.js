const fs = require('fs');
const path = require('path');

console.log('🔍 Débogage de la connexion...\n');

const htmlPath = path.join(__dirname, 'gestion-locative-supabase.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Chercher la fonction loginAdmin
const loginStart = htmlContent.indexOf('function loginAdmin()');
const asyncLoginStart = htmlContent.indexOf('async function loginAdmin()');

console.log('Fonction loginAdmin trouvée à:', loginStart);
console.log('Fonction async loginAdmin trouvée à:', asyncLoginStart);

// Vérifier si Supabase est bien inclus
const supabaseIncluded = htmlContent.includes('supabaseClient');
console.log('\nSupabase est inclus:', supabaseIncluded);

// Vérifier les IDs des éléments
const hasAdminEmail = htmlContent.includes('adminEmail');
const hasAdminPassword = htmlContent.includes('adminPassword');
console.log('\nÉléments du formulaire:');
console.log('- adminEmail:', hasAdminEmail);
console.log('- adminPassword:', hasAdminPassword);

// Extraire et afficher la fonction loginAdmin actuelle
if (loginStart !== -1) {
    const funcEnd = htmlContent.indexOf('}', htmlContent.indexOf('{', loginStart)) + 1;
    const currentFunc = htmlContent.substring(loginStart, funcEnd);
    console.log('\nFonction loginAdmin actuelle (non-async):');
    console.log(currentFunc.substring(0, 200) + '...');
}

if (asyncLoginStart !== -1) {
    const funcEnd = htmlContent.indexOf('}', htmlContent.indexOf('{', asyncLoginStart)) + 1;
    const currentFunc = htmlContent.substring(asyncLoginStart, funcEnd);
    console.log('\nFonction async loginAdmin actuelle:');
    console.log(currentFunc.substring(0, 200) + '...');
} 