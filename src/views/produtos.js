/**
 * Processo de Renderização
 * produtos.html
 */

// CRUD Create

//Passo 1 - slide (capturar os dados dos inputs do form)
let formProduto = document.getElementById('frmProduct')
let barcodeProduto = document.getElementById('inputBarcodeProduct')
let precoProduto = document.getElementById('inputPrecoProduct') 
let nomeProduto = document.getElementById('inputNameProduct') 

// Evento associado ao botão adicionar (quando o botão for pressionado)
formProduto.addEventListener('submit', async (event) =>{
    //evitar o comportamento padrão de envio em um form
    event.preventDefault()
    // teste importante (fluxo dos dados)
   //passo 2 slide (envio das informações para o main)
   // criar o objeto
   const produto = {
    barcodePro: barcodeProduto.value ,
    precoPro: precoProduto.value ,
    nomePro: nomeProduto.value
   }
   api.novoProduto(produto)
})
// Reset form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Fim Crud create<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
api.resetarFormulario((args) => {
    document.getElementById('inputBarcodeProduct').value=""
    document.getElementById('inputPrecoProduct').value=""
    document.getElementById('inputNameProduct').value=""
})
// fim - reset form<<<<<<<<<<<<<<<<<<<<<<<<<<