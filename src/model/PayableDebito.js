const Payables = require("./Payables");
const moment = require('moment');
class PayableDebito extends Payables{
    constructor({formaPagamento, dataPagamento, transacao, valor, fee}){
        super({formaPagamento, dataPagamento, transacao, valor,
            valorDescontado: 0,status: '', fee: 0})
    }
    criarPayables(){
        this._status = 'paid',
        this.datapagto = moment().format()
        this._fee=0.97;
        this._valor_descontado = this._valor * 0.03; 
        this._valor *= this._fee;

    }
}

module.exports = PayableDebito