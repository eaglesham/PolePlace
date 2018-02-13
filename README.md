# :triangular_flag_on_post: PolePlace 

## Project Setup

PolePlace is a full-stack app which functions as a decision-maker where you can poll selected indiviuals and privately view the results. It was implemented through JavaScript, CSS, AJAX, jQuery, HTML, SQL, Node, and Express.

## Final Product

![Screenshot of index page](https://github.com/rachie-dxo/midterm/blob/master/docs/homepage.png)
Home page

![screenshot of dynamic options](https://github.com/rachie-dxo/midterm/blob/master/docs/dynamic-options.gif)
Options can be added dynamically, with a maximum of 10 total.

![screenshot of vote ordering](https://github.com/rachie-dxo/midterm/blob/master/docs/dynamic-reorder-vote.gif)
Votes are calculated through the Borda Count method, where points are assigned based on draggable rankings.

![screenshot of results](https://github.com/rachie-dxo/midterm/blob/master/docs/chart.png)
Results page, visible only to admin who is emailed the link. Somehow, wine lost.

## Getting Started

1. Create the .env by using .env.example as a reference: cp .env.example .env
2. Update the .env file with your correct local information
3. Install dependencies: npm i
4. Fix to binaries for sass: npm rebuild node-sass
5. Run migrations: npm run knex migrate:latest
6. Check the migrations folder to see what gets created in the DB
7. Run the seed: npm run knex seed:run
8. Check the seeds file to see what gets seeded in the DB
9. Run the server: npm run local
10. Visit http://localhost:8080/

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser
- dotenv
- EJS
- Express
- Knex
- knex-logger
- Mailgun-js
- morgan
- node-sass-middleware
- pg (node-postgres)
