"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    const adminID = req.params.id;

    knex('poll')
      .join('options', 'poll.id', 'options.pollid')
      .where('adminurl',adminID)
      .join('votes', 'options.id', 'votes.optionid')
      .select('polldescription', 'title', 'description', 'adminurl', 'optionid', 'points')

      .then((results) => {
        let resultsTotals = {};
        for (let obj of results) {
          if (!resultsTotals[obj.title]) {
          resultsTotals[obj.title] = obj.points;
          } else {
            resultsTotals[obj.title] += obj.points;
          }
        }
        let templateVars = {votes: results, votesTotals: resultsTotals};
        if (!templateVars) {
          res.send({ error: 'this poll has not received any votes yet' });
        } else
        res.render("admin", templateVars);
    });
  });

  return router;
};
