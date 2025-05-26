# ⚙️ Configuration de l'Application

## 🔑 Configuration de la clé API OpenAI

Pour activer les fonctionnalités IA, vous devez configurer votre clé API OpenAI :

1. **Obtenez une clé API** sur [platform.openai.com](https://platform.openai.com/api-keys)

2. **Dans le fichier `index.html`**, remplacez :
   ```javascript
   const OPENAI_API_KEY = 'VOTRE_CLE_API_ICI';
   ```
   Par :
   ```javascript
   const OPENAI_API_KEY = 'sk-...votre-vraie-clé...';
   ```

## ⚠️ IMPORTANT - Sécurité

**NE JAMAIS** commiter votre vraie clé API sur GitHub !

### Options sécurisées :

1. **Variables d'environnement** (production)
2. **Fichier de config local** (non commité)
3. **Backend sécurisé** (recommandé)

## 🗺️ Configuration Google Maps

La clé Google Maps est déjà configurée dans l'application.

## 🚀 Déploiement

Sans clé API, l'application fonctionne en mode "dégradé" :
- ✅ Toutes les fonctionnalités de base
- ✅ Chat manuel
- ❌ Réponses IA automatiques

Pour un déploiement sécurisé, utilisez un backend qui stocke la clé API. 