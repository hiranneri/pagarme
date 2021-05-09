const knex = require('../database') 

module.exports= {
    async create(login, conta){
        try {
            const trx = await knex.transaction();
            await trx('usuarios').insert(login).returning('id').into('usuarios')
            .then((id)=>{
                
              conta.usuario_id = id[0];
            })
       
            await trx('contas').insert(conta); 
            await trx.commit();
            return {"message":"Salvo com sucesso","criado":true};
        } catch (error) {
            console.log(error.message)
            return {"message":error.message,"criado":false};
        }
    },
    async validarUsuario(usuario){
        try {           
            const result = await knex('usuarios').where({
                cpf:usuario.cpf,
               
            }).select('nome','cpf','senha');
                        
            return result;
        } catch (error) {
            console.log(error)
            return {"message":"Ocorreu um erro, tente novamente"};
        }
    }
}
