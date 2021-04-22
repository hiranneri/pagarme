const express = require('express');
const routes = express.Router();
const cartaoController = require('../controllers/CartaoController')


routes.get('/cartoes', cartaoController.index)
routes.post('/cartoes',cartaoController.create)

module.exports = routes;