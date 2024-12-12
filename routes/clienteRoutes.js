const express = require('express');
const { getAllClientes, createCliente } = require('../controllers/clienteController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();
router.get('/', authenticateToken, getAllClientes);
router.post('/', authenticateToken, createCliente);

module.exports = router;