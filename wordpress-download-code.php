<?php
/**
 * Code à ajouter dans WordPress
 * Méthode 1: Dans functions.php de votre thème
 * Méthode 2: Avec un plugin de code personnalisé
 * Méthode 3: Directement dans une page avec un plugin de shortcode
 */

// SHORTCODE POUR LA PAGE DE TÉLÉCHARGEMENT
function gestion_locative_download_page() {
    ob_start();
    ?>
    <style>
        .glp-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .glp-header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
            border-radius: 20px 20px 0 0;
            margin: -20px -20px 0 -20px;
        }
        
        .glp-header h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: 700;
        }
        
        .glp-header p {
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .glp-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            padding: 60px 0;
        }
        
        .glp-screenshot {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .glp-screenshot img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .glp-download-section h2 {
            font-size: 2rem;
            color: #1e3c72;
            margin-bottom: 30px;
        }
        
        .glp-features {
            list-style: none;
            margin-bottom: 40px;
            padding: 0;
        }
        
        .glp-features li {
            padding: 15px 0;
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            color: #333;
        }
        
        .glp-features li:before {
            content: "✓";
            color: #4CAF50;
            font-weight: bold;
            margin-right: 15px;
            font-size: 1.3rem;
        }
        
        .glp-download-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white !important;
            padding: 20px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 15px;
            text-decoration: none;
            margin-bottom: 20px;
        }
        
        .glp-download-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            color: white !important;
        }
        
        .glp-pdf-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: #2a5298;
            text-decoration: none;
            font-weight: 500;
            margin-top: 15px;
        }
        
        .glp-badges {
            display: flex;
            gap: 20px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        
        .glp-badge {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 20px;
            background: #f0f4f8;
            border-radius: 30px;
            font-size: 0.9rem;
            color: #333;
        }
        
        .glp-system-req {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
        }
        
        @media (max-width: 768px) {
            .glp-content {
                grid-template-columns: 1fr;
            }
            .glp-header h1 {
                font-size: 2rem;
            }
        }
    </style>
    
    <div class="glp-container">
        <div class="glp-header">
            <h1>Gestion Locative Pro</h1>
            <p>L'application tout-en-un pour la gestion immobilière moderne avec intelligence artificielle intégrée</p>
        </div>
        
        <div class="glp-content">
            <div class="glp-screenshot">
                <img src="https://investment99.github.io/gestion-locative/screenshot-app.png" alt="Capture d'écran de Gestion Locative Pro">
            </div>
            
            <div class="glp-download-section">
                <h2>Prêt à révolutionner votre gestion locative ?</h2>
                
                <ul class="glp-features">
                    <li>Gestion complète des biens et locataires</li>
                    <li>Chat intelligent avec IA intégrée</li>
                    <li>Mode automatique pour gagner du temps</li>
                    <li>Rappels et relances automatisés</li>
                    <li>Interface moderne et intuitive</li>
                </ul>
                
                <a href="https://investment99.github.io/gestion-locative/downloads/Gestion-Locative-Pro-1.0.0-arm64.dmg" 
                   class="glp-download-btn" download>
                    🍎 Télécharger pour Mac
                </a>
                
                <br>
                
                <a href="https://investment99.github.io/gestion-locative/guide-demarrage-rapide.pdf" 
                   class="glp-pdf-link">
                    📄 Guide de démarrage rapide (PDF)
                </a>
                
                <div class="glp-badges">
                    <div class="glp-badge">
                        🛡️ Certifié Apple
                    </div>
                    <div class="glp-badge">
                        🔒 100% Sécurisé
                    </div>
                    <div class="glp-badge">
                        🚀 Installation rapide
                    </div>
                </div>
                
                <div class="glp-system-req">
                    <h3>Configuration requise</h3>
                    <p>
                        • macOS 10.13 ou plus récent<br>
                        • Processeur Intel ou Apple Silicon (M1/M2/M3)<br>
                        • 4 GB de RAM minimum<br>
                        • 200 MB d'espace disque
                    </p>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// Enregistrer le shortcode
add_shortcode('gestion_locative_download', 'gestion_locative_download_page');

// ALTERNATIVE : CODE HTML DIRECT POUR GUTENBERG
?>

<!-- 
POUR UTILISER DANS WORDPRESS :

1. MÉTHODE SHORTCODE (Recommandé) :
   - Copiez le code PHP ci-dessus dans functions.php
   - Dans votre page, utilisez : [gestion_locative_download]

2. MÉTHODE BLOC HTML PERSONNALISÉ :
   - Créez une page dans WordPress
   - Ajoutez un bloc "HTML personnalisé"
   - Collez le code HTML ci-dessous
-->

<!-- CODE HTML POUR BLOC PERSONNALISÉ WORDPRESS -->
<div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 60px 40px; text-align: center; border-radius: 20px;">
        <h1 style="font-size: 3rem; margin-bottom: 20px; font-weight: 700;">Gestion Locative Pro</h1>
        <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">L'application tout-en-un pour la gestion immobilière moderne avec intelligence artificielle intégrée</p>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 60px 0;">
        <div style="border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <img src="https://investment99.github.io/gestion-locative/screenshot-app.png" alt="Gestion Locative Pro" style="width: 100%; height: auto;">
        </div>
        
        <div>
            <h2 style="font-size: 2rem; color: #1e3c72; margin-bottom: 30px;">Prêt à révolutionner votre gestion locative ?</h2>
            
            <ul style="list-style: none; margin-bottom: 40px; padding: 0;">
                <li style="padding: 15px 0; font-size: 1.1rem;">✅ Gestion complète des biens et locataires</li>
                <li style="padding: 15px 0; font-size: 1.1rem;">✅ Chat intelligent avec IA intégrée</li>
                <li style="padding: 15px 0; font-size: 1.1rem;">✅ Mode automatique pour gagner du temps</li>
                <li style="padding: 15px 0; font-size: 1.1rem;">✅ Rappels et relances automatisés</li>
                <li style="padding: 15px 0; font-size: 1.1rem;">✅ Interface moderne et intuitive</li>
            </ul>
            
            <a href="https://investment99.github.io/gestion-locative/downloads/Gestion-Locative-Pro-1.0.0-arm64.dmg" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 40px; border-radius: 50px; font-size: 1.2rem; font-weight: 600; text-decoration: none; display: inline-block; margin-bottom: 20px;">
                🍎 Télécharger pour Mac
            </a>
            
            <br><br>
            
            <a href="https://investment99.github.io/gestion-locative/guide-demarrage-rapide.pdf" style="color: #2a5298; text-decoration: none; font-weight: 500;">
                📄 Guide de démarrage rapide (PDF)
            </a>
            
            <div style="display: flex; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
                <span style="padding: 10px 20px; background: #f0f4f8; border-radius: 30px;">🛡️ Certifié Apple</span>
                <span style="padding: 10px 20px; background: #f0f4f8; border-radius: 30px;">🔒 100% Sécurisé</span>
                <span style="padding: 10px 20px; background: #f0f4f8; border-radius: 30px;">🚀 Installation rapide</span>
            </div>
        </div>
    </div>
</div> 