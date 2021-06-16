const LoginDAO = require('../DAO/LoginDAO')
const Token = require('../auth/token.auth')
const NaoEncontrado = require('../erros/NaoEncontrado')
const LoginSenhaInvalidos = require('../erros/LoginSenhaInvalidos')
const bcrypt = require('bcrypt');
class Login{
    constructor({cpf, senha}){
        this.cpf = cpf
        this.senha = senha
    }
    async logar(){
        let usuarioEncontrado = await LoginDAO.validarUsuario(this)
        if(!usuarioEncontrado){
            throw new NaoEncontrado('Usuário e/ou senha incorretos')
        }
        usuarioEncontrado = Object.assign({}, 
            {
                conta: 
                { 
                    id: usuarioEncontrado.contaID,
                    numero: usuarioEncontrado.numero
                },
                usuario:
                {
                    nome: usuarioEncontrado.nome,
                    sobrenome: usuarioEncontrado.sobrenome,
                    cpf: usuarioEncontrado.cpf,
                    senha: usuarioEncontrado.senha

                }
            })
        
   
        this.autenticarSenha(usuarioEncontrado.usuario.senha)

        return this.gerarToken(usuarioEncontrado)
        
    }
    async cadastrar(){
        await LoginDAO.create(this)
    }
    autenticarSenha(senha){
        
        let validaSenha = bcrypt.compareSync(this.senha, senha)

        if(!validaSenha){
            throw new LoginSenhaInvalidos('Login e/ou senha invalidos')
        }          
        return true
      
    }
    gerarToken(usuarioEncontrado){
        let token = Token.generate({nrconta: usuarioEncontrado.conta.numero})
        return token;
    }
}

module.exports = Login