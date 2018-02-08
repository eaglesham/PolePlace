
exports.up = function(knex, Promise) {
    return Promise.all([
     knex.schema.createTable('voters', function(table){
       table.increments('id').primary().unsigned();
       table.string('name')
     })
   ]);
 };
 exports.down = function(knex, Promise) {
   return Promise.all([
     knex.schema.dropTable('voters')
   ]);
 };