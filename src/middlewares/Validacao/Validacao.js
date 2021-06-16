const PreenchimentoIncorreto = require('../../erros/PreeenchimentoIncorreto');
const moment = require('moment');

function Validacao(requisicao, resposta, proximo){
    this.requisicao = requisicao,
    this.resposta = resposta
    this.proximo = proximo   
   
}

const valida = function validar(requisicao, resposta, proximo){
    const corpo = requisicao.body
    const campos = ['cpf','senha']
    const dadosParaValidar = {}
    campos.forEach((campo)=>{
        const valor = corpo[campo]
        if(typeof valor === 'string' && valor.length >= 10 && !valor.includes('-') && !valor.includes('.')){
            dadosParaValidar[campo] = valor
        }else{
            throw new PreenchimentoIncorreto(`O(s) campo(s) ${campo} não foram preenchidos corretamente`)
        }
    })
    if(Object.keys(dadosParaValidar).length === 0){
        throw new PreenchimentoIncorreto('Não foram fornecidos dados para atualizar')
    } 
    proximo()   

}




function ValidacaoCadastro(requisicao, resposta, proximo){
    Validacao.call(this, requisicao, resposta, proximo) 
   
}
ValidacaoCadastro.prototype = Object.create(Validacao.prototype)
ValidacaoCadastro.prototype.constructor = ValidacaoCadastro

const validaUsuario = function validarCadastro(requisicao, resposta, proximo){
    const corpo = requisicao.body
    const campos = ['nome','sobrenome','datanascimento','rg','cpf', 'senha']
    const dadosParaValidar = {}
    campos.forEach((campo)=>{
        const valor = corpo[campo]
        if(typeof valor === 'string' && valor.length >= 3 && !valor.includes('.')){
            dadosParaValidar[campo] = valor
        }else{
            throw new PreenchimentoIncorreto(`O(s) campo(s) ${campo} não foram preenchidos corretamente`)
        }
    })
    if(Object.keys(dadosParaValidar).length === 0){
        throw new PreenchimentoIncorreto('Não foram fornecidos dados para atualizar')
    } 
    const data = moment(dadosParaValidar['datanascimento']).isValid()
    if(!data){
        throw new PreenchimentoIncorreto(`O campo 'datanascimento' não foi preenchido corretamente`)
    }
    const isValid = dadosParaValidar['senha'].length >= 10
    if(!isValid){
        throw new PreenchimentoIncorreto(`O campo 'senha' não foi preenchido corretamente`)
    }
    
    proximo()   
}   



module.exports = {
    valida,
    validaUsuario
}