// APPLE
exports.up = function(knex, Promise) {
  return knex.schema.createTable('app_table', function(table) {
  	table.increments();
  	table.integer('app_id');
  	table.string('app_name');
  	table.json('details');
  	table.integer('artist_id');
  	table.text('advisories');
  	table.integer('average_user_rating');
  	table.integer('average_user_recent_rating');
  	table.string('content_advisory_rating');
  	table.string('currency');
  	table.dateTime('current_version_release_date');
  	table.text('description');
  	table.string('features');
  	table.integer('price');
    table.text('icon');
    table.text('screenshots');
  	table.string('primary_genre');
  	table.text('language_code');
  	table.string('minimum_os_version');
  	table.string('seller_name');
  	table.text('supported_devices');
  	table.string('age_rating');
  	table.integer('user_rating_count');
  	table.string('version');
  	table.text('genres');
  	table.boolean('featured');
  	table.dateTime('release_date');
  	table.timestamp('added_date').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('app_table');
};
