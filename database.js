/**
 * Módulo de conexão com banco de dados
 * uso do mongoose
 */

const mongoose = require('mongoose')

//definir a URL e Autenticação do banco de dados (acrescentar ao final da url um nome para o banco de dados)
const url = 'mongodb+srv://admin:123senac45@clusterconest.hlxi5.mongodb.net/mongodbconest'

//status de conexão (icone de conexão)
let isConnect = false

// Só estabelelcer um conexão se não estiver conectado
const dbConnect = async () => {
    if (isConnect === false) {
        await conectar()
    }
}

// conectar
const conectar = async () => {
    if(isConnect === false){
        try {
            //a linha abaixo abre a conexão com MongoDB
            await mongoose.connect(url)
            isConnect = true //sinalizar que o banco esta conectado
            console.log("MongoDB conectado")
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// desconectar
const desconectar = async () => {
    if(isConnect === true){
        try {
            //a linha abaixo encerra a conexão com MongoDB
            await mongoose.disconnect(url)
            isConnect = false //sinalizar que o banco não esta conectado
            console.log("MongoDB desconectado")
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

//exportar para o main as funções desejadas
module.exports = {dbConnect, desconectar}