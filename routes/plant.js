const express = require('express');
const plant_router  = express.Router();

plant_router.get('/', (req, res, next) => {
  res.render('plant/plant');
});

plant_router.get('/confirmation', (req, res, next) => {
  res.render('plant/confirmation');
});

module.exports = plant_router;