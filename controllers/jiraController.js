//Importo modelo de datos
const db = require("../models");
const jira = db.jira;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

const JiraController = {}; //Create the object controller


//-------------------------------------------------------------------------------------

  JiraController.getByUserID = (req, res) => {
    jira.findAll({ where: { userId: req.params.userId } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving jiras."
        });
      });
  };

//-------------------------------------------------------------------------------------
//CREATE a new jira in database
JiraController.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a jira
    const newjira = {
      nombre: req.body.nombre,
      url_jira: req.body.url_jira,
      usuario: req.body.usuario,
      contraseya: req.body.contraseya,
      telefono: req.body.telefono,
      tipo_jira: req.body.tipo_jira,
      userId: req.body.userId
    };
  
    // Save jira in the database
    jira.create(newjira)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the newjira."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a jira from database
JiraController.update = (req, res) => {
    const id = req.params.id;
  
    jira.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "jira was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update jira with id=${id}. Maybe Movie was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating jira with id=" + id
        });
      });
  };



module.exports = JiraController;