"use strict";

const express = require('express');
const router = express.Router();

const api_key = process.env.MAILGUN_API;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});

function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = (knex) => {
  // Create Poll page
  router.get("/:id", (req, res) => {
    const pollID = req.params.id;

    knex('poll')
      .join('options', 'poll.id', '=', 'options.pollid')
      .where('submissionurl', '=', pollID)
      .select('polldescription', 'title', 'description')
      .then((results) => {
        let templateVars = {
          thispoll: results
        };

        console.log("THESE ARE RESULTS", results);
        res.render("poll", templateVars);
      })
  });


  router.post("/", (req, res) => {

    if (!req.body.pollQuestion || !req.body.opt1 || !req.body.opt2) {
      res.status(400).json({
        error: 'invalid request: please submit a question with at least 2 options'
      });
      return;
    }

    const randomPollID = generateRandomString();
    const randomAdminID = generateRandomString();

    knex('creator')
    .insert({})
    .returning('id')
    .then(function (creatorid) {
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
      .insert({
        creatorid: creatorid[0],
        polldescription: req.body.pollQuestion,
        submissionurl: randomPollID,
        adminurl: randomAdminID
      }).returning('id')
      .then(function (pollid) {
        let options = Object.values(req.body);
        let promises = [];
        for (let i = 1; i < (options.length) - 1; i++) {
          promises.push(knex('options').insert({
            pollid: pollid[0],
            title: options[i]
          }));
        }
        return Promise.all(
          promises
        )
      });
    })
    .then(function () {
      res.redirect(`http://localhost:8080/polls/${randomPollID}`);
    });

  });

  return router;
}
