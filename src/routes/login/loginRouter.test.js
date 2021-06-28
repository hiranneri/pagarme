const request = require('supertest')
const app = require('../../server')

describe('Test my app server', ()=>{
    it('should get login route', async (done)=>{
        try {
            const res = await request(app)
                .post('/login')
                .send({	
                    "cpf":"40110166855",
                    "senha": "1234567891"
                })
            
            expect(res.body).toHaveProperty('token')
            done()
            
        } catch (erro) {
            console.log(erro.message)
        }
    })
    it('should get cadastro route', async (done)=>{
        try {
            const res = await request(app)
                .post('/cadastro')
                .send(
                    {
                        "nome":"Alex",
                        "sobrenome": "Neri",
                        "datanascimento": "1993-06-08",
                        "rg": "488879863",
                        "cpf": "40110166851",
                        "senha":"1234567895"
                    }
                )
                expect(res.body.usuario.id).toBeDefined();
                done();
        } catch (erro) {
            console.log(erro.message)   
        }
    })
})