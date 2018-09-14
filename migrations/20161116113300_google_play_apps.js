// GOOGLE
exports.up = function(knex, Promise) {
  return knex.schema.createTable('app_table_gplay', (table)=> {
  	table.increments();
  	table.string('title');
  	table.text('summary');
  	table.text('icon');
  	table.string('price');
  	table.string('free');
  	table.integer('maxInstalls');
  	table.integer('minInstalls');
  	table.string('score');
  	table.integer('reviews');
  	table.string('developer');
  	table.string('developerEmail');
  	table.text('developerWebsite');
  	table.date('updated');
  	table.string('version');
  	table.string('genre');
  	table.string('genreId');
  	table.string('familyGenre');
  	table.string('familyGenreId');
  	table.text('size');
  	table.text('description');
  	table.text('descriptionHTML');
  	table.json('histogram');
  	table.boolean('offersIAP');
  	table.boolean('adSupported');
  	table.string('androidVersionText');
  	table.string('androidVersion');
  	table.string('contentRating');
  	table.text('screenshots');
  	table.text('video');
  	table.text('comments');
  	table.text('recentChanges');
  	table.boolean('preregister');
  	table.string('appId');
  	table.text('url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('app_table_gplay');
};
