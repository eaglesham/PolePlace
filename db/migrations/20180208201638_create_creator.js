
exports.up = function(knex, Promise) {
    return Promise.all([
     knex.schema.createTable('creator', function(table){
        table.increments('id').primary().unsigned();
     })
   ]);
 };
exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('creator')
    ]);
  };