/**
 * Modelo de daods (Produtos)
 */

//importação de bibliotecas
const {model, Schema} = require('mongoose')

//criação da estrutura de dados ("tabela") que sera usada no banco
const produtoSchema = new Schema({
    barcodeProduto: {
        type: String,
    },
    precoProduto: {
        type: String,
    },
    nomeProduto: {
        type: String,
    }
})

//exportar para o arquivo main
//para modificar o nome da coleção ("tabela"), basta, modificar na linha abaixo o rótulo 'Clientes, sempre iniciando com maiuscula
module.exports = model('Produto', produtoSchema)

