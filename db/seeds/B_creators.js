exports.seed = function(knex, Promise) {
  return knex('creator')
    .then(function () {
      return Promise.all([
        knex('creator').insert({id: 1}),
        knex('creator').insert({id: 2}),
        knex('creator').insert({id: 3})
      ]);
    });
};
