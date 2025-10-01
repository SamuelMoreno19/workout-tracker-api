const express = require("express");
const router = express.Router();

//Importar rutas específicas de la versión 1
const userRoutes = require('./user.routes.js');

//Configurar las rutas
router.use('/users', userRoutes);

module.exports = router;