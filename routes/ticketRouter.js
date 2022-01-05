const express = require('express');
const router = express.Router();

//Importo modelo de datos
const ticketController = require('../controllers/ticketController');


router.post('/', ticketController.create);

module.exports = router;