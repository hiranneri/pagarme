const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
const NaoEncontrado = require('./erros/NaoEncontrado')
const PreenchimentoIncorreto = require('./erros/PreeenchimentoIncorreto')
const TokenInvalido = require('./erros/TokenInvalido')
const LoginSenhaIncorretos = require('./erros/LoginSenhaInvalidos')
app.use(express.json())
const port = process.env.PORT || 3333

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();

})


const routerLogin = require('./routes/login/loginRouter');
app.use('/login', routerLogin)


const routerTransacoes = require('./routes/transacoes/transacoesRouter');
app.use('/transacao', routerTransacoes);


app.use((erro, requisicao, resposta, proximo)=>{
  if(erro instanceof NaoEncontrado){
      return resposta.status(404).json({message:erro.message})
  }else if (erro instanceof PreenchimentoIncorreto){
      return resposta.status(400).json({message:erro.message})
  }else if(erro.code === '23505'){
      return resposta.status(400).json({message: 'Já existe um cadastro com estes dados'})
  }else if((erro instanceof LoginSenhaIncorretos) || (erro instanceof TokenInvalido)){
      return resposta.status(403).json({message: erro.message})
  }
  else{
      console.log(erro)
      return resposta.status(500).json({message: 'Ocorreu um erro interno. Tente novamente mais tarde'})
  }

})

app.listen(port, ()=> console.log('Server is running'));