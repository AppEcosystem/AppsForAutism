
exports.up = function(knex, Promise) {
  return knex.schema.table('app_table_gplay', (table) => {
  	table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {

};
