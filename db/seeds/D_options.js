exports.seed = function(knex, Promise) {
  return knex('options')
    .then(function () {
      return Promise.all([
        knex('options').insert({pollid: 1, title: "title A", description: "description A"}),
        knex('options').insert({pollid: 2, title: "title B", description: "description B"}),
        knex('options').insert({pollid: 3, title: "title C", description: "description C"})
      ]);
    });
};
