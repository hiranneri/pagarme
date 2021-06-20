
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', (table)=>{
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.text('nome').notNullable(); 
        table.text('sobrenome').notNullable();
        table.date('datanascimento').notNullable();
        table.text('rg').notNullable();
        table.text('cpf').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
