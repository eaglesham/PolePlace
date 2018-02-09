exports.seed = function(knex, Promise) {
  return knex('voters')
    .then(function () {
      return Promise.all([
        knex('voters').insert({id: 1, name: "Voter A"}),
        knex('voters').insert({id: 2, name: "Voter B"}),
        knex('voters').insert({id: 3, name: "Voter C"})
      ]);
    });
};
