const express = require('express');
const plant_router  = express.Router();
const userTree = require('../models/usertree.js');
const dataTrees = require("../public/javascripts/dataTrees")
const User = require ("../models/user");

plant_router.get('/', (req, res, next) => {
  console.log("hey" + req.user)
  res.render("plant/plant", {tree: dataTrees, user: req.user})
});

plant_router.post('/confirmation', (req, res, next) => {
  const {image,name,family,shape, description,bloom, climate, creatorID,country } = req.body;
  console.log(creatorID)
  console.log(req.user)
  const newTree = new userTree({image,name,family,shape,description,bloom,climate,creatorID,country});
  newTree.save()
    .then(() => {
      req.user.trees.push(newTree);
      console.log(req.user)
      res.redirect('/plant/confirmation');
    })
    .catch(error => {
      next(error);
    })
  ;
});

plant_router.get('/confirmation', (req, res, next) => {
  console.log(req.user)
  res.render('plant/confirmation', {tree: req.user.trees[trees.length-1].name});
//   userTree.findOne({_id: req.params.id})
//   .populate('User')
//   .then(tree => {
//     console.log('tree=', tree);
//     res.render('plant/confirmation', {tree: userTree})
//   })
//   .catch(err => next(err))
// ;
});

module.exports = plant_router;