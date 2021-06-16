class NaoEncontrado extends Error {
    constructor(mensagem){
        super(mensagem)
        this.idErro = 1
        this.name = 'NaoEncontrado'
        
    }
}

module.exports = NaoEncontrado