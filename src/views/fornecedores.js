/**
 * Processo de renderização do documento
 * fornecedores.html
 */



// CRUD create>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados dos input do form)
let formFornecedor = document.getElementById('frmSupplier')
let nomeFornecedor = document.getElementById('inputNameSupplier')
let foneFornecedor = document.getElementById('inputPhoneSupplier')
let siteFornecedor = document.getElementById('inputSiteSupplier')

// Evento associado ao botão adicionar (quando o botão for pressionado)
formFornecedor.addEventListener('submit', async(event) =>{
    //evitar o comportamento padrão de envio em um form
    event.preventDefault()
    //teste importante (fluxo dos dados)
    //console.log(nomeSupplier.value, foneSupplier.value, siteSupplier.value)
    
    //Passo 2 - slide (envio das informações para o main)
    // criar um objeto
    const fornecedor = {
        nomeFor: nomeFornecedor.value,
        foneFor: foneFornecedor.value,
        siteFor: siteFornecedor.value 
    }
    api.novoFornecedor(fornecedor)
}) 
// Fim do CRUD create


// Reset form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameSupplier').value=""
    document.getElementById('inputPhoneSupplier').value=""
    document.getElementById('inputSiteSupplier').value=""
})

//Fim - reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<