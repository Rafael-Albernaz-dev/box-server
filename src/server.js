const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

//recebendo requisicoes pelo protocolo http e websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on("connectRoom", box =>{
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://user:user@cluster0-brb7r.mongodb.net/boxproject?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
})
//entendendo requisicoes no formato json
app.use(express.json());
//permitindo envio de arquivos
app.use(express.urlencoded({ extended: true }));

//importando o arquivo de rotas
app.use(require('./routes'));

//buscando os arquivos na pasta tmp pela rota de files(basicamente um redirecionamento)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));


server.listen(3333);