const { app, BrowserWindow } = require('electron');
// Import core Electron modules to manage application lifecyle and app windows
const url = require('url');
const path = require('path');
// Import Node.js modules to handle and transform file paths

function createMainWindow() { //responsible for instantiate the window uwsing the specified configuration options
    const mainWindow = new BrowserWindow({
        title: 'Pawmodoro Timer',
        width: 546,
        height: 580,
        webPreferences: { //security and runtime settings
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL( //converts local index.html to url format and loads it into the window
        url.format({
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    mainWindow.on('closed', function() { //triggered when the window is closed and the app is quit
        app.quit();
    });
}

app.whenReady().then(createMainWindow); //waits for the app to be ready before creating the main window