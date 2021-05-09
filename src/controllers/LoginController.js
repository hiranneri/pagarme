const jwt = require('jsonwebtoken')
const SECRET = 'pagarme-2021'
const utils = require('../utils/Utils');
const loginData = require('../data/LoginData')
const bcrypt = require('bcrypt');

module.exports= {
    async create(req,res,next){
        try {
            let {nome,sobrenome,datanascimento,rg,cpf,senha} = req.body;
            datanascimento = utils.formatarData(datanascimento);
            senha = utils.hashSenha(senha);
            const usuario = {
                nome,
                sobrenome,
                datanascimento,
                rg,
                cpf,
                senha
            }
            let numero = this.criarConta();        
            let dataAbertura = new Date();
            let dataFechamento;
            let conta = {
                numero,
                dataabertura:dataAbertura,
                datafechamento:dataFechamento
            }        
            const result = await loginData.create(usuario, conta);
            if(result){
                conta = utils.formatarConta(conta);
                return res.status(201).json({
                    conta,
                    usuario: req.body
                })

            }else{
                console.log('erro no Data')
                return res.status(500).json({message:"Ocorreu um erro, tente novamente"})
            }
            
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message:"Ocorreu um erro, tente novamente"})
        }
    },
    criarConta(){
        let numero = (Math.random() * 100000000).toFixed(0);
        let ultimoIndice = numero.length-1;
        let digito = numero[ultimoIndice];
        let numeroInicial = numero.substring(0,8);
        let numeroContaCompleto = `${numeroInicial}-${digito}`;
        return numeroContaCompleto;
    },
    async validarUsuario (req,res,next){
        try {
            let{cpf,senha} = req.body;
           
            const usuarioRequisicao = {
                cpf,
                senha
            }
            
            const usuario = await loginData.validarUsuario(usuarioRequisicao)
            let validaSenha = bcrypt.compareSync(senha,usuario[0].senha)

            if(validaSenha){
               return true
            }          
            return false
             
         } catch (error) {
             console.log(error)
             return res.status(500).json({"message":"Ocorreu um erro, tente novamente"});
         }
      
    },
    verifyJWT(req,res, next){
        const token = req.headers['x-access-token'];
        jwt.verify(token, SECRET, (err, decoded)=>{
            if(err){
             return res.status(401).json({message: 'Token Inválido'})
            }
            req.userCPF = decoded.userCPF
            next();
        })
    },
    criarToken(){
        return jwt.sign({userCPF:40110166833}, SECRET, {expiresIn: 300});
    }
  
}