class TokenInvalido extends Error {
    constructor(message){
        super(message)
        this.idErro = 2
        this.name = 'TokenInvalido'
    }
}
module.exports = TokenInvalido