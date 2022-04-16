const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow() {
    const win = new BrowserWindow({
        width: 1450,
        height: 750,
        minWidth: 1250,
        minHeight: 650,
        frame: true,
        devTools: true,
        icon: path.join(__dirname, 'src/style/icons/icon_top_bar.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.loadFile('src/index.html')
    win.setBackgroundColor('#000000')

    // minimize app
    ipc.on('minimizeApp', () => { win.minimize() })

    // maximize restore app
    ipc.on('maximizeRestoreApp', () => {
        if (win.isMaximized()) {
            win.restore()
        } else {
            win.maximize()
        }
    })

    // close app
    ipc.on('closeApp', () => {
        win.close()
    })

    // check if is maximized
    win.on('maximize', () => { win.webContents.send('isMaximized') })

    // check if is restord
    win.on('unmaximize', () => { win.webContents.send('isRestored') })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) { createWindow() }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit() }
})