
exports.up = function(knex) {
    return knex.schema.createTable('contas', (table)=>{
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.text('numero').notNullable(); 
        table.date('dataabertura').notNullable();
        table.text('datafechamento');
        table.uuid('usuario_id')
        .references('usuarios.id')
        .notNullable()
        .onDelete('CASCADE')    
        table.timestamp('created_at').defaultTo(knex.fn.now())        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('contas')
};
