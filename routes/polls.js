"use strict";

const express = require('express');
const router  = express.Router();

function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = (knex) => {
    // Create Poll page
  router.get("/:id", (req, res) => {

    res.render("poll");
  });

  router.post("/", (req, res) => {
    console.log(req.body.pollQuestion, req.body.opt1, req.body.opt2);
    if (!req.body.pollQuestion || !req.body.opt1 || !req.body.opt2) {
      res.status(400).json({ error: 'invalid request: please submit a question with at least 2 options'});
      return;
    }
    
    let randomPollID = generateRandomString();
    let randomAdminID = generateRandomString();
    let adminEmail = ''; //email submitted from form 
    //add 
    knex('creator')
    .insert({})
    // .then(function() {
    //   knex('poll')
    // .insert({creatorid: 4, polldescription: req.body.pollQuestion, submissionurl: '/polls/randomPollID', adminurl: '/polls/randomAdminID'})
    // })
    // knex('options')
    // .insert({title: req.body.op1})
    // .insert({title: req.body.op2})
    .then(function() {
    process.exit();
    });
    res.send()
  });
  
  return router;
}


