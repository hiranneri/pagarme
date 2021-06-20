const knex = require('../../database'); 
const NaoEncontrado = require('../erros/NaoEncontrado');

module.exports= {
    async create(usuario, conta){
        
        const trx = await knex.transaction();
        const idUsuario = await trx('usuarios').returning('id')
        .insert({
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            datanascimento: usuario.dataNascimento,
            rg: usuario.rg,
            cpf: usuario.cpf,
            senha: usuario.senha

        });
                
        const contaCadastrada = await trx('contas').returning(['numero', 'dataabertura']).insert({
            numero: conta.numero,
            dataabertura: conta.dataAbertura,
            usuario_id: idUsuario[0]
        }); 
        await trx.commit();
        const dadosCadastrados = Object.assign({}, { usuario: {
                id: idUsuario[0]
                } 
            }, {conta: contaCadastrada})

        return dadosCadastrados;
    },
    async validarUsuario(usuario){
        let usuarioEncontrado =  await knex('contas').join('usuarios', 'contas.usuario_id','=','usuarios.id')
        .select('contas.id as contaID', 'numero','nome','sobrenome','cpf','senha')
        .where('cpf', usuario.cpf).first()
        
        return usuarioEncontrado  
    }
}
