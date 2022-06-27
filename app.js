// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
// const mongoose = require('mongoose');
// const logger = require('morgan');

const app = express();

// Iteration 12
// https://axiacore.com/blog/check-if-item-array-handlebars-547/
hbs.registerHelper('ifIn', function(elem, list, options) {
    if (list.indexOf(elem) > -1) {
        return options.fn(this);
    }

    return options.inverse(this);
});

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "celebrities-collection";
// const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
// app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const celebrity = require('./routes/celebrities')
app.use('/', celebrity)

const index = require('./routes/index');
app.use('/', index);

const movie = require('./routes/movies')
app.use('/', movie)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;