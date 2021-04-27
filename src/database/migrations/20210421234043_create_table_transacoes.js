exports.up = (knex)=> {
    return knex.schema.createTable('transacoes', (table)=>{
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.text('descricao').notNullable(); 
      table.decimal('valor').notNullable();
      table.uuid('cartoes_id')
      .references('cartoes.id')
      .notNullable()
      .onDelete('CASCADE')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      
    })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('transacoes')
  };