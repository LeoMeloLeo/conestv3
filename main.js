
const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

//importação do módulo de conexão
const { dbConnect, desconectar} = require('./database.js')
// status de conexão com o banco de dados. No mongoDB é mais eficiente manter uma unica conexão aberta durante todo o tempo de vida do aplicativo e usá-la quando necessário. Fechar e reabrir constantemente a conexão aumenta a sobrecarga e reduz o desempenho do servidor.
// a variável abaixo é usada para garantir que o banco de dados inicie desconectado (evitar abrir outra instância)
let dbcon = null 

//importação do Schema Clientes da camada model
const clienteModel = require('./src/models/Clientes.js')

//importação do Schema Fornecedores da camada model
const fornecedorModel = require('./src/models/Fornecedores.js')

//importação do Schema Fornecedores da camada model
const produtoModel = require('./src/models/Produtos.js')

// Janela principal
let win 
function createWindow() {
    win = new BrowserWindow({
        width: 800, 
        height: 600, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Menu personalizado
    //Menu.setApplicationMenu(Menu.buildFromTemplate(template))

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
            width: 360,
            height: 215,
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
            //autoHideMenuBar: true, 
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

    //Melhor local para estabelecer conexão com banco de dados
    // Importar antes o módulo de conexão no inicio do código

    //conexão com o banco
    ipcMain.on('db-connect', async(event, message) => {
        //a linha abaixo estabelece a conexão com o banco
        dbcon = await dbConnect()
        //enviar ao renderizador uma mensagem para trocar o icone do status do banco de dados
        event.reply('db-message', "conectado")
    })

    //desconectar do banco ao encerrar a aplicação
    app.on('before-quit', async() => {
        await desconectar(dbcon)
    })

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
/****************************************/
/********************Clientes********************/
/****************************************/

// CRUD create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do formulário do cliente
ipcMain.on('new-client', async(event, cliente) => {
    //teste de recebimento dos dados (passo 2 - slide) importante!
    console.log(cliente)

    //passo 3 - slide (cadastrar os dados no banco de dados)
    try {
        // criar um novo objeto usando a classe modelo
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        })
        // a linha abaixo usa a biblioteca mongoose para salvar
        await novoCliente.save()

        //confirmação de cliente adicionar no banco
        dialog.showMessageBox({
            type: 'info',
            title: "aviso",
            message: "Cliente adicionado com sucesso",
            buttons: ['OK']
        })
        //enviar uma resposta para o renderizador resetar o form
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})

/****************************************/
/********************Fornecedores********************/
/****************************************/
// CRUD create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do formulário do fornecedor
ipcMain.on('new-fornecedor', async(event, fornecedor) => {
    //teste de recebimento dos dados (passo 2 - slide) importante!
    console.log(fornecedor)

    //passo 3 - slide (cadastrar os dados no banco de dados)
    try {
        // criar um novo objeto usando a classe modelo
        const novoFornecedor = new fornecedorModel({
            nomeFornecedor: fornecedor.nomeFor,
            foneFornecedor: fornecedor.foneFor,
            siteFornecedor: fornecedor.siteFor
        })
        // a linha abaixo usa a biblioteca mongoose para salvar
        await novoFornecedor.save()

        //confirmação de fornecedor adicionar no banco
        dialog.showMessageBox({
            type: 'info',
            title: "aviso",
            message: "Fornecedor adicionado com sucesso",
            buttons: ['OK']
        })
        //enviar uma resposta para o renderizador resetar o form
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})

/*******************************************************************/
/****************************Produtos ***************** */
/******************************************************* */

//CRUD CREATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// recebimento dos dados do formulario dos prdutos
ipcMain.on('new-product', async (event, produto) => {
    // teste de recebimento dos dados (passo 2 - slide) Importante!
    console.log(produto)

    
   //passo 3 - slide (cadastrar os dados no banco de dados)
   try{
    // criar um novo objeto usando a classe modelo
    const novoProduto = new produtoModel ({
        barcodeProduto: produto.barcodePro,
        precoProduto: produto.precoPro,
        nomeProduto: produto.nomePro
    })
    // a linha abaixo usa a biblioteca moongose para salvar
    await novoProduto.save()

    //confirmaçãode produto adicionado no banco
    dialog.showMessageBox({
        type: 'info',
        tittle: 'Aviso',
        message: "Produto adicionado com sucesso",
        buttons: ['OK']
    })
    event.reply('reset-form')
   }catch (error) {
    console.log(error)
   }
})