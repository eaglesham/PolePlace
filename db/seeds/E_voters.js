exports.seed = function(knex, Promise) {
  return knex('voters')
    .then(function () {
      return Promise.all([
        knex('voters').insert({name: "Voter A"}),
        knex('voters').insert({name: "Voter B"}),
        knex('voters').insert({name: "Voter C"})
      ]);
    });
};
