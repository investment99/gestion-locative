const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Créer la fenêtre principale
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        icon: path.join(__dirname, 'icon.png'), // Vous pouvez ajouter une icône
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        title: 'Gestion Locative Pro'
    });

    // Charger l'application
    mainWindow.loadFile('gestion-locative-complete.html');

    // Menu personnalisé
    const menuTemplate = [
        {
            label: 'Fichier',
            submenu: [
                {
                    label: 'Nouvelle fenêtre',
                    accelerator: 'CmdOrCtrl+N',
                    click() {
                        createWindow();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quitter',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Édition',
            submenu: [
                { label: 'Annuler', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                { label: 'Rétablir', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                { type: 'separator' },
                { label: 'Couper', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                { label: 'Copier', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                { label: 'Coller', accelerator: 'CmdOrCtrl+V', role: 'paste' }
            ]
        },
        {
            label: 'Affichage',
            submenu: [
                { label: 'Recharger', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                { label: 'Plein écran', accelerator: 'F11', role: 'togglefullscreen' },
                { type: 'separator' },
                { label: 'Zoom avant', accelerator: 'CmdOrCtrl+Plus', role: 'zoomin' },
                { label: 'Zoom arrière', accelerator: 'CmdOrCtrl+-', role: 'zoomout' },
                { label: 'Réinitialiser le zoom', accelerator: 'CmdOrCtrl+0', role: 'resetzoom' }
            ]
        },
        {
            label: 'Aide',
            submenu: [
                {
                    label: 'Documentation',
                    click() {
                        shell.openExternal('https://github.com/investment99/gestion-locative');
                    }
                },
                {
                    label: 'À propos',
                    click() {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'À propos',
                            message: 'Gestion Locative Pro',
                            detail: 'Application de gestion immobilière avec IA intégrée.\n\nVersion 1.0.0\n\nDéveloppé pour les agences immobilières modernes.',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Gérer la fermeture
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Quand Electron est prêt
app.whenReady().then(createWindow);

// Quitter quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Sur macOS, recréer une fenêtre quand on clique sur l'icône
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Nom de l'application
app.setName('Gestion Locative Pro'); 