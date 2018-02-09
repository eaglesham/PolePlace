exports.seed = function(knex, Promise) {
  return knex('options')
    .then(function () {
      return Promise.all([
        knex('options').insert({id: 1, pollid: 1, title: "title A", description: "description A"}),
        knex('options').insert({id: 2, pollid: 2, title: "title B", description: "description B"}),
        knex('options').insert({id: 3, pollid: 3, title: "title C", description: "description C"})
      ]);
    });
};
