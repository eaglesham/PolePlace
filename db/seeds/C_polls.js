exports.seed = function(knex, Promise) {
  return knex('poll')
    .then(function () {
      return Promise.all([
        knex('poll').insert({id: 1, creatorid: 1, polldescription: "poll A", submissionurl: "submission url A", adminurl: "adminurl A"}),
        knex('poll').insert({id: 2, creatorid: 2, polldescription: "poll B", submissionurl: "submission url B", adminurl: "adminurl B"}),
        knex('poll').insert({id: 3, creatorid: 3, polldescription: "poll C", submissionurl: "submission url C", adminurl: "adminurl C"})
      ]);
    });
};
