
exports.up = (knex)=> {
  return knex.schema.createTable('transacoes', (table)=>{
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('descricao').notNullable(); //'Smartband XYZ 3.0'
    table.decimal('valor').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('transacoes')
};
