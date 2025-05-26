// Configuration pour personnaliser l'application par agence
module.exports = {
    // Configuration de base
    agency: {
        name: "Nom de l'Agence",
        logo: "./assets/logo-agence.png",
        primaryColor: "#2a5298",
        secondaryColor: "#1e3c72",
        contact: {
            email: "contact@agence.com",
            phone: "01 23 45 67 89",
            website: "https://www.agence.com"
        }
    },
    
    // Configuration de la base de données
    database: {
        type: "local", // "local" ou "cloud"
        cloudUrl: "", // Si type = "cloud"
        syncInterval: 300000 // 5 minutes
    },
    
    // Fonctionnalités activées/désactivées
    features: {
        aiChat: true,
        marketplace: true,
        esg: true,
        multiUser: true,
        offlineMode: true
    },
    
    // Limites selon le plan
    limits: {
        maxProperties: -1, // -1 = illimité
        maxTenants: -1,
        maxUsers: 10
    },
    
    // Licence
    license: {
        type: "premium", // "basic", "pro", "premium"
        expiresAt: null, // null = perpétuelle
        key: ""
    }
}; 