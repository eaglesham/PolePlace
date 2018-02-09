"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    const adminID = req.params.id;

    knex('poll')
      .join('options', 'poll.id', '=', 'options.pollid')
      .where('creatorid', '=', adminID)
      .join('votes', 'options.id', '=', 'votes.optionid')
      .join('voters', 'votes.optionid', '=', 'voters.id')
      .select('polldescription', 'title', 'description', 'adminurl', 'points', 'name')
      .then((results) => {
        let templateVars = {votes: results};
        res.render("admin", templateVars);
    });
  });
  return router;
};
