const express = require('express');
const router = express.Router();

//Importo modelo de datos
const clienteController = require('../controllers/clienteController');


router.get('/jiraId/:jiraId', clienteController.getAllByJiraId);
router.get('/:telefono', clienteController.getBytelefono);
router.post('/', clienteController.create);
router.put('/:telefono', clienteController.update);
router.delete('/:telefono', clienteController.delete);

module.exports = router;