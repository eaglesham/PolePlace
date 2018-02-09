exports.seed = function(knex, Promise) {
  return knex('votes')
    .then(function () {
      return Promise.all([
        knex('votes').insert({optionid: 1, points: 90 }),
        knex('votes').insert({optionid: 2, points: 100}),
        knex('votes').insert({optionid: 3, points: 120})
      ]);
    });
};
