
exports.up = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.uuid('cartoes_id')
        .references('cartoes.id')
        .notNullable()
        .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.dropForeign('cartoes_id');
    });
};
