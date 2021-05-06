const moment = require('moment');
const knex = require('../database')
const transacaoData = require('../data/TransacaoData')

module.exports = {
    async transacao(req,res,next){
        try {
            let formapagto = req.body.formapagto;
            if(formapagto === 'DÉBITO' || formapagto==='CRÉDITO'){
                const cartao = this.criarCartao(req)
                const transacao = this.criarTransacao(req);
                const payables = this.criarPayables(req); 
                
                const transacaoResult = await transacaoData.createTransacao(cartao,transacao,payables)
                 
                return res.status(201).send(transacaoResult);
         
    
            }else{
                return res.status(400).json({"message": "Informe uma forma de pagamento válida! DÉBITO ou CRÉDITO"})
            }
            
        } catch (error) {
            console.error(error.message)
        }

    },
    async avaliable(req,res,next){
        try {
           const transacaoDebito = await transacaoData.findAllDebito();          
            return res.status(200).json(transacaoDebito);
        
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    },
    async waiting(req,res,next){
        try {
            const transacaoCredito = await transacaoData.findAllCredito();
            return res.status(200).json(transacaoCredito)
          
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    },
    async transacoes(req,res,next){
        try {
            const transacoes = await transacaoData.findAll();
           
            return res.status(200).json(transacoes);
          
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    },

 
criarTransacao(requisicao){
    const transacao = requisicao.body;
    return {
        descricao: transacao.descricao,
        valor: transacao.valor,
    }
},
criarCartao(requisicao){
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
},
criarPayables(requisicao){
    const transacao = requisicao.body;
    let status,fee;
    let hoje = new Date();
    let datapagto;
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
      }else{
          return {
              message: 'Forma de pagto inválida'
          }
      }
    const payables = {
        formapagto,
        status,
        datapagto,
        fee,
        valor_descontado:valor,
      
    }
    return payables;

    
}
}