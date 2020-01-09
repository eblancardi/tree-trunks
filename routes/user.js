const express = require('express');
const user_router  = express.Router();

user_router.get('/:id', (req, res, next) => {
  res.render('profile/myprofile');
});

user_router.get('/:id/trees', (req, res, next) => {
  res.render('profile/mytrees');
});

module.exports = user_router;