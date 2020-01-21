const mongoose = require("mongoose");
const usertree = require("../models/usertree");

mongoose
  .connect("mongodb://localhost:27017/tree-trunks", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
