
exports.seed = (knex) => {
  // Deletes ALL existing entries
  try {
    return knex('cartoes').del()
      .then(async ()=> {
        // Inserts seed entries
        const trx = await knex.transaction();
        const id_cartao = trx('cartoes').insert(
          {
            bandeira : 'Mastercard',
            nrcartao:30000000000,
            nomeportador:'Fernando Silva',
            datavalidade:'2027-10-01',
            codigoverificacao:'852'               
          }      
        )
        const idCartao = id_cartao[0];
        const transacao_id = trx('transacoes').insert(
          {
            descricao:'Smartband 3.0',
            valor: 260.37,
            created_at:new Date(),
            cartoes_id:idCartao
          }
        )
        const id_transacao = transacao_id[0];
        trx('payables').insert(
          {
            tipo:'DÉBITO',
            status:'paid',
            datapagto:new Date(),
            fee:0.03,
            created_at:new Date(),
            transacoes_id: id_transacao
          }
        )     
          await trx.commit();
          return {"message":'OK'}
        
      });
    
    
  } catch (error) {
    console.log(error.message);
  }
}