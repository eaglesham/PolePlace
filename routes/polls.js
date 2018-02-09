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
    console.log(Object.values(req.body));
    if (!req.body.pollQuestion || !req.body.opt1 || !req.body.opt2) {
      res.status(400).json({ error: 'invalid request: please submit a question with at least 2 options'});
      return;
    }
    
    let randomPollID = generateRandomString();
    let randomAdminID = generateRandomString();
    let adminEmail = ''; //email submitted from form 
    //add 
    knex('creator')
    .insert({}).returning('id')
    .then(function(creatorid) {
        console.log(creatorid);
        return knex('poll')
      .insert({creatorid: creatorid[0], polldescription: req.body.pollQuestion, submissionurl: '/polls/randomPollID', adminurl: '/polls/randomAdminID'}).returning('id')
      .then(function(pollid) {
          console.log('IN PROMISE ALL', req.body.opt1, req.body.opt2)
          let title1 = req.body.opt1;
          let title2 = req.body.opt2;
          let options = Object.values(req.body);
          let promises = [];
          for (let option of options) {
            promises.push(knex('options').insert({pollid: pollid[0], title: option}));
          }
          return Promise.all(
            promises
          )
      });
      process.exit();
    });
   

    res.send()
  });
  
  return router;
}


