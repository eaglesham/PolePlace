exports.seed = function(knex, Promise) {
  return knex('creator')
    .then(function () {
      return Promise.all([
        knex('creator').insert({}),
        knex('creator').insert({}),
        knex('creator').insert({})
      ]);
    });
};
