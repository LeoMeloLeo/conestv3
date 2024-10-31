
//importação de pacotes (bibliotecas)
// nativeTheme (forçar um tema no OS)
// Menu (criar um menu personalizado)
// shell (acessar links externos)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')
const path = require('node:path')

//janela principal
let win
function createWindow() {
  nativeTheme.themeSource = 'light'
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //Menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')

  //botoes
  ipcMain.on('open-client', ()=> {
    
  })
}

//janela sobre (secudaria)
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  //a linha abaixo obtem a jenela principal
  const main = BrowserWindow.getFocusedWindow()
  let about
  // validar a janela pai
  if (main){
    about = new BrowserWindow({
      width: 320,
      height: 160,
      autoHideMenuBar: true, 
      resizable: false, 
      minimizable: false, 
      //titleBarStyle: 'hidden' //esconder a barra de estilo (ex: totem de auto atendimento)
      parent: main, 
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  about.loadFile('./src/views/sobre.html')
  
  //fechar a janela quando receber mensagem do processo de renderização.
  ipcMain.on('close-about', () => {
      //validar se a janela foi destruida
      if(about && !about.isDestroyed()){
        about.close()
      }
  })
}


//execução assincrona do aplicativo electron
app.whenReady().then(() => {
  createWindow()
  //aboutWindow()
  // comportamento do MAC ao fechar um janela
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// encerrar a aplicação quando a janela for fechada (Linux e Windows)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//template do menu
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
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar o zoom padrão',
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