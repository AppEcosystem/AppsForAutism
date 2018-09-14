// APPLE CATS
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories_table', (table) => {
  	table.increments();
  	table.string('category');
  	table.integer('amount');
  	table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories_table');
};
