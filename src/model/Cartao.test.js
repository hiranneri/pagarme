const Cartao = require('./Cartao')
describe('Test CartaoClass', ()=>{
    it('substituir os números dos cartoes por asteriscos', (done)=>{
        const cartaoTeste = new Cartao({bandeira:'MasterCard', numeroCartao:'8563 9630 0236 5698'});
       
        let primeirosNumeros = cartaoTeste.nrCartao.slice(0,cartaoTeste.nrCartao.length-4);
        let numerosEmAstericos = '************';
        let isAstericos = (primeirosNumeros === numerosEmAstericos)

        expect(isAstericos).toBe(true)

        let ultimosDigitos = cartaoTeste.nrCartao.slice(-4)
        expect(ultimosDigitos).toBe('5698')
        done()
    })
    
})