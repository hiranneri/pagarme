const knex = require('../database') //src/database/index

module.exports = {
    async listar(usuarioID){
        const transacoes = await knex.from('cartoes')
        .innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
        .innerJoin('payables','transacoes.id','payables.transacoes_id')
        .where('transacoes.usuario_id', usuarioID)
        .select('bandeira','nrcartao','nomeportador',
        'datavalidade','codigoverificacao','descricao',
        'transacoes.created_at','formapagto','datapagto','transacoes.valor as valortransacao',
        'payables.valor_descontado as valordescontado')
                    
        return transacoes;
    },
    async findAllCredito(usuarioID){
        const transacoesCredito = await knex.from('cartoes')
        .innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
        .innerJoin('payables','transacoes.id','payables.transacoes_id')
        .where({formapagto: 'CRÉDITO', usuario_id: usuarioID})
        .select(
            'bandeira','nrcartao','nomeportador','datavalidade','codigoverificacao',
            'descricao','transacoes.created_at','formapagto','datapagto',
            'transacoes.valor as valortransacao','payables.valor_descontado as valordescontado'
        )
        return transacoesCredito;
    },
    async findAllDebito(usuarioID){
        
        const transacoesDebito = await knex.from('cartoes')
        .innerJoin('transacoes','cartoes.id','transacoes.cartoes_id')
        .innerJoin('payables','transacoes.id','payables.transacoes_id')
        .where({formapagto: 'DÉBITO', usuario_id: usuarioID})
        .select(
            'bandeira','nrcartao','nomeportador','datavalidade','codigoverificacao',
            'descricao','transacoes.created_at','formapagto','datapagto',
            'transacoes.valor as valortransacao','payables.valor_descontado as valordescontado'
        )
        return transacoesDebito;
     
    },
    async createTransacao(payables){
        
        const trx = await knex.transaction();
        const idCartao = await trx('cartoes').insert({
            bandeira: payables.transacao.cartao.bandeira,
            nrcartao: payables.transacao.cartao.nrCartao,
            nomeportador: payables.transacao.cartao.nomePortador,
            datavalidade: payables.transacao.cartao.dataValidade,
            codigoverificacao: payables.transacao.cartao.codigoVerificacao,
        }).returning('id').into('cartoes')
       
        const transacaoID = await trx('transacoes').insert({
            descricao: payables.transacao.descricao,
            valor: payables.transacao.valor,
            cartoes_id: idCartao[0],
            usuario_id: payables.transacao.usuario
        }).returning('id').into('transacoes')
                
        await trx('payables').insert({
            formapagto: payables.formaPagamento,
            status: payables.status,
            datapagto: payables.dataPagamento,
            fee: payables.fee,
            valor_descontado: payables.valorDescontado,
            transacoes_id: transacaoID[0]
        }); 
        await trx.commit();
        
        return transacaoID;   
     
    },
    async countTransacoes(){
        try {
            const quantidadeTransacoes = await knex.from('transacoes').count('id', {as:'quantidade'});
            return quantidadeTransacoes;
        } catch (error) {
            console.log(error)
            return {"message":"Ocorreu um erro, tente novamente"};
        }
    }
}