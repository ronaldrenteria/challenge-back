const { Router } = require('express');
const router = Router();

const { procesData } = require('../controllers/files.controllers');




router.get('/', procesData);


module.exports = router;
