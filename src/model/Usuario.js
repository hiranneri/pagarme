const utils = require('../utils/Utils');
const loginData = require('../DAO/LoginDAO')
const Conta = require('./Conta');

class Usuario{
    constructor({id, nome, sobrenome,senha, dataNascimento, rg, cpf, dataCriacao}){
        this.id = id,
        this.nome = nome,
        this.sobrenome = sobrenome,
        this.senha = senha
        this.dataNascimento = dataNascimento,
        this.rg = rg,
        this.cpf = cpf,
        this.dataCriacao = dataCriacao
    }
    async criar(){
        this.senha = utils.hashSenha(this.senha);
        const conta = new Conta()
        let usuarioCadastrado = await loginData.create(this, conta);
        this.id = usuarioCadastrado.usuario
           
        return usuarioCadastrado;             
    }


}

module.exports = Usuario
