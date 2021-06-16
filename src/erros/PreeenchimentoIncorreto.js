class PreenchimentoIncorreto extends Error {
    constructor(mensagem){
        super(mensagem)
        this.idErro = 0
        this.name = 'PreenchimentoIncorreto'
    }

}

module.exports = PreenchimentoIncorreto