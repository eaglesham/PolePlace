
exports.up = function(knex, Promise) {
    return Promise.all([
     knex.schema.createTable('votes', function(table){
       table.increments('id').primary().unsigned();
       table.integer('optionid').unsigned().notNullable().references('id').inTable('options').onDelete('CASCADE').index();
       table.integer('points')
     })
   ]);
 };
 exports.down = function(knex, Promise) {
   return Promise.all([
     knex.schema.dropTable('votes')
   ]);
 };