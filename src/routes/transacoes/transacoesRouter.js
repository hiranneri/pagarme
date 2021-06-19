const router = require('express').Router()
const TransacaoController = require('../../controllers/TransacaoController');
const Transacao = require('../../model/Transacao');

router.get('/:id', async (requisicao, resposta, proximo)=>{
    try {
        const usuarioId = requisicao.params.id
        const transacao = new Transacao({usuario: usuarioId})
        const transacoes = await transacao.listar()
        return resposta.status(200).json(transacoes)
        
    } catch (erro) {
        proximo(erro)
    }
})

router.get('/:id/debito', async (requisicao, resposta, proximo)=>{
    try {
        const usuarioId = requisicao.params.id
        const transacao = new Transacao({usuario: usuarioId})
        const transacoesAvaliable = await transacao.avaliable()
        return resposta.status(200).json(transacoesAvaliable)
    } catch (erro) {
        proximo(erro)
    }   
})

router.get('/:id/credito', async (requisicao, resposta, proximo)=>{
    try {
        const usuarioId = requisicao.params.id
        const transacao = new Transacao({usuario: usuarioId})
        const transacaoWaiting = await transacao.waiting()
        return resposta.status(200).json(transacaoWaiting)
    } catch (erro) {
        proximo(erro)
    }   
})

router.post('/:id', async (requisicao,resposta,proximo) =>{
    try {
        const id = requisicao.params.id
        const dados = Object.assign({}, requisicao.body, {usuario: id})
        let transacao = await TransacaoController.transacao(dados)
        return resposta.status(201).json({transacao})
        
    } catch (erro) {
        proximo(erro)
    }
});



module.exports = router;