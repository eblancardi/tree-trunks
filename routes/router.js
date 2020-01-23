const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js'); 
const User = require ("../models/user");
const userTree = require('../models/usertree')
const dataTrees = require("../public/javascripts/dataTrees");

router.get('/', (req, res, next) => {
  res.render('index',{ user: req.user });
});

router.get('/alltrees', (req, res, next) => {
  // if(req.query!==''){
  // userTree.find({country:req.query.country})
  //   .populate("creatorID")
  //   .then(usertree => {
  //       res.render('alltrees', {trees: usertree})})
  //       .catch(error => console.log('Error while getting tree from the DB: ', error))}
  //       else {
          userTree.find()
          .populate("creatorID")
          .then(usertree => {
              res.render('alltrees', {trees: usertree, alltrees:dataTrees})})
              .catch(error => console.log('Error while getting tree from the DB: ', error))}
      );

router.post('/alltrees', (req, res, next) => {
  const filter=req.body.country;
   userTree.find({country: filter})
    .then(usertree => {
      res.render('alltrees', {trees: usertree, alltrees:dataTrees})}
         )
    .catch(error => console.log('Error while getting tree from the DB: ', error))
});

          
module.exports = router;
