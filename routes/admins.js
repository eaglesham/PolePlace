"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {

    knex
      .select("*")
      .from("votes")
      .then((results) => {
        let templateVars = {votes: results};
        // console.log(results);
        // [
        // anonymous { id: 1, optionid: 1, points: 1 },
        // anonymous { id: 2, optionid: 2, points: 2 }
        //]
        res.render("admin", templateVars);
    });
  });
  return router;
};
