const express = require('express')
const router = express.Router();
const cartaoController = require('../../controllers/CartaoController')


router.get('/cartoes', cartaoController.index)
router.post('/cartoes',cartaoController.create)

module.exports = router;