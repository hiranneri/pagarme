const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

app.use(express.json())
const port = process.env.PORT || 3333

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();

})

app.use('/transacao', require('./routes/transacoes/transacoesRouter'));
app.use('/login', require('./routes/login/loginRouter'))

app.listen(port, ()=> console.log('Server is running'));