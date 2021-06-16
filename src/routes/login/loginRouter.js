const router = require('express').Router()
const validaUsuario = require('../../middlewares/Validacao/Validacao').valida
const validaLogin = require('../../middlewares/Validacao/Validacao').validaUsuario
const Login = require('../../model/Login')
const Usuario = require('../../model/Usuario')


//Fazer login
router.post('/', validaUsuario, async (req, res, proximo) =>{
    try {      
        let {cpf, senha} = req.body
        const usuario = new Login({cpf,senha})
        let token = await usuario.logar()

        return res.status(200).json({token})
    } catch (erro) {
       
        proximo(erro)
    }   
})

router.post('/cadastro', validaLogin, async (req,res,proximo) =>{
    try {
        let {nome, sobrenome, datanascimento, rg, cpf, senha} = req.body
        const usuario = new Usuario({nome,sobrenome,dataNascimento: datanascimento,rg,cpf,senha})
        let usuarioCadastrado = await usuario.criar()        
        return res.status(201).json(usuarioCadastrado)
        
    } catch (erro) {
        proximo(erro)
    }
});

module.exports = router;