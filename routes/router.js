const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js'); 
const User = require ("../models/user");
const userTree = require('../models/usertree')

router.get('/', (req, res, next) => {
  res.render('index',{ user: req.user });
});

router.get('/alltrees', (req, res, next) => {
  userTree.find()
    .populate("creatorID")
    .then(usertree => {
        usertree.forEach(usertree => {
        const date = usertree.created_at;
        console.log(date)
        const day = date.getDate();
        var month = date.getMonth()+1;
         if (month<10) {month=`0${month}`;}
        const year = date.getFullYear()
        usertree.created_at_short = `  ${day}-${month}-${year}`})
        res.render('alltrees', {trees: usertree})})
        .catch(error => console.log('Error while getting tree from the DB: ', error))
      });

module.exports = router;
