const express = require('express');
const routes = express.Router();
const cartaoController = require('../controllers/CartaoController')
const transacaoController = require('../controllers/TransacaoController')


routes.get('/cartoes', cartaoController.index)
routes.post('/cartoes',cartaoController.create)
routes.post('/transacao', transacaoController.transacao);
routes.get('/transacao/debito', transacaoController.avaliable)
routes.get('/transacao/credito', transacaoController.waiting)
routes.get('/transacao', transacaoController.transacoes)

module.exports = routes;