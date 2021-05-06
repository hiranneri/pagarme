const {body, validationResult} = require('express-validator')
const express = require('express')
const router = express.Router();
const loginController = require('../../controllers/LoginController')



router.post('/cadastro', [
    body("nome").isLength({min:2,max:30}).withMessage('Nome deverá ter no mínimo 2 e no máximo 30 caracteres'),    
    body("sobrenome").isLength({min:15, max:30}).withMessage('Sobrenome deverá ter no mínimo 15 e no máximo 30 caracteres'),
    body("datanascimento").isDate().withMessage('Data nascimento deverá ter no mínimo 5 e no máximo 100 caracteres'),
    body("rg").isLength({max:10, min:8}).isNumeric().withMessage('RG deverá ter no mínimo 8 e no máximo 10 caracteres, sem pontos ou traços'),
    body("cpf").isLength({min:10, max:10}).withMessage('CPF deverá ter no mínimo 10 e no máximo 10 caracteres, sem pontos ou traços'),
    body("senha").isLength({min:10, max:10}).withMessage('Senha deverá ter no mínimo 10 e no máximo 10 caracteres'),
    
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
    loginController.create(req,res);
});

router.post('/', [
    body("cpf").isLength({min:10, max:11}).withMessage('CPF deverá ter no mínimo e máximo 10 caracteres, sem pontos ou traços'),
    body("senha").isLength({min:10, max:10}).withMessage('Senha deverá ter obrigatoriamente 10 caracteres'),
   
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
    let validaUsuario = loginController.validarUsuario(req,res);
    if(validaUsuario){
        const token = loginController.criarToken();
        return res.json({auth: true, token})
    }
    return res.status(401).json({message: "Usuário/Senha inválidos"})
});



module.exports = router;