const mongoose = require("mongoose");
const { model } = require("../models/celebrity");

const dbConnection = mongoose.connect("mongodb://localhost/celebrities", {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
.then(result => console.log("connected in database"))
.catch(err => console.log("err connecting", err))

module.exports = dbConnection;