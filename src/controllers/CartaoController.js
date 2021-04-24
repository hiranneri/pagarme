const moment = require('moment');
const knex = require('../database')

module.exports= {
    async index (req,res){
        try {
            const results =  await knex('cartoes');
            return res.status(200).json(results)

        } catch (error) {
            
        }
       
    },
    async create (req,res,next){
        try {
            let {bandeira,nrcartao,nomeportador,datavalidade,
                codigoverificacao} = req.body;
            const cartao = {
                bandeira,
                nrcartao,
                nomeportador,
                datavalidade,
                codigoverificacao
            }
            await knex('cartoes').insert(cartao)
            return res.status(201).send({"message":"Sucesso"})
            
        } catch (error) {
            next(error)
        }
      
    },
    async transacao(req,res,next){
        let {
            bandeira,
            nrcartao,
            nomeportador,
            datavalidade,
            codigoverificacao,
            descricao,
            valor,
            formapagto,
            
            
        } = req.body;
        let status;
        let datapagto;
        let hoje = new Date();
        let fee;
        const cartao = {
            bandeira,
            nrcartao,
            nomeportador,
            datavalidade,
            codigoverificacao
        };
        if(formapagto==='DÉBITO'){ //3
          status = 'paid',
          datapagto = hoje
          fee=0.97;
          valor = valor * fee;
        }else if(formapagto==='CRÉDITO'){//5
          status='waiting_funds'
          datapagto = moment(hoje).add('day',30),
          fee=0.95;
          valor = valor * fee;
         
        }
        //id_cartao
        const transacao = {
            descricao,
            valor,
            fee, //criar campo
            created_at: hoje
        };
        
        const payables = {
          tipo: formapagto,
          status,
          datapagto,
          fee,
          created_at:hoje,
        
        }
        try {
          const trx = await knex.transaction();
          await trx('cartoes').insert(cartao).returning('id').into('cartoes')
          .then((id)=>{
            transacao.cartoes_id = id[0];
          })
          await trx('transacoes').insert(transacao).returning('id').into('transacoes')
          .then((id)=>{
            payables.transacoes_id = id[0];
          
          })
  
          
          console.log('obj pay', payables)
          await trx('payables').insert(payables);
  
          await trx.commit();
          return res.status(201).send({"message":'OK'});
        } catch (error) {
          console.log(error.message);
          next(error)
          return {"message":"Ocorreu um erro"};
        }
       
    }
     
  
}