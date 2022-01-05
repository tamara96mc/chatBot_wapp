//Importo modelo de datos
const db = require("../models");
const proyectos = db.proyecto;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var jiraModel  = require('../models').jira;  //Add for dependency response

const proyectoController = {}; //Create the object controller

//CRUD end-points Functions

//-------------------------------------------------------------------------------------
//GET all campos from database
proyectoController.getAllByJira = (req, res) => {
    
  const jiraId = req.params.jiraId;

  proyectos.findAll( {where: { jiraId: jiraId }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving proyectos."
      });
    });
};


//-------------------------------------------------------------------------------------
//CREATE a new campo in database
proyectoController.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a campos
    const newproyecto = {
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      jiraId: req.body.jiraId
    };
  
    // Save campos in the database
    proyectos.create(newproyecto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the proyecto."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a campo from database
proyectoController.update = (req, res) => {
    const id = req.params.id;
  
    proyectos.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "proyecto was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update proyecto with id=${id}. Maybe proyecto was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating proyecto with id=" + id
        });
      });
  };




//-------------------------------------------------------------------------------------
//DELETE a campo by Id from database
proyectoController.delete = (req, res) => {
    const id = req.params.id;
  
    proyectos.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "proyecto was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete proyecto with id=${id}. Maybe proyecto was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete campo with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET proyecto by Title from database 
//FindByTitle
  proyectoController.getTipoByProyecto = (req, res) => {
    proyectos.findAll({ where: { nombre: req.params.nombre } })
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




module.exports = proyectoController;