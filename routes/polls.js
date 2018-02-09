"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
    // Create Poll page
  router.get("/:id", (req, res) => {

    res.render("poll");
  });

  router.post("/", (req, res) => {
    let randomPollID = generateRandomString();
    let randomAdminID = generateRandomString();
    let adminEmail = ''; //email submitted from form 
    //add 
    console.log('TESSTSSSSSSST')
    knex('poll')
    .insert({polldescription: arg1, submissionurl: '/polls/randomPollID', adminurl: '/polls/randomAdminID'});
    knex('options')
    .insert({title: x, description: xx});
    .then(function() {
    process.exit();
    });

  });

  return router;

}
