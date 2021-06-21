const request = require('supertest')
const app = require('../../server')
const idUsuario = 'af79607c-a867-4190-958f-3b236583b8c4';
const token = process.env.TOKEN

describe('Testar rotas de transações', ()=>{
    it('deverá retornar todas as transações do id do Usuário informado', async (done)=>{
        try {
            const res = await request(app)
                .get(`/transacao/${idUsuario}`)
                .set('x-access-token', token)
            
            const quantidadeCartoes = res.body.cartoes;
            
            expect(quantidadeCartoes).toBeDefined();
            expect(quantidadeCartoes).not.toHaveLength(0);
            
            done();
        } catch (erro) {
            console.log(erro.message)
        }
    })
    
    it('deverá retornar todas as transações de débito do id do Usuário informado', async (done)=>{
        try {
            const res = await request(app)
                .get(`/transacao/${idUsuario}/debito`)
                .set('x-access-token', token)
                            
            const quantidadeCartoes = res.body.cartoes;
            
            expect(quantidadeCartoes).toBeDefined();
            expect(quantidadeCartoes).not.toHaveLength(0);
            
            done();
        } catch (erro) {
            console.error(erro.message)   
        }
    })
    it('deverá retornar todas as transações de crédito do id do Usuário informado', async (done)=>{
        try {
            const res = await request(app)
                .get(`/transacao/${idUsuario}/credito`)
                .set('x-access-token', token)
                            
            const quantidadeCartoes = res.body.cartoes;
            
            expect(quantidadeCartoes).toBeDefined();
            expect(quantidadeCartoes).not.toHaveLength(0);
            
            done();
        } catch (erro) {
            console.error(erro.message)   
        }
    })
    it('Cadastro de transação', async (done)=>{
        try {
            const res = await request(app)
                .post(`/transacao/${idUsuario}`)
                .send({
                    "bandeira": "Elo",
                    "numeroCartao": "123485208562",
                    "nomePortador": "Hiran Neri",
                    "dataValidade": "2021-05-30",
                    "codigoVerificacao": "586",
                    "descricao": "Arroz",
                    "valor": "230.96",
                    "formaPagamento": "CRÉDITO",
                    "dataPagamento": "2021-06-20"
                })
                .set('x-access-token', token)
                            
            const transacao = res.body.transacao;
            
            expect(transacao).toBeDefined();
                       
            done();
        } catch (erro) {
            console.error(erro.message)   
        }
    })
})