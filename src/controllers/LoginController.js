const moment = require('moment');
const knex = require('../database')
const jwt = require('jsonwebtoken')
const SECRET = 'pagarme-2021'

module.exports= {

    validarUsuario (req,res,next){
        try {
            // let {bandeira,nrcartao,nomeportador,datavalidade,
            //     codigoverificacao} = req.body;
            // const cartao = {
            //     bandeira,
            //     nrcartao,
            //     nomeportador,
            //     datavalidade,
            //     codigoverificacao
            // }
            // await knex('cartoes').insert(cartao)
            // return res.status(201).send({"message":"Sucesso"})
            return true;
            
        } catch (error) {
            next(error)
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