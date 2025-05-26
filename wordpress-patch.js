// Patch WordPress pour Gestion Locative
// Ce fichier contient les fonctions manquantes et les adaptations pour WordPress

// Fermer le chat
function closeChat() {
    document.getElementById('chatModal').style.display = 'none';
}

// Rafraîchir le chat
function refreshChat() {
    const tenantId = document.getElementById('chatModal').dataset.currentTenantId;
    if (!tenantId) return;
    
    const tenant = DB.tenants.find(t => t.id == tenantId);
    if (!tenant) return;
    
    // Recharger les messages
    const messages = DB.conversations[tenantId] || [];
    const chatContainer = document.getElementById('chatMessages');
    
    if (messages.length === 0) {
        chatContainer.innerHTML = '<div class="message received"><div class="message-content">Aucun message pour le moment</div></div>';
    } else {
        chatContainer.innerHTML = messages.map(msg => {
            const isFromAdmin = msg.type === 'sent';
            return `
                <div class="message ${isFromAdmin ? 'sent' : 'received'}">
                    <div class="message-content">
                        ${msg.content}
                        <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Animation de rafraîchissement
    const refreshBtn = event.target.closest('button');
    if (refreshBtn) {
        refreshBtn.querySelector('i').classList.add('fa-spin');
        setTimeout(() => {
            refreshBtn.querySelector('i').classList.remove('fa-spin');
        }, 500);
    }
}

// Gestion du mode global
let globalMode = localStorage.getItem('globalMode') || 'manual';

// Définir le mode global
function setGlobalMode(mode) {
    globalMode = mode;
    localStorage.setItem('globalMode', mode);
    
    // Mettre à jour l'interface
    document.getElementById('manualModeDesc').style.display = mode === 'manual' ? 'block' : 'none';
    document.getElementById('autoModeDesc').style.display = mode === 'auto' ? 'block' : 'none';
    document.getElementById('realtimeNotifications').style.display = mode === 'manual' ? 'block' : 'none';
    
    // Si on passe en mode manuel, activer la surveillance des messages
    if (mode === 'manual') {
        startMessageMonitoring();
    } else {
        stopMessageMonitoring();
    }
    
    console.log(`Mode ${mode} activé`);
}

// Surveillance des messages en mode manuel
let messageMonitorInterval = null;
let lastMessageCounts = {};

function startMessageMonitoring() {
    // Initialiser les compteurs
    DB.tenants.forEach(tenant => {
        const messages = DB.conversations[tenant.id] || [];
        lastMessageCounts[tenant.id] = messages.length;
    });
    
    // Vérifier les nouveaux messages toutes les 2 secondes
    messageMonitorInterval = setInterval(checkForNewMessages, 2000);
}

function stopMessageMonitoring() {
    if (messageMonitorInterval) {
        clearInterval(messageMonitorInterval);
        messageMonitorInterval = null;
    }
}

// Vérifier les nouveaux messages
function checkForNewMessages() {
    // Recharger la DB pour avoir les derniers messages
    loadDB();
    
    console.log('🔍 Vérification des nouveaux messages...');
    
    DB.tenants.forEach(tenant => {
        const messages = DB.conversations[tenant.id] || [];
        const currentCount = messages.length;
        const lastCount = lastMessageCounts[tenant.id] || 0;
        
        console.log(`Locataire ${tenant.firstName}: ${currentCount} messages (avant: ${lastCount})`);
        
        if (currentCount > lastCount) {
            // Nouveau message détecté
            const newMessages = messages.slice(lastCount);
            newMessages.forEach(msg => {
                if (msg.type === 'received') {
                    // Message du locataire
                    console.log('📨 Nouveau message détecté:', msg.content);
                    showNotification(tenant, msg);
                    playNotificationSound();
                }
            });
        }
        
        lastMessageCounts[tenant.id] = currentCount;
    });
}

// Afficher une notification
function showNotification(tenant, message) {
    const notificationsList = document.getElementById('notificationsList');
    const notification = document.createElement('div');
    notification.className = 'notification-item';
    notification.style.cssText = 'padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; margin-bottom: 10px; border-radius: 5px; cursor: pointer; transition: all 0.3s;';
    
    notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>${tenant.firstName} ${tenant.lastName}</strong>
                <p style="margin: 5px 0 0 0; color: #666;">${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}</p>
                <small style="color: #999;">${new Date(message.timestamp).toLocaleTimeString('fr-FR')}</small>
            </div>
            <button class="btn" onclick="openChat('${tenant.email}')" style="padding: 5px 15px;">
                <i class="fas fa-reply"></i> Répondre
            </button>
        </div>
    `;
    
    // Ajouter en haut de la liste
    notificationsList.insertBefore(notification, notificationsList.firstChild);
    
    // Animation d'entrée
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Limiter à 10 notifications
    while (notificationsList.children.length > 10) {
        notificationsList.removeChild(notificationsList.lastChild);
    }
}

// Jouer un son de notification
function playNotificationSound() {
    try {
        // Méthode simple avec Audio API
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWTAkPVqzq67JlGAUvgs/y2oo3CBNltfDwn1ALD1Sj5eqsWxEGOYjS9NZ7JgUrdMbtxIY+CRlqwPDjm0wKElas5+uxWBEIRJ7f8sNwIAUyf87x3oo2CBVhtPDtp1UMDVKm5+q1YRcHNIDS8dp+KgUqeMjw14w6CRVlve/nmU8KElOq5OurWBEGOIzU8tiELAUpd8vx2o4+CRlmv+/mnEwJ');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Erreur audio:', e));
        console.log('🔔 Son de notification joué');
    } catch (error) {
        console.error('Erreur lors de la lecture du son:', error);
    }
}

// Gérer la touche Entrée (locataire)
function handleTenantKeyPress(event) {
    if (event.key === 'Enter') {
        sendTenantMessage();
    }
}

// Charger les documents du locataire
function loadTenantDocuments() {
    const tenant = window.currentUser.data;
    const documents = DB.documents[tenant.id] || [];
    const container = document.getElementById('tenantDocuments');
    
    if (documents.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#666;">Aucun document disponible</p>';
    } else {
        container.innerHTML = documents.map((doc, index) => `
            <div style="padding:15px;background:#f8f9fa;border-radius:5px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <strong>📄 ${doc.name}</strong>
                    <p style="margin:5px 0 0 0;color:#666;font-size:0.9rem;">
                        Ajouté le ${new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                    </p>
                </div>
                <button class="btn" onclick="downloadDocument(${tenant.id}, ${index})" style="padding:5px 15px;">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            </div>
        `).join('');
    }
}

// Rafraîchir le chat du locataire
function refreshTenantChat() {
    loadTenantChat();
    // Animation du bouton
    const btn = event.target.closest('button');
    if (btn) {
        btn.querySelector('i').classList.add('fa-spin');
        setTimeout(() => {
            btn.querySelector('i').classList.remove('fa-spin');
        }, 500);
    }
}

// Initialiser le mode au chargement
window.addEventListener('load', function() {
    // Restaurer le mode
    const savedMode = localStorage.getItem('globalMode') || 'manual';
    const modeRadio = document.querySelector(`input[name="globalMode"][value="${savedMode}"]`);
    if (modeRadio) {
        modeRadio.checked = true;
        setGlobalMode(savedMode);
    }
});

// Diagnostic WordPress amélioré
function wordPressCompatibilityCheck() {
    console.log('=== VÉRIFICATION COMPATIBILITÉ WORDPRESS ===');
    
    // Vérifier les conflits potentiels
    if (typeof jQuery !== 'undefined') {
        console.log('⚠️ jQuery détecté - Utiliser jQuery.noConflict() si nécessaire');
    }
    
    // Vérifier le localStorage
    try {
        localStorage.setItem('wp_test', 'test');
        localStorage.removeItem('wp_test');
        console.log('✅ localStorage fonctionne correctement');
    } catch (e) {
        console.error('❌ Problème avec localStorage:', e);
    }
    
    // Vérifier les fonctions critiques
    const criticalFunctions = [
        'handleAutomaticResponse',
        'sendTenantMessage',
        'analyzeMessage',
        'createAutomaticIntervention',
        'findBestProvider',
        'requestAutomaticQuote',
        'scheduleAppointment',
        'handlePaymentQuery',
        'handleDocumentRequest'
    ];
    
    criticalFunctions.forEach(func => {
        if (typeof window[func] === 'function') {
            console.log(`✅ ${func} disponible`);
        } else {
            console.error(`❌ ${func} manquante !`);
        }
    });
    
    console.log('=====================================');
}

// Lancer la vérification après 3 secondes
setTimeout(wordPressCompatibilityCheck, 3000);

console.log('🔧 Patch WordPress chargé avec succès !'); 