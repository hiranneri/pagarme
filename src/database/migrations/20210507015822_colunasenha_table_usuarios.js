
exports.up = function(knex) {
    return knex.schema.table('usuarios', (table)=>{
        table.text('senha').notNullable();
    }) 
};

exports.down = function(knex) {
  return knex.schema.table('usuarios', table=>{
      table.dropColumn('senha');
  })
};
