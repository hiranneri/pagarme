const moment = require('moment');
const knex = require('../database')

module.exports = {
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
        let valor_original = valor;
        let digitosCartao = nrcartao.slice(-4)
        let numeroCartao = '';
        let vezes = nrcartao.length-4;
        for(let i=0;i<vezes;i++){
            numeroCartao+= '*'
        }
        nrcartao = numeroCartao+digitosCartao;

        const cartao = {
            bandeira,
            nrcartao,
            nomeportador,
            datavalidade,
            codigoverificacao
        };
        console.log(cartao)
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
            created_at: hoje,
            valor_original
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
          await trx('payables').insert(payables); 
           
          await trx.commit();
          return res.status(201).send({"message":'OK'});
        } catch (error) {
          console.log(error.message);
          next(error)
          return {"message":"Ocorreu um erro"};
        }
       
    },
    async avaliable(req,res,next){
        try {
            const transacoesAvaliable = await knex.from('cartoes').innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
            .innerJoin('payables','transacoes.id','payables.transacoes_id').where('payables.tipo', '=', 'DÉBITO')
            .select(
                'bandeira','nrcartao','nomeportador','datavalidade','codigoverificacao','descricao','valor as valor_final','valor_original as valor'
                ,'transacoes.created_at','tipo','datapagto'
            )
            return res.status(200).json(transacoesAvaliable)
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    },
    async waiting(req,res,next){
        try {
            const transacoesWaiting = await knex.from('cartoes').innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
            .innerJoin('payables','transacoes.id','payables.transacoes_id').where('payables.tipo', '=', 'CRÉDITO')
            .select(
                'bandeira','nrcartao','nomeportador','datavalidade','codigoverificacao','descricao','valor as valor_final','valor_original as valor',
                'transacoes.created_at','tipo','datapagto'
            )
            return res.status(200).json(transacoesWaiting)
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    },
    async transacoes(req,res,next){
        try {
            const transacoes = await knex.from('cartoes').innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
            .innerJoin('payables','transacoes.id','payables.transacoes_id').select('bandeira','nrcartao','nomeportador',
            'datavalidade','codigoverificacao','descricao','valor as valor_final','valor_original as valor','transacoes.created_at','tipo','datapagto')
            return res.status(200).json(transacoes);
        } catch (error) {
            console.log(error)
            return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
        }
    }

} 
