
const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron/main')
const path = require('node:path')
// Janela principal
let win 
function createWindow() {
    win = new BrowserWindow({
        width: 1010, 
        height: 720, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')

    // Botões
    ipcMain.on('open-client', () => {
        clientWindow()
    })

    ipcMain.on('open-fornecedor', () => {
        fornecedorWindow()
    })

    ipcMain.on('open-product', () => {
        productWindow()
    })

    ipcMain.on('open-report', () => {
        reportWindow()
    })
}

// Janela sobre
function aboutWindow() {
    const main = BrowserWindow.getFocusedWindow()
    let about
    if (main) {
        about = new BrowserWindow({
            width: 350,
            height: 230,
            autoHideMenuBar: true, 
            resizable: false,
            minimizable: false, 
            parent: main, 
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    about.loadFile('./src/views/sobre.html')

    ipcMain.on('close-about', () => {
        console.log("Recebi a mensage close-about")
        if (about && !about.isDestroyed()) {
            about.close()
        }
    })
}

// Janela Clientes
function clientWindow() {
    const main = BrowserWindow.getFocusedWindow()
    let client
    if (main) {
        client = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, 
            parent: main, 
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    client.loadFile('./src/views/clientes.html')
}

// Janela fornecedor
function fornecedorWindow() {
    const main = BrowserWindow.getFocusedWindow()
    let fornecedor
    if (main) {
        fornecedor = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, 
            parent: main, 
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    fornecedor.loadFile('./src/views/fornecedores.html')
}

// Janela produto
function productWindow() {
    const main = BrowserWindow.getFocusedWindow()
    let produto
    if (main) {
        produto = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, 
            parent: main, 
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    produto.loadFile('./src/views/produtos.html')
}

// Janela relatorio
function reportWindow() {
    const main = BrowserWindow.getFocusedWindow()
    let relatorio
    if (main) {
       relatorio = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, 
            parent: main, 
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    relatorio.loadFile('./src/views/relatorios.html')
}





// Janela Produtos
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                accelerator: 'Alt+F4',
                click: () => app.quit()
            }
        ]
    },
    {
        label: 'Zoom',
        submenu: [
            {
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o Zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositório',
                click: () => shell.openExternal('https://github.com/LeoMeloLeo/conestv3.git')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]