const express = require('express');
const profile_router  = express.Router();
const userTree = require('../models/usertree')
const uploadCloud = require('../config/cloudinary.js'); 

profile_router.get('/', (req, res, next) => {
  res.render('profile/myprofile');
});

profile_router.get('/mytrees', (req, res, next) => {
  userTree.find()
        .then(usertree => res.render('profile/mytrees', {usertree}))
        .catch(error => console.log('Error while getting tree from the DB: ', error))
});

profile_router.get('/edit', (req, res, next) => {
  res.render('profile/editprofile');
});

module.exports = profile_router;