"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
    // Create Poll page
  router.get("/", (req, res) => {

    res.render("create");
  });

  router.post("/")

  return router;
}
