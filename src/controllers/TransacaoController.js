const Cartao = require('../model/Cartao');
const Transacao = require('../model/Transacao');
const TransacaoDAO = require('../DAO/TransacaoDAO');
const Payables = require('../model/Payables');
const PayableCredito = require('../model/PayableCredito')
const PayableDebito = require('../model/PayableDebito')
const PreenchimentoIncorreto = require('../erros/PreeenchimentoIncorreto')

module.exports = {
    async transacao(transacaoRecebida){
        this.validarCampos(transacaoRecebida)
        
        let {bandeira, numeroCartao, nomePortador, dataValidade, codigoVerificacao, 
                descricao, valor, usuario, formaPagamento, dataPagamento} = transacaoRecebida
       
        const cartao = new Cartao({bandeira, numeroCartao,nomePortador,dataValidade, 
                codigoVerificacao})        

        const transacao = new Transacao({cartao,descricao,valor,usuario})
        transacao.validar()
                
        const payable = this.criarPayable({formaPagamento, dataPagamento,transacao, valor})
        
        if(!payable){
            throw new PreenchimentoIncorreto('Forma de pagamento inválida')
        }
        
        payable.validar()
        payable.criarPayables()
        let transacaoID = await TransacaoDAO.createTransacao(payable)
        return transacaoID
    },
    criarPayable(dadosPayable){
        const payable = {
            'DÉBITO': new PayableDebito(dadosPayable),
            'CRÉDITO': new PayableCredito(dadosPayable)
        }
        return payable[dadosPayable.formaPagamento]
    },
    validarCampos(transacao){
        const campos = ['bandeira', 'numeroCartao', 'nomePortador', 'dataValidade', 'codigoVerificacao', 
            'descricao', 'valor', 'formaPagamento', 'dataPagamento']
        const dados = transacao
        const dadosParaValidar = {}
        campos.forEach((campo)=>{
            const valor = dados[campo]
            if(typeof valor === 'string'){
                dadosParaValidar[campo] = valor
            }else{
                throw new PreenchimentoIncorreto(`O(s) campo(s) ${campo} não foram preenchidos corretamente`)
            }
        })
        if(Object.keys(dadosParaValidar).length === 0){
            throw new PreenchimentoIncorreto('Não foram fornecidos dados para atualizar')
        }
    }
}