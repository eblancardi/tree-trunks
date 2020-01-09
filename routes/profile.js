const express = require('express');
const profile_router  = express.Router();

profile_router.get('/', (req, res, next) => {
  res.render('profile/myprofile');
});

profile_router.get('/mytrees', (req, res, next) => {
  res.render('profile/mytrees');
});

profile_router.get('/edit', (req, res, next) => {
  res.render('profile/editprofile');
});

module.exports = profile_router;