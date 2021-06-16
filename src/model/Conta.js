class Conta{
    constructor(){
        this.numero = ''
        this.dataAbertura = ''
        this.dataFechamento = ''
    
    }
    
    criar(){
        this.numero = this.criarConta();        
        this.dataAbertura = new Date();
    }

    criarConta(){
        let numero = (Math.random() * 100000000).toFixed(0);
        let ultimoIndice = numero.length-1;
        let digito = numero[ultimoIndice];
        let numeroInicial = numero.substring(0,8);
        let numeroContaCompleto = `${numeroInicial}-${digito}`;
        return numeroContaCompleto;
    }
}
module.exports = Conta