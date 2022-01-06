
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const logger = require('./config/winston');
const {sequelize_bd} = require('./config/db.js');
const router = require('./router.js');
const wakeUpDyno = require("./config/wokeDyno.js")


const app = express();
const PORT = process.env.PORT || 3000;
const PORT_DYNO = process.env.PORT || 4000; //la confi del puerto heroku
const DYNO_URL = "https://bot-jira-api.herokuapp.com"; // the url of your dyno

//Middleware
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", '*');
  next();
});

//Rutas
app.get('/', (req, res) => {res.send('ChatBot entre Jira y WhatApp');});
app.use(router);


app.listen(PORT_DYNO, () => {
  wakeUpDyno(DYNO_URL); // will start once server starts
})

//Connecting to the database
sequelize_bd.then(()=>{
    //Starting server
        app.listen(PORT, ()=> console.log(`Server on port ${PORT}`.bgGreen.black));
})
.catch((err)=> console.log(err.message));   


