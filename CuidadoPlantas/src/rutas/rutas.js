const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/loginController');
const plantsController = require('./../controllers/plantscontrollers');

// Middleware to parse JSON
router.use(express.json());

// Routes for login and signup
router.post('/signup', signup);
router.post('/login', login);

//Routes from plants Data
router.post('/Agregar-Planta',plantsController.agregarPlanta);
router.put('/eliminar-planta',plantsController.eliminarPlanta);
router.post('/Info-Planta',plantsController.MostrarDatosPlanta);
router.post('/Notificacion',plantsController.notificacionEstado);
router.put('temperatura-planta',plantsController.tempPlanta);



module.exports = router;
