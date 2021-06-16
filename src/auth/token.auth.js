require('dotenv').config()
const JWT = require('jsonwebtoken')

const TokenInvalido = require('../erros/TokenInvalido')

const generate = payload =>{
    const expiracao = Math.floor(Date.now()/1000) + parseInt(process.env.APITIMESTAMP)
    const JWTData = {
        iss: process.env.APINAME,
        sub: payload.id,
        exp:  expiracao // (60*10)
       }  
    payload = JWTData;
    return new Promise(resolve=>{
        JWT.sign(payload, process.env.APISECRET, {algorithm: process.env.APIALGORITHM}, (err, token)=>{
            if(err){
                console.log(err.message)
                throw new TokenInvalido('Token Inválido!')
            }
            resolve(token)
        })

    })
};

module.exports = {
    generate
}