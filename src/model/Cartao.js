const moment = require("moment")
const PreenchimentoIncorreto = require('../erros/PreeenchimentoIncorreto')

class Cartao{
    constructor({id, bandeira, numeroCartao, nomePortador, dataValidade, codigoVerificacao, dataCriacao}){
        this._id = id,
        this._bandeira = bandeira,
        this._nrCartao = numeroCartao,
        this._nomePortador = nomePortador,
        this._dataValidade = dataValidade,
        this._codigoVerificacao = codigoVerificacao,
        this._dataCriacao = dataCriacao
        this.colocarAstericos()       
        
    }
    get bandeira(){
        return this._bandeira;
    }
    get nrCartao(){
        return this._nrCartao;
    }
    get nomePortador(){
        return this._nomePortador;
    }
    get dataValidade(){
        return this._dataValidade;
    }
    get codigoVerificacao(){
        return this._codigoVerificacao;
    }
    set id(id){
        this._id = id;
    }
    set dataCriacao(dataCriacao){
        this._dataCriacao = dataCriacao
    }

    validar(){
        const campos = ['_bandeira', '_nrCartao', '_nomePortador', '_dataValidade', 
            '_codigoVerificacao']
        const dados = this
        const dadosParaValidar = {}

        campos.forEach((campo)=>{
            const valor = dados[campo]
            if(valor.length >=3 && typeof valor === 'string'){
                dadosParaValidar[campo] = valor
            }else{
                throw new PreenchimentoIncorreto(`O(s) campo(s) ${campo} não foram preenchidos corretamente`)
            }
        })

        if(Object.keys(dadosParaValidar).length === 0){
            throw new PreenchimentoIncorreto('Não foram fornecidos dados para atualizar')
        }
        if(this['_nrCartao'].length < 8){
            throw new PreenchimentoIncorreto(`O campo 'numeroCartao' não foi preenchido corretamente`)
        }
        const dataValidade = moment(this['_dataValidade'])
        
        if(!dataValidade.isValid()){
            throw new PreenchimentoIncorreto(`O campo 'dataValidade' não foi preenchido corretamente`)
        }
        
    }
    colocarAstericos(){
        let numero = this._nrCartao
        numero = numero.replace(/\s/g, '')
        let digitosCartao = numero.slice(-4);
        let numeroCartao = '';
        let vezes = numero.length-4;
        for(let i=0;i<vezes;i++){
            numeroCartao+= '*'
        }
        numero = `${numeroCartao}${digitosCartao}`;
        this._nrCartao = numero;    
    }
}

module.exports = Cartao