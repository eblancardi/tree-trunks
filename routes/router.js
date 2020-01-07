const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/map', (req, res, next) => {
  res.render('map');
});

module.exports = router;
