//Importo modelo de datos
const db = require("../models");
const clientes = db.cliente;
const {sequelize_conexion} = require('../config/db.js');
let moment = require('moment');
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var jiraModel = require('../models').jira;  //Add for dependency response

const clienteController = {}; //Create the object controller




//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all clientes from database
clienteController.getAllByJiraId = (req, res) => {

const jiraId = req.params.jiraId;

  sequelize_conexion.query(`SELECT * FROM clientes WHERE jiraId
  ='${jiraId}' `, { model: clientes })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clientes."
      });
    });
};


//-------------------------------------------------------------------------------------
//GET clientes by telefono from database
clienteController.getBytelefono = (req, res) => {
  const telefono = req.params.telefono;

  sequelize_conexion.query(`SELECT * FROM clientes WHERE telefono
  ='${telefono}' `, { model: clientes })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with telefono=${telefono}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving clientes with telefono=" + telefono
      });
    });
};



//-------------------------------------------------------------------------------------
//CREATE a new cliente in database
clienteController.create = (req, res) => {
  // Valtelefonoate request
  if (!req.body.telefono) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
    try {

      let now = Date.now();
      var dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');
      // Save clientes in the database
      sequelize_conexion.query(`
        INSERT INTO clientes (telefono, nombre, jiraId, createdAt, updatedAt)
        VALUES ( '${req.body.telefono}' , '${req.body.nombre}' , '${req.body.jiraId}' , '${dateStringWithTime}' , '${dateStringWithTime}' );
      `, { type: sequelize_conexion.QueryTypes.INSERT })
      
      res.send({
        message: "cliente was created successfully."
      });
  
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: "Error create cliente with telefono=" + req.body.telefono
      });
    }
};


//-------------------------------------------------------------------------------------
//UPDATE a cliente from database
clienteController.update = (req, res) => {
  const telefono = req.params.telefono;

  try {
    sequelize_conexion.query(`
    UPDATE clientes
    SET nombre = '${req.body.nombre}'
    WHERE telefono = '${telefono}'; `, { model: clientes })
    res.send({
      message: "cliente was updated successfully."
    });

  } catch (err) {
    res.status(500).send({
      message: "Error updating cliente with telefono=" + telefono
    });
  }
};

//-------------------------------------------------------------------------------------
//DELETE a cliente by telefono from database
clienteController.delete = (req, res) => {
  const telefono = req.params.telefono;

  clientes.destroy({
    where: { telefono: telefono }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "cliente was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete cliente with telefono=${telefono}. Maybe cliente was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cliente with telefono=" + telefono
      });
    });
};



module.exports = clienteController;