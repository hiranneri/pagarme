const moment = require('moment');

class Conta{
    constructor(){
        this._numero = this.gerarNumeroConta()
        this._dataAbertura = moment(new Date())
        this._dataFechamento = ''
        
    }

    get numero(){
        return this._numero
    }
    get dataAbertura(){
        return this._dataAbertura
    }
    get dataFechamento(){
        return this._dataFechamento
    }
    
    gerarNumeroConta(){
        let numero = (Math.random() * 100000000).toFixed(0);
        let ultimoIndice = numero.length-1;
        let digito = numero[ultimoIndice];
        let numeroInicial = numero.substring(0,8);
        let numeroContaCompleto = `${numeroInicial}-${digito}`;
        return numeroContaCompleto;
    }
}
module.exports = Conta