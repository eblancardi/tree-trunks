const express = require('express');
const plant_router  = express.Router();
const userTree = require('../models/usertree.js');
const dataTrees = require("../public/javascripts/dataTrees");
const User = require ("../models/user");

plant_router.get('/', (req, res, next) => {
  console.log(req.user)
  res.render("plant/plant", {tree: dataTrees, user: req.user})
});

plant_router.post('/', (req, res, next) => {
  console.log(req.body)
  const {image,name,family,shape, description,bloom, climate, creator,country } = req.body;
  const newTree = new userTree({image,name,family,shape,description,bloom,climate,creator,country});
  newTree.save()
    .then(res.redirect('/plant/confirmation'), {tree: req.body, user: req.user})
    .catch(error => {
      next(error);
    })
  ;
});

plant_router.get('/confirmation', (req, res, next) => {
  console.log(req.body)
  res.render('plant/confirmation', {tree: userTree, user: req.user});
});

module.exports = plant_router;