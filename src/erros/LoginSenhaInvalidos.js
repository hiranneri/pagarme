class LoginSenhaInvalidos extends Error {
    constructor(message){
        super(message)
        this.idErro = 3
        this.name = 'LoginSenhaInvalidos'
    }
}

module.exports = LoginSenhaInvalidos