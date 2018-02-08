
exports.up = function(knex, Promise) {
    return Promise.all([
     knex.schema.createTable('poll', function(table){
       table.increments('id').primary().unsigned();
       table.integer('creatorid').unsigned().notNullable().references('id').inTable('creator').index();
       table.string('polldescription');
       table.string('submissionurl');
       table.string('adminurl')
     })
   ]);
 };
 exports.down = function(knex, Promise) {
   return Promise.all([
     knex.schema.dropTable('poll')
   ]);
 };