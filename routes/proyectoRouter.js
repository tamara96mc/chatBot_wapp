const express = require('express');
const router = express.Router();

//Importo modelo de datos
const proyectoController = require('../controllers/proyectoController');


router.get('/jiraId/:jiraId', proyectoController.getAllByJira);
router.post('/', proyectoController.create);
router.put('/:id', proyectoController.update);
router.delete('/:id', proyectoController.delete);
router.get('/nombre/:nombre', proyectoController.getTipoByProyecto);



module.exports = router;