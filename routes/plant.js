const express = require('express');
const plant_router  = express.Router();
const userTree = require('../models/usertree.js');
const dataTrees = require("../public/javascripts/dataTrees");
const User = require ("../models/user");

plant_router.get('/', (req, res, next) => {
  res.render("plant/plant", {tree: dataTrees, user: req.user})
});

// plant_router.post('/confirmation', (req, res, next) => {
//   const {image,name,family,shape, description,bloom, climate, creatorID,country } = req.body;
//   const newTree = new userTree({image,name,family,shape,description,bloom,climate,creatorID,country, created_at_short});
//   newTree.save()
//     .then(() => {
//       User.findByIdAndUpdate(req.user._id, { $push: {trees: newTree} }, {new:true})
//       .then(()=>{
//         res.redirect('/plant/confirmation')
//     })
//     .catch(error => {
//       next(error);
//     });
//   }).catch(error => {
//   next(error);
// })
// })

plant_router.post('/confirmation', (req, res, next) => {
  const {image,name,family,shape, description,bloom, climate, creatorID,country } = req.body;
  const newTree = new userTree({image,name,family,shape,description,bloom,climate,creatorID,country});
  newTree.save()
    .then(usertree => {
      const date = usertree.created_at;
      console.log(date);
      const day = date.getDate();
      var month = date.getMonth()+1;
        if (month<10) {month=`0${month}`;}
      const year = date.getFullYear();
      usertree.updateOne({ $set: {created_at_short: `${day}-${month}-${year}` }},{upsert:true}, {new:true});
      User.findByIdAndUpdate(req.user._id, { $push: {trees: newTree} }, {new:true})
      .then(()=>{
        res.redirect('/plant/confirmation')
    })
  })
    .catch(error => {
      next(error);
    });
  })



plant_router.get('/confirmation', (req, res, next) => {
  userTree.findById(req.user.trees[req.user.trees.length-1])
  .then(tree => {
    console.log(tree);
  res.render('plant/confirmation', {tree})})
  .catch(error => {
    next(error);
  })
});

module.exports = plant_router;