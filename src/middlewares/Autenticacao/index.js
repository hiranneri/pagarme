require('dotenv').config()
const JWT = require('jsonwebtoken')
const TokenInvalido = require('../../erros/TokenInvalido')

var verifyJWT = (req,res, next)=>{
    const token = req.headers['x-access-token'];
    JWT.verify(token, process.env.APISECRET, (err, decodedToken)=>{
        if(err){
            throw new TokenInvalido('Token Inválido')
        }
        next()
    })
}

module.exports = {
    verifyJWT
}