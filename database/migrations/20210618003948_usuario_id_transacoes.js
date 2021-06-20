
exports.up = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.uuid('usuario_id')
        .references('usuario.id')
        .notNullable()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')
        
        }
    )}

exports.down = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.dropColumn('usuario_id')
    })
};
