const express = require('express');
const auth_router  = express.Router();

auth_router.get('/login', (req, res, next) => {
  res.render('authentication/login');
});

auth_router.get('/signup', (req, res, next) => {
  res.render('authentication/signup');
});

auth_router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = auth_router;