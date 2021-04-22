const express = require('express');
const routes = require('./routes/routes')

const app = express();
app.use(express.json())
app.use(routes);

app.use((req,res,next)=>{
    const erro = new Error('Not found')
    erro.status = 400
    next(erro)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({error: error.message})
})

app.listen(3333, ()=> console.log('Server is running'));