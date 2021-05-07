const bcrypt = require('bcrypt');
module.exports = {
    formatarData(data){
        let dia  = data.split("/")[0];
        let mes  = data.split("/")[1];
        let ano  = data.split("/")[2];
        return `${ano}-${mes}-${dia}`;

    },
    hashSenha(senha){
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(senha,salt);
        return hash;
    },
    formatarConta(conta){
        delete conta.usuario_id;
        conta.dataabertura = this.formatarDataBR(conta.dataabertura);
        return conta;

    },
    formatarDataBR(dataUS){
        let diaBanco = dataUS;
        let dataBR = new Date(diaBanco);

        let dia  = dataBR.getDate();
        let mes  = dataBR.getMonth()+1;
        let ano  = dataBR.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }
}