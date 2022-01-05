//Importo modelo de datos
const db = require("../models");
const datos = db.dato;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 
const {sequelize_conexion} = require('../config/db.js');

var campoModel  = require('../models').campo;  //Add for dependency response

const datoController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all datos from database


//-------------------------------------------------------------------------------------
//CREATE a new dato in database
datoController.create = (req, res) => {
    // Validate request
    if (!req.body.valor) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a datos
    const newdato = {
      valor: req.body.valor,
      telefono: req.body.telefono,
      campoId: req.body.campoId
    };
  
    // Save datos in the database
    datos.create(newdato)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the dato."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a dato from database
datoController.update = (req, res) => {
    const id = req.params.id;
  
    datos.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "dato was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update dato with id=${id}. Maybe dato was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating dato with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET dato by Title from database 
//FindByTitle
  datoController.getByTelefono = (req, res) => {
    sequelize_conexion.query(`SELECT campos.nombre, datos.valor FROM datos
    INNER JOIN Campos ON datos.campoId=campos.id WHERE telefono
    ='${req.params.telefono}' `, { model: campoModel })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE a dato by Id from database
datoController.delete = (req, res) => {
    const id = req.params.id;
  
    datos.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "dato was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete dato with id=${id}. Maybe dato was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete dato with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all datos from database
//delete all datos 
  datoController.deleteAllByTelefono = (req, res) => {
    datos.destroy({
      where:  { telefono: req.params.telefono },
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} datos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all datos."
        });
      });
  };

module.exports = datoController;