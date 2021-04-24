
exports.up = function(knex) {
    return knex.schema.table('payables', (table)=>{
        table.uuid('transacoes_id')
        .references('transacoes.id')
        .notNullable()
        .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.table('cartoes', (table)=>{
        table.dropForeign('transacoes_id');
    });
};
