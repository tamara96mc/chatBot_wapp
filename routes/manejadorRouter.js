const express = require('express');
const router = express.Router();

//Importo modelo de datos
const ManejadorController = require('../controllers/manejadorController');


router.post('/createBot', ManejadorController.createBot);



module.exports = router;