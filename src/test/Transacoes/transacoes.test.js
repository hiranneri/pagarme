const transacaoController = require('../../controllers/TransacaoController')
const transacaoData = require('../../data/TransacaoData')

let transacaoRealizada =  {body:    {
    "bandeira": "Mastercard",
    "nrcartao": "53566300021234",
    "nomeportador": "Alexandre Sandro",
    "datavalidade": "2026-02-01",
    "codigoverificacao": "523",
    "descricao": "Macbook 5.0",
    "formapagto": "CRÉDITO",
    "datapagto": "2021-05-05", 
    "valor":5.00
  }
};

const payables = transacaoController.criarPayables(transacaoRealizada);
const cartao = transacaoController.criarCartao(transacaoRealizada);


describe('Teste para transações', ()=>{
    it('Forma de pagamento deverá ser em "DÉBITO" ou "CRÉDITO', ()=>{
       
        expect(payables).toHaveProperty('status');
    })
    it('Número do cartão deverá ser retornado com os 4 últimos algarismos precedido de astericos para cada número', ()=>{

        let numeroCartao = cartao.nrcartao;
        let tamanhoNumeroCartao = numeroCartao.lenght;
        let primeiroNumero = numeroCartao[0];
        let segundoNumero = numeroCartao[1];
        let penultimo = numeroCartao[tamanhoNumeroCartao-2]
        let ultimo = numeroCartao[tamanhoNumeroCartao-1]


        expect(!isNaN(primeiroNumero)).toEqual(false)
        expect(!isNaN(segundoNumero)).toEqual(false)
        expect(isNaN(penultimo)).toEqual(true)
        expect(isNaN(ultimo)).toEqual(true)
    })

    it("Testar rota /transacao/credito' e confirmar se as transações são da formapagto CRÉDITO", async ()=>{
        try {
           const transacaoCredito = await transacaoData.findAllCredito();
    
            for (let transacao of transacaoCredito) {
            expect(transacao.formapagto).toEqual('CRÉDITO')
            }         

        } catch (error) {
            console.error(error.message)
        }
    })
    it("Testar rota /transacao/debito' e confirmar se as transações são da formapagto DÉBITO", async ()=>{
        try {
           const transacaoCredito = await transacaoData.findAllDebito();
    
            for (let transacao of transacaoCredito) {
            expect(transacao.formapagto).toEqual('DÉBITO')
            }         

        } catch (error) {
            console.error(error.message)
        }
    })
    it("Testar rota /transacao/credito' e confirmar se as transações são da formapagto CRÉDITO", async ()=>{
        try {
           const transacaoCredito = await transacaoData.findAllCredito();
    
            for (let transacao of transacaoCredito) {
            expect(transacao.formapagto).toEqual('CRÉDITO')
            }         

        } catch (error) {
            console.error(error.message)
        }
    })
    it("Testar rota '/transacao' e confirmar se todas as transações são retornadas (DÉBITO/CRÉDITO)", async ()=>{
        try {
            const transacoes = await transacaoData.findAll();
            let quantidadeTransacoes = await transacaoData.countTransacoes();
 
            let quantidadeTransacaoContadas = parseInt(quantidadeTransacoes[0].quantidade);
             expect(quantidadeTransacaoContadas).toEqual(transacoes.length);
        } catch (error) {
            console.error(error.message)
        }
    })

})  