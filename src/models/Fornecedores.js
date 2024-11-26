/**
 * Modelo de dados (fornecedores)
 */

//importação de bibliotecas
const {model, Schema} = require('mongoose')

//criação da estrutura de dados ("tabela") que sera usada no banco
const fornecedorSchema = new Schema({
    nomeFornecedor: {
        type: String,
    },
    foneFornecedor: {
        type: String,
    },
    siteFornecedor: {
        type: String,
    }
})

//exportar para o arquivo main
// Para modificar o nome da coleção ("tabela"), basta modificar na linha abaixo o rotulo 'Fornecedor', sempre iniciando com letra maiuscula
module.exports = model('Fornecedores', fornecedorSchema)