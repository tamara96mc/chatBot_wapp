//Importo modelo de datos
const db = require("../models");
const tickets = db.ticket;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var clienteModel  = require('../models').cliente;  //Add for dependency response

const ticketController = {}; //Create the object controller


//-------------------------------------------------------------------------------------
//CREATE a new ticket in database
ticketController.create = (req, res) => {
    // Validate request
    if (!req.body.proyecto) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a tickets
    const newticket = {
      proyecto: req.body.proyecto,
      tipo: req.body.tipo,
      resumen: req.body.resumen,
      descripcion: req.body.descripcion,
      tarea: req.body.tarea,
      nombre: req.body.nombre,
      telefono: req.body.telefono,
    };
  
    // Save tickets in the database
    tickets.create(newticket)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ticket."
        });
      });
  };



module.exports = ticketController;