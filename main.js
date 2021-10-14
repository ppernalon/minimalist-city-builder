const path = require("path");
const {BrowserWindow, app} = require("electron");


let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            pathname: path.join(__dirname, `preload.js`),
        }
    })
    mainWindow.maximize()
    mainWindow.loadFile('./dist/index.html')
    mainWindow.show()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})