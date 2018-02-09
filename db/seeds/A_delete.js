exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('options').del(),
    knex('poll').del(),
    knex('votes').del(),
    knex('creator').del(),
    knex('voters').del()
  ]);
};
