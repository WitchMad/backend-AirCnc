const express = require('express'); //Importa o express
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); //Busca as rotas do arquivo routes.js
const path = require('path');

const socketio = require('socket.io'); //Requisições síncronas
const http = require('http'); //Requisições assincronas
// Express => Define Rotas e Escutar a porta 3333
const app = express(); //Adiciona o express à aplicação (express é uma função)
const server = http.Server(app); //Extraindo o servidor http do express

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-gtz1z.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const io = socketio(server); //A partir daqui o server consegue entender websockets => requisições sincronas

const connectedUsers = {};

io.on('connection', socket => { //Toda vez que um usuário logar na aplicação eu vou anotar a informação q ele ta logado
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => { //Precisa disso para a aplicação não parar de rodar lá em cima
    req.io = io; //Disponibiliza o server io para toda a aplicação
    req.connectedUsers = connectedUsers;    //Disponibiliza a listagem de usuarios connectados para toda a aplicação

    return next();
});
/* 
app.get => Bucar info| 
app.post => Cadastrar info| 
app.put => Editar info| 
app.delete => Deletar info|

(app.get) | req.query => acessar dados enviados pela URL
(app.put e app.delete) OBS: na rota adicionar o nome do parametro desejado: app.put('/users/:id', (re... | req.params => acessar parametros
(app.post) | req.body => acessar corpo da requisição
*/

app.use(cors());
app.use(express.json()); //O express não retorna JSON automaticamente, essa expressão faz usar
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes); //Usa as rotas

server.listen(3333); //Porta