const moment = require('moment');
const knex = require('../database')
const transacaoData = require('../data/TransacaoData')

module.exports = {
    async transacao(req,res,next){
        let formapagto = req.body.formapagto;
        if(formapagto === 'DÉBITO' || formapagto==='CRÉDITO'){
            const cartao = criarCartao(req);
            const transacao = criarTransacao(req);
            const payables = criarPayables(req); 
            
            const result = transacaoData.createTransacao(cartao,transacao,payables)
            result.then((resposta)=>{            
                return res.status(201).send(resposta);
            })

        }else{
            return res.status(400).json({"message": "Informe uma forma de pagamento válida! DÉBITO ou CRÉDITO"})
        }

    },
    async avaliable(req,res,next){
        try {
           const transacaoDebito = transacaoData.findAllDebito();
           transacaoDebito.then((results)=>{
               return res.status(200).json(results);
           })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    },
    async waiting(req,res,next){
        try {
            const transacaoCredito = transacaoData.findAllCredito();
            transacaoCredito.then((results)=>{
                return res.status(200).json(results)

            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    },
    async transacoes(req,res,next){
        try {
            const transacoes = transacaoData.findAll();
            transacoes.then((results)=>{
                return res.status(200).json(results);
            })            
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    }

} 
function criarTransacao(requisicao){
    const transacao = requisicao.body;
    return {
        descricao: transacao.descricao,
        valor: transacao.valor,
    }
}
function criarCartao(requisicao){
    const transacao = requisicao.body;
    let nrcartao = transacao.nrcartao;
    let digitosCartao = nrcartao.slice(-4);
    let numeroCartao = '';
    let vezes = nrcartao.length-4;
    for(let i=0;i<vezes;i++){
        numeroCartao+= '*'
    }
    nrcartao = numeroCartao+digitosCartao;

    const cartao = {
        bandeira:transacao.bandeira,
        nrcartao,
        nomeportador:transacao.nomeportador,
        datavalidade:transacao.datavalidade,
        codigoverificacao: transacao.codigoverificacao,
    };
    return cartao;    
}
function criarPayables(requisicao){
    const transacao = requisicao.body;
    let status,fee;
    let hoje = new Date();
    let valor = transacao.valor;
    let formapagto = transacao.formapagto;
    if(formapagto==='DÉBITO'){ 
        status = 'paid',
        datapagto = hoje
        fee=0.97;
        valor = valor * fee;
    }else if(formapagto==='CRÉDITO'){
        status='waiting_funds'
        datapagto = moment(hoje).add(30,'day'),
        fee=0.95;
        valor = valor * fee;
      }
    const payables = {
        formapagto: transacao.formapagto,
        status,
        datapagto,
        fee,
        valor_descontado:valor,
      
    }
    return payables;

    
}