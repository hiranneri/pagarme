
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cartoes').del()
    .then(function () {
      // Inserts seed entries
      return knex('cartoes').insert([
        {
          bandeira: 'MasterCard' , 
          nrcartao: '00008016894850000',
          nomeportador: 'Hiran Neri de Souza',
          datavalidade: '2024-10-01',
          codigoverificacao: '123'
        }
      ]);
    });
};
