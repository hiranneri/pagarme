
exports.up = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.decimal('fee').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.table('transacoes', (table)=>{
        table.dropColumn('fee');
    });
};
