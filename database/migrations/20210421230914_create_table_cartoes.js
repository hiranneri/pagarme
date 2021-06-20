exports.up = (knex) => {
  return knex.schema.createTable('cartoes', (table)=>{
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.text('bandeira').notNullable();
      table.text('nrcartao',4).notNullable();
      table.text('nomeportador').notNullable();
      table.date('datavalidade').notNullable();
      table.text('codigoverificacao').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
  }) 
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('cartoes')
};