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

    mainWindow.loadFile('./dist/index.html')

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
console.log(app);
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})