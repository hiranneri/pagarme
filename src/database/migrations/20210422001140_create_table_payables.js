exports.up = function(knex) {
    return knex.schema.createTable('payables', (table)=>{
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.text('formapagto').notNullable(); 
        table.text('status').notNullable();
        table.date('datapagto').notNullable();
        table.float('fee',1,2).notNullable(); 
        table.float('valor_descontado',1,2).notNullable();
        table.uuid('transacoes_id')
        .references('transacoes.id')
        .notNullable()
        .onDelete('CASCADE')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('payables')
};