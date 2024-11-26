/**
 * Processos de renderização
 */

// Botão OK dajanela sobre
function fechar(){
    api.fecharJanela()
}

function clientes (){
    api.janelaClientes()
}

function fornecedor (){
    api.janelaFornecedor()
}

function produtos (){
    api.janelaprodutos()
}

function relatorios (){
    api.janelaRelatorios()
}


function obterData(){
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-br', options)
}

// inserção da data no rodapé
document.getElementById('dataAtual').innerHTML = obterData()

//Icone de status do banco de dados
api.dbMensagem((event, message) => {
    // validação e troca do icone
    if (message === "conectado") {
        document.getElementById('iconDB').src = "../public/img/dbon.png"
    } else {
        document.getElementById('iconDB').src = "../public/img/dboff.png"
    }
})

