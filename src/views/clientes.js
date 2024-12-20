/**
 * Processo de renderização do documento
 * clientes.html
 */



// CRUD create>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados dos input do form)
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')

// Evento associado ao botão adicionar (quando o botão for pressionado)
formCliente.addEventListener('submit', async(event) =>{
    //evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante (fluxo dos dados)
    //console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    
    //Passo 2 - slide (envio das informações para o main)
    // criar um objeto
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value 
    }
    api.novoCliente(cliente)
}) 
// Fim do CRUD create


// Reset form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameClient').value=""
    document.getElementById('inputPhoneClient').value=""
    document.getElementById('inputEmailClient').value=""
})

//Fim - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
