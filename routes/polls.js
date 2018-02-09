"use strict";

const express = require('express');
const router  = express.Router();

const api_key = process.env.MAILGUN_API;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

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

    if (!req.body.pollQuestion || !req.body.opt1 || !req.body.opt2) {
      res.status(400).json({ error: 'invalid request: please submit a question with at least 2 options'});
      return;
    }
    const randomPollID = generateRandomString();
    const randomAdminID = generateRandomString();
    
    knex('creator')
    .insert({}).returning('id')
    .then(function(creatorid) {
      let data = {
        from: 'PolePlace <noreply@newpoll.poleplace.com>',
        to: req.body.creatoremail,
        subject: 'Your new poll',
        text: `See your results for ${req.body.pollQuestion} at: http://localhost:8080/admins/${randomAdminID} \nAdd your own input for ${req.body.pollQuestion} at: http://localhost:8080/polls/${randomPollID}`
      };           
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
      return knex('poll')
      .insert({creatorid: creatorid[0], polldescription: req.body.pollQuestion, submissionurl: randomPollID, adminurl: randomAdminID}).returning('id')
      .then(function(pollid) {
          let options = Object.values(req.body);
          let promises = [];
          for (let option of options) {
            promises.push(knex('options').insert({pollid: pollid[0], title: option}));
          }
          return Promise.all(
            promises
          );
      });
      process.exit();
    });
    res.redirect(`http://localhost:8080/polls/${randomPollID}`)
  
  });
  
  return router;
}


