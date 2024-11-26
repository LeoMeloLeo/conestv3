/**
 * Modelo de daods (clientes)
 */

//importação de bibliotecas
const {model, Schema} = require('mongoose')

//criação da estrutura de dados ("tabela") que sera usada no banco
const clienteSchema = new Schema({
    nomeCliente: {
        type: String,
    },
    foneCliente: {
        type: String,
    },
    emailCliente: {
        type: String,
    }
})

//exportar para o arquivo main
// Para modificar o nome da coleção ("tabela"), basta modificar na linha abaixo o rotulo 'Clientes', sempre iniciando com letra maiuscula
module.exports = model('Clientes', clienteSchema)

