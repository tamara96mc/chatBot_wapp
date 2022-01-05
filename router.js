const router = require('express').Router();

// Middlewares
const auth = require('./middlewares/auth');

//Importamos Routes definidas en views

const UserRouter = require('./routes/userRouter');
const JiraRouter = require('./routes/jiraRouter');
const CampoRouter = require('./routes/campoRouter');
const ClienteRouter = require('./routes/clienteRouter');
const ProyectoRouter = require('./routes/proyectoRouter');
const TicketRouter = require('./routes/ticketRouter');
const DatoRouter = require('./routes/datoRouter');
const ManejadorRouter = require('./routes/manejadorRouter');


//Rutas
router.use('/api', UserRouter); //Login, register, findOne , Delete
router.use('/manejador', ManejadorRouter);
router.use('/jira', auth, JiraRouter); // CRUD 
router.use('/campo', auth, CampoRouter); // CRUD 
router.use('/cliente', auth, ClienteRouter); // CRUD 
router.use('/proyecto', auth, ProyectoRouter); // CRUD 
router.use('/ticket', auth, TicketRouter); // CRUD 
router.use('/dato', auth, DatoRouter); // CRUD 


module.exports = router;