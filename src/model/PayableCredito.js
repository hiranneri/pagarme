const Payables = require("./Payables");
const moment = require('moment');
class PayableDebito extends Payables{
    constructor({formaPagamento, dataPagamento, transacao}){
        super({formaPagamento, dataPagamento, transacao, valorDescontado: 0,status: ''})
    }
    criarPayables(){
        this._status = 'waiting_funds'
        this._dataPagamento = moment(new Date()).add(30,'day')
        this._fee=0.95;
        this._valor = this._valor * this._fee;      
    }
}

module.exports = PayableDebito