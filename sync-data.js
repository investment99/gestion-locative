// Script pour synchroniser les données entre Electron et le navigateur
// À exécuter dans la console de l'app Electron

// Récupérer les données actuelles du navigateur
const browserData = {
    conversations: {
        "1748165762970": [
            {
                "type": "sent",
                "content": "salut",
                "timestamp": "2025-05-25T09:56:41.062Z"
            },
            {
                "type": "received",
                "content": "j'ai une fuite d'eau",
                "timestamp": "2025-05-25T10:03:58.406Z"
            },
            {
                "type": "sent",
                "content": "🤖 J'ai bien pris en compte votre demande concernant une fuite d'eau.\n\n✅ Actions effectuées :\n• Intervention créée #1748167440410\n• Devis demandé à Plomberie Express\n• RDV proposé : 27/05/2025\n\n📅 Un technicien de Plomberie Express vous contactera pour confirmer le RDV du 27/05/2025.\n\nJe reste à votre disposition pour toute question.",
                "timestamp": "2025-05-25T10:04:00.411Z",
                "isAutomatic": true,
                "actions": [
                    "Intervention créée #1748167440410",
                    "Devis demandé à Plomberie Express",
                    "RDV proposé : 27/05/2025"
                ]
            },
            {
                "type": "sent",
                "content": "oui",
                "timestamp": "2025-05-25T10:06:15.654Z"
            },
            {
                "type": "sent",
                "content": "on sen cocupe",
                "timestamp": "2025-05-25T10:06:26.467Z"
            },
            {
                "type": "sent",
                "content": "oui",
                "timestamp": "2025-05-25T10:09:54.256Z"
            },
            {
                "type": "received",
                "content": "oui",
                "timestamp": "2025-05-25T10:10:05.491Z"
            },
            {
                "type": "sent",
                "content": "📅 Rappel automatique : N'oubliez pas le paiement du loyer.",
                "timestamp": "2025-05-25T11:44:42.332Z",
                "automated": true
            },
            {
                "type": "sent",
                "content": "📅 Rappel automatique : N'oubliez pas le paiement du loyer.",
                "timestamp": "2025-05-25T13:56:22.101Z",
                "automated": true
            },
            {
                "type": "sent",
                "content": "📅 Rappel automatique : N'oubliez pas le paiement du loyer.",
                "timestamp": "2025-05-25T15:52:11.466Z",
                "automated": true
            },
            {
                "type": "received",
                "content": "bonjour",
                "timestamp": "2025-05-25T17:21:04.536Z"
            },
            {
                "type": "received",
                "content": "bonjour",
                "timestamp": "2025-05-25T17:21:32.147Z"
            },
            {
                "type": "received",
                "content": "oui",
                "timestamp": "2025-05-25T17:22:48.697Z"
            },
            {
                "type": "received",
                "content": "salut",
                "timestamp": "2025-05-25T17:23:31.964Z"
            }
        ]
    }
};

// Pour copier dans l'app Electron, exécutez ceci dans la console de l'app :
// localStorage.setItem('conversations', JSON.stringify(browserData.conversations)); 