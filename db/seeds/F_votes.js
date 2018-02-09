exports.seed = function(knex, Promise) {
  return knex('votes')
    .then(function () {
      return Promise.all([
        knex('votes').insert({id: 1, optionid: 1, points: 90 }),
        knex('votes').insert({id: 2, optionid: 2, points: 100}),
        knex('votes').insert({id: 3, optionid: 3, points: 120})
      ]);
    });
};
