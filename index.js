// Configurações Express
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Variáveis do Jogo
var isIniciado = false;

// Jogadores
var jogador1 = "";
var jogador2 = "";

app.post('/conectar/j1', function (req, res) {
    if(jogador1.length != 0){
        res.send("Jogador 1 já logado, aguarde o fim do jogo!")
    }
    
    jogador1 = req.body.nome;
    res.send(jogador1 + " se conectou!")
});

app.post('/conectar/j2', function (req, res) {
    if(jogador2.length != 0){
        res.send("Jogador 2 já logado, aguarde o fim do jogo!")
    }

    jogador2 = req.body.nome;
    res.send(jogador2 + " se conectou!")
});

app.get('/iniciar', function (req, res) {
    if (jogador1.length != 0 && jogador2.length === 0) {
        res.send("Aguardando jogador 2...")
    }

    if (jogador2.length != 0 && jogador1.length === 0) {
        res.send("Aguardando jogador 1...")
    }

    if (jogador1.length === 0 && jogador2.length === 0) {
        res.send("Aguardando jogadores...")
    }

    if (jogador1.length != 0 && jogador2.length != 0) {
        isIniciado = true;
        res.send("Jogo iniciado")
    }
})


// Abre o Socket
app.listen(3000, function () {
    console.log('Socket rodando na porta 3000');
});