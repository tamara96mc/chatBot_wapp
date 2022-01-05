const db = require("../models");
const User = db.users;
// const { user } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const UserController = {}; //Create the object controller

const { isValidPassword } = require('../services/validations');
const {
  hashPassword,
  comparePassword,
  createJWT
} = require('../services/authorization');

async function registerController(req, res, next) {
  try {
    isValidPassword(req.body.contraseya);
    req.body.contraseya = await hashPassword(req.body.contraseya);
    const user = await User.create(req.body);
    res.status(200).json({
      message: 'register done',
      user: user,
    });
  } catch (error) {
    console.log(error);

    if (error.message === 'invalidPasswordError') {
      return res.status(400).json({
        message: 'invalid password',
        error: error,
      });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'register invalid',
        error: error.errors[0].message,
      });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'register invalid',
        error: error.errors[0].message,
      });
    }
    res.status(500).json({
      message: 'register not done',
      error: error,
    });
  }
}

async function loginController(req, res, next) {
  try {
    const user = await User.findOne({
      where: { correo: req.body.correo },
    });
    if (!user) throw new Error('no user');
    const isValidPassword = await comparePassword(
      req.body.contraseya,
      user.contraseya,
    );
    if (!isValidPassword) throw new Error('no valid password');

    const data = {
      nombre: user.nombre,
      correo: user.correo,
      id: user.id,
    };
    user.token = await createJWT(data);
    await user.save();


    res.json({
      message: 'valid login',
      user: data,
      token: user.token
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      message: 'login invalid',
    });
  }
}

async function logoutController(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    user.token = null;
    await user.save();
    res.json({ message: 'logout done' });
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'ups' })
  }
}


async function update(req, res) {


  const id = req.params.id;

  // if (req.user.usuario.rol == "administrador" || req.user.usuario.id == id) {// HACEMOS QUE SOLO PUEDA ACTULIZARLO EL ADMINISTRADOR O EL USUARIO DUEÑO DEL PERFIL

  isValidPassword(req.body.contraseya);
  req.body.contraseya = await hashPassword(req.body.contraseya);
  
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El usuario ha sido actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se ha podido actualizar el usuario con el id ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ha surgido algún error al intentar actualizar el usuario con el id " + id + "."
      });
    });
  // }else{
  //   res.send({
  //     message: `No tienes permisos para modificar el perfil indicado.`
  //   });
  // }
};


module.exports = {
  registerController,
  loginController,
  logoutController,
  update
};