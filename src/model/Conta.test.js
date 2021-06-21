const Conta = require('../model/Conta')
describe('Test Conta class', ()=>{
    it('last digit should be a number between 0-9', (done)=>{
        const conta = new Conta();
        let digitoConta = parseInt(conta.numero.slice(-1));
        expect(digitoConta).toBeGreaterThanOrEqual(0);
        expect(digitoConta).toBeLessThan(9)
        done()
    })
    it('numbers of account should have 8 of lenght', (done)=>{
        const conta = new Conta();
        let numerosConta = conta.numero.slice(0,(conta.numero.length-2));
        let tamanhoNumeroConta = numerosConta.length
        expect(tamanhoNumeroConta).toBe(8)
        done()
    })


})