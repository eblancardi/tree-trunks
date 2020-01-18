const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js'); 
const User = require ("../models/user");

router.get('/', (req, res, next) => {
  res.render('index',{ user: req.user });
});

router.get('/map', (req, res, next) => {
  res.render('map');
  // onRegionClick: function(region)
  // {  res.render('map', {
  //   countrydata: response.data

  // });}

});


module.exports = router;
