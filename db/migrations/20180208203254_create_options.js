
exports.up = function(knex, Promise) {
    return Promise.all([
     knex.schema.createTable('options', function(table){
       table.increments('id').primary().unsigned();
       table.integer('pollid').unsigned().notNullable().references('id').inTable('poll').onDelete('CASCADE').index();
       table.string('title');
       table.string('description')
     })
   ]);
 };
 exports.down = function(knex, Promise) {
   return Promise.all([
     knex.schema.dropTable('options')
   ]);
 };