const {body, validationResult} = require('express-validator')
const express = require('express')
const router = express.Router();
const transacaoController = require('../../controllers/TransacaoController');
const loginController = require('../../controllers/LoginController');


router.get('/', loginController.verifyJWT, transacaoController.transacoes)
router.get('/debito', transacaoController.avaliable)
router.get('/credito', transacaoController.waiting)
router.post('/', [
    body("bandeira").isLength({min:2,max:30}).withMessage('Bandeira deverá ter no mínimo 2 e no máximo 30 caracteres'),    
    body("nrcartao").isLength({min:15, max:30}).withMessage('Número do Cartão deverá ter no mínimo 15 e no máximo 30 caracteres'),
    body("nomeportador").isLength({min:5, max:100}).withMessage('Nome do Portador deverá ter no mínimo 5 e no máximo 100 caracteres'),
    body("codigoverificacao").isLength({max:4, min:2}).isNumeric().withMessage('Código de Verificação deverá ter no mínimo 2 e no máximo 4 caracteres'),
    body("descricao").isLength({min:3, max:100}).withMessage('Descrição deverá ter no mínimo 3 e no máximo 100 caracteres'),
    body("valor").isNumeric().withMessage('Valor da Transação deverá ser numérico'),
    body("datavalidade").isDate().withMessage('Data de Validade deverá será uma data válida'),
    body("formapagto").isLength({min:6, max:7}).withMessage('Forma de pagamento deverá ter no mínimo 6 e no máximo 7 caracteres'),
], (req,res,next) =>{
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        let erro = { 
            campo:errors.array()[0].param,
            mensagem: errors.array()[0].msg
        }
        let erros = Array();
        erros.push(erro)
        return res.status(400).json({erros: erros})
    }
    transacaoController.transacao(req,res);
});



module.exports = router;