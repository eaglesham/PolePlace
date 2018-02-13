"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const adminRoutes = require("./routes/admins");
const createRoutes = require("./routes/create");
const pollRoutes = require("./routes/polls");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/admins", adminRoutes(knex));
app.use("/create", createRoutes(knex));
app.use("/polls", pollRoutes(knex));


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//Delete poll
app.post("/polls/:id/delete", (req, res) => {
  let url = req.params.id;
  knex('poll')
    .del()
    .where('poll.adminurl', url);
  res.redirect('/');
});

  app.post('/chart-data', (req, res) => {
   var id = (req.body.url).substr((req.body.url).length - 6);
    knex('poll')
      .join('options', 'poll.id', 'options.pollid')
      .where('adminurl', id)
      .join('votes', 'options.id', 'votes.optionid')
      .select('polldescription', 'title', 'description', 'adminurl', 'optionid', 'points')

      .then((results) => {
        //console.log(results);
        let resultsTotals = {};
        for (let obj of results) {
          if (!resultsTotals[obj.title]) {
          resultsTotals[obj.title] = obj.points;
          } else {
            resultsTotals[obj.title] += obj.points;
          }
        }
        //console.log(resultsTotals);
        let templateVars = {votes: results, votesTotals: resultsTotals};
    res.json(templateVars);
  });
    });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
