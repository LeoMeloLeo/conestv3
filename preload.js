/**
 * Segurança e desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

// Estabelecer a conexão com o banco (envio de pedido para o main abrir a conexão com o banco de dados)
ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api', {
    dbMensagem: (message) => ipcRenderer.on('db-message', message),
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedor: () => ipcRenderer.send('open-fornecedor'),
    janelaprodutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report'),
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),
    resetarFormulario: (args) => ipcRenderer.on('reset-form', args)
})


