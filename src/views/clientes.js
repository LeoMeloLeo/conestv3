
//Menu personalizado
Menu.setApplicationMenu(Menu.buildFromTemplate(template))

win.loadFile('./src/views/index.html')

//botoes
ipcMain.on('open-client', ()=> {
  
})

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
