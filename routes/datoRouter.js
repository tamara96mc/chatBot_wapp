const express = require('express');
const router = express.Router();

//Importo modelo de datos
const datoController = require('../controllers/datoController');


router.post('/', datoController.create);
router.put('/:id', datoController.update);
router.get('/telefono/:telefono', datoController.getByTelefono);
router.delete('/:id', datoController.delete);
router.delete('/telefono/:telefono', datoController.deleteAllByTelefono);


module.exports = router;