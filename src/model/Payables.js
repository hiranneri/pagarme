const moment = require('moment');
const PreenchimentoIncorreto = require('../erros/PreeenchimentoIncorreto')
class Payables {
    constructor({formaPagamento, dataPagamento,transacao,valor, valorDescontado, status, fee}){
        this._formaPagamento = formaPagamento
        this._dataPagamento = dataPagamento,
        this._transacao = transacao
        this._valor = valor,
        this._valor_descontado = valorDescontado,
        this._status = status
        this._fee = fee
    }
    get transacao(){
        return this._transacao
    }
    get formaPagamento(){
        return this._formaPagamento
    }
    get valor(){
        return this._valor
    }
    get valorDescontado(){
        return this._valor_descontado
    }
    get status(){
        return this._status;
    }
    get dataPagamento(){
        return this._dataPagamento;
    }
    get fee(){
        return this._fee;
    }
    validar(){
        const dataPagamento = moment(this['_dataPagamento'])
        
        if(!dataPagamento.isValid()){
            throw new PreenchimentoIncorreto(`O campo 'dataPagamento' não foi preenchida corretamente`)
        }
    }
    criarPayables(){}


}

module.exports = Payables
