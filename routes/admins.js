"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    const adminID = req.params.id;
      console.log(adminID)
      knex('poll')
      .join('options', 'poll.id', '=', 'options.pollid')
      .where('adminurl', adminID)
      .join('votes', 'options.id', '=', 'votes.optionid')
      // .join('voters', 'votes.optionid', '=', 'voters.id')
      // .sum('points as total')
      // .groupBy('title')
      .select('polldescription', 'title', 'description', 'adminurl', 'optionid', 'points')
      .then((results) => {
        let templateVars = {votes: results};
        console.log('THESE ARE THE RESULTS', results);
        res.render("admin", templateVars);
    });
  });
  return router;
};
