const knex = require('../database') //src/database/index

module.exports = {
    async findAll(){
        try {           
            const transacoes = await knex.from('cartoes').innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
            .innerJoin('payables','transacoes.id','payables.transacoes_id').select('bandeira','nrcartao','nomeportador',
            'datavalidade','codigoverificacao','descricao','transacoes.created_at','formapagto','datapagto','transacoes.valor as valortransacao',
            'payables.valor_descontado as valordescontado')
                        
            return transacoes;
        } catch (error) {
            console.log(error)
            return {"message":"Ocorreu um erro, tente novamente"};
        }
    },
    async findAllCredito(){
        try {
            const transacoesWaiting = await knex.from('cartoes').innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
            .innerJoin('payables','transacoes.id','payables.transacoes_id').where('payables.formapagto', '=', 'CRÉDITO')
            .select(
                'bandeira','nrcartao','nomeportador','datavalidade','codigoverificacao','descricao','transacoes.created_at','formapagto','datapagto',
                'transacoes.valor as valortransacao','payables.valor_descontado as valordescontado'
            )
            return transacoesWaiting;
        } catch (error) {
            console.log(error)
            return {"message":"Ocorreu um erro, tente novamente"};
        }
    },
    async findAllDebito(){
        try {
            const transacoesPaid = await knex.from('cartoes').innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
            .innerJoin('payables','transacoes.id','payables.transacoes_id').where('payables.formapagto', '=', 'DÉBITO')
            .select(
                'bandeira','nrcartao','nomeportador','datavalidade','codigoverificacao','descricao','transacoes.created_at','formapagto','datapagto',
                'transacoes.valor as valortransacao','payables.valor_descontado as valordescontado'
            )
            return transacoesPaid;
        } catch (error) {
            console.log(error)
            return {"message":"Ocorreu um erro, tente novamente"};
        }
    },
    async createTransacao(cartao,transacao,payables){
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
            return {"message":'Salvo com sucesso'};
        } catch (error) {
            console.log(error.message)
            return {"message":"Ocorreu um erro, tente novamente"};
        }
    }
}