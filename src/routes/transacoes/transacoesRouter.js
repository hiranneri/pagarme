const express = require('express')
const router = express.Router();
const transacaoController = require('../../controllers/TransacaoController')


router.get('/transacao', transacaoController.transacoes)
router.get('/transacao/debito', transacaoController.avaliable)
router.get('/transacao/credito', transacaoController.waiting)
router.post('/transacao', transacaoController.transacao);



module.exports = router;