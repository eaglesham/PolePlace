"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {

    knex('options')
      .join('votes', 'options.pollid', '=', 'votes.optionid')
      .join('voters', 'votes.optionid', '=', 'voters.id')
      .select('title', 'description', 'points', 'name')
      .then((results) => {
        let templateVars = {votes: results};
        res.render("admin", templateVars);
    });
  });
  return router;
};
