// Script pour forcer la connexion admin
// À exécuter dans la console du navigateur de l'application

// Forcer la connexion admin
localStorage.setItem('currentUser', JSON.stringify({
    type: 'admin',
    email: 'admin@gestion.com',
    name: 'Administrateur'
}));

localStorage.setItem('isLoggedIn', 'true');

// Créer des données de test si nécessaire
if (!localStorage.getItem('properties')) {
    localStorage.setItem('properties', JSON.stringify([{
        id: 1,
        type: 'Appartement T3',
        propertyTitle: 'Bel appartement lumineux',
        address: '123 rue de la Paix, Paris',
        surface: '75',
        rooms: '3',
        rent: '1200',
        charges: '150',
        images: []
    }]));
}

if (!localStorage.getItem('tenants')) {
    localStorage.setItem('tenants', JSON.stringify([{
        id: 1,
        firstName: 'Marie',
        lastName: 'Dupont',
        email: 'marie.dupont@email.com',
        phone: '0612345678',
        password: 'marie123',
        propertyId: 1,
        score: 95
    }]));
}

console.log('✅ Connexion forcée ! Rechargez la page.');
alert('Connexion forcée ! Cliquez sur OK puis rechargez la page (Ctrl+R ou Cmd+R)'); 