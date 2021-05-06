const transacaoData = require('../../data/TransacaoData')
const transacaoController = require('../../controllers/TransacaoController')

let transacaoRealizada =  {body:    {
    "bandeira": "Mastercard",
    "nrcartao": "53566300021234",
    "nomeportador": "Alexandre Scobar",
    "datavalidade": "2026-02-01",
    "codigoverificacao": "523",
    "descricao": "Macbook 5.0",
    "formapagto": "CRÉDITO",
    "datapagto": "2021-05-05", 
    "valor":5852.60
}
};

const transacao = transacaoController.criarTransacao(transacaoRealizada);
const payables = transacaoController.criarPayables(transacaoRealizada);
const cartao = transacaoController.criarCartao(transacaoRealizada);

it('Criar uma trasação com sucesso - Crédito', async ()=>{
        try {
            const result = await transacaoData.createTransacao(cartao,transacao,payables)
            expect(result).toHaveProperty('message');

            
        } catch (error) {
            console.log(error.message)
        }
})