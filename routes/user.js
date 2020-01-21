const express = require('express');
const user_router  = express.Router();
const uploadCloud = require('../config/cloudinary.js'); 

user_router.get('/:id', (req, res, next) => {
  res.render('user/user');
});

user_router.get('/:id/trees', (req, res, next) => {profile
  res.render('user/usertrees', );
});



module.exports = user_router;