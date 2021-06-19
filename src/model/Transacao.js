const TransacaoDAO = require('../DAO/TransacaoDAO')
const NaoEncontrado = require('../erros/NaoEncontrado')
class Transacao {
    constructor({ cartao, descricao, valor, usuario}){
            this._cartao = cartao
            this._descricao = descricao,
            this._valor =  valor,
            this._usuario = usuario
    }
    
    get cartao(){
        return this._cartao;
    }
    get descricao(){
        return this._descricao;
    }
    get valor(){
        return this._valor;
    }
    get usuario(){
        return this._usuario;
    }
    validar(){
        const campos = ['descricao', 'valor']
        const dados = this
        const dadosParaValidar = {}
        campos.forEach((campo)=>{
            const valor = dados[campo]
            if(valor.length >=3){
                dadosParaValidar[campo] = valor
            }else{
                throw new PreenchimentoIncorreto(`O(s) campo(s) ${campo} não foram preenchidos corretamente`)
            }
        })
        if(this['_valor'] <=2){
            throw new PreenchimentoIncorreto('Não é autorizado transações abaixo do valor permitido')
        }

    }

    async listar(){
        const transacoes = await TransacaoDAO.listar(this.usuario);
        if(transacoes.length===0){
            throw new NaoEncontrado('Não foram localizados as transacoes para esse usuário')
        }
        return transacoes
    }
    async avaliable(){
        const transacaoDebito = await TransacaoDAO.findAllDebito(this.usuario);          
        if(transacaoDebito.length===0){
            throw new NaoEncontrado('Não foram localizados as transacoes avaliables para esse usuário')
        }
        return transacaoDebito;         
      
    }
    async waiting(){
        const transacaoesWaiting = await TransacaoDAO.findAllCredito(this.usuario)
        if(transacaoesWaiting.length===0){
            throw new NaoEncontrado('Não foram localizados as transacoes para esse usuário')
        }
        return transacaoesWaiting
    }

}

module.exports = Transacao