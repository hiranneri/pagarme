const moment = require('moment');
const knex = require('../database')

module.exports= {
    async index (req,res){
        try {
            const results =  await knex('cartoes');
            return res.status(200).json(results)

        } catch (error) {
            
        }
       
    },
    async create (req,res,next){
        try {
            let {bandeira,nrcartao,nomeportador,datavalidade,
                codigoverificacao} = req.body;
            const cartao = {
                bandeira,
                nrcartao,
                nomeportador,
                datavalidade,
                codigoverificacao
            }
            await knex('cartoes').insert(cartao)
            return res.status(201).send({"message":"Sucesso"})
            
        } catch (error) {
            next(error)
        }
      
    }
  
}