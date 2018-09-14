// GOOGLE CATS
exports.up = function(knex, Promise) {
  return knex.schema.createTable('android_categories', function(table) {
  	table.increments();
  	table.string('category');
  	table.integer('amount');
  	table.timestamp('added_date').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('android_categories');
};