
exports.up = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.decimal('valor_original').notNullable().defaultTo(0);
    })
};

exports.down = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.dropColumn('valor_original');
    });
};
