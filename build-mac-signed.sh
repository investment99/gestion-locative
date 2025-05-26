#!/bin/bash

# Script de build avec signature et notarisation Apple

echo "🚀 Build de Gestion Locative Pro avec signature Apple..."

# Variables d'environnement
export APPLE_ID="cayenne99@gmail.com"  # Votre Apple ID principal
export APPLE_APP_SPECIFIC_PASSWORD="sktq-jwql-bbng-yrhs"  # Votre mot de passe spécifique
export APPLE_TEAM_ID="7KQ5AZJD7T"

# Optionnel : Si vous avez exporté votre certificat
# export CSC_LINK="./certificates/DeveloperID.p12"
# export CSC_KEY_PASSWORD="votre-mot-de-passe-p12"

echo "📝 Configuration:"
echo "   Team ID: $APPLE_TEAM_ID"
echo "   Apple ID: $APPLE_ID"
echo "   Bundle ID: com.gestionlocative.pro"

# Clean previous build
echo "🧹 Nettoyage..."
rm -rf dist/

# Build avec signature et notarisation
echo "🔨 Build en cours..."
echo "⏱️  Cela peut prendre 5-10 minutes avec la notarisation..."
npm run build-mac

echo "✅ Build terminé !"
echo "📦 Votre app signée et notarisée est dans le dossier 'dist/'"
echo ""
echo "🎯 Prochaines étapes:"
echo "   1. Testez le DMG sur un autre Mac"
echo "   2. L'app s'ouvrira sans avertissement de sécurité"
echo "   3. Distribuez aux agences immobilières !" 