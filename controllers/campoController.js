//Importo modelo de datos
const db = require("../models");
const campos = db.campo;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var jiraModel  = require('../models').jira;  //Add for dependency response

const campoController = {}; //Create the object controller

//CRUD end-points Functions

//-------------------------------------------------------------------------------------
//GET all campos from database
campoController.getAllByJira = (req, res) => {

  const jiraId = req.params.jiraId;
    
  campos.findAll( {where: { jiraId: jiraId }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving campos."
      });
    });
};


//-------------------------------------------------------------------------------------
//CREATE a new campo in database
campoController.create = (req, res) => {
    // Validate request
    if (!req.body.custom_field) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a campos
    const newcampo = {
      custom_field: req.body.custom_field,
      nombre: req.body.nombre,
      jiraId: req.body.jiraId
    };
  
    // Save campos in the database
    campos.create(newcampo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the campo."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a campo from database
campoController.update = (req, res) => {
    const id = req.params.id;
  
    campos.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "campo was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update campo with id=${id}. Maybe campo was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating campo with id=" + id
        });
      });
  };




//-------------------------------------------------------------------------------------
//DELETE a campo by Id from database
campoController.delete = (req, res) => {
    const id = req.params.id;
  
    campos.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "campo was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete campo with id=${id}. Maybe campo was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete campo with id=" + id
        });
      });
  };



module.exports = campoController;