// Configurações Express
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Variáveis do Jogo
var isIniciado = false;

// Jogadores
var jogador1 = "";
var jogador2 = "";

app.get('/jogador/j1', function (req, res) {
    if (jogador1.length === 0) {
        res.send({ sucess: false, message: "Jogador não conectado", object: [] })
    }

    res.send({ sucess: true, message: "Retornando dados do jogador...", object: { nome: jogador1 } })
})

app.get('/jogador/j2', function (req, res) {
    if (jogador2.length === 0) {
        res.send({ sucess: false, message: "Jogador não conectado", object: [] })
    }

    res.send({ sucess: true, message: "Retornando dados do jogador...", object: { nome: jogador2 } })
})

app.post('/conectar/j1', function (req, res) {
    if (jogador1.length != 0) {
        res.send({ sucess: false, message: "Jogador 1 já logado, aguarde o fim do jogo!", object: [] })
    }

    jogador1 = req.body.nome;
    res.send({ sucess: true, message: jogador1 + " se conectou!", object: [] })
});

app.post('/conectar/j2', function (req, res) {
    if (jogador2.length != 0) {
        res.send({ sucess: false, message: "Jogador 2 já logado, aguarde o fim do jogo!", object: [] })
    }

    jogador2 = req.body.nome;
    res.send({ sucess: true, message: jogador2 + " se conectou!", object: [] })
});

app.get('/status', function (req, res) {
    if (jogador1.length != 0 && jogador2.length === 0) {
        res.send({ sucess: true, message: "Aguardando jogador 2...", object: [] })
    }

    if (jogador2.length != 0 && jogador1.length === 0) {
        res.send({ sucess: true, message: "Aguardando jogador 1...", object: [] })
    }

    if (jogador1.length === 0 && jogador2.length === 0) {
        res.send({ sucess: true, message: "Aguardando jogadores...", object: [] })
    }

    if (jogador1.length != 0 && jogador2.length != 0) {
        res.send({ sucess: true, message: "Pronto para iniciar", object: [] })
    }

    if (isIniciado) {
        res.send({ sucess: true, message: "Jogo em andamento", object: [] })
    }
})

app.post('/iniciar', function (req, res) {
    if (jogador1.length != 0 && jogador2.length === 0) {
        res.send({ sucess: false, message: "Aguardando jogador 2...", object: [] })
    }

    if (jogador2.length != 0 && jogador1.length === 0) {
        res.send({ sucess: false, message: "Aguardando jogador 1...", object: [] })
    }

    if (jogador1.length === 0 && jogador2.length === 0) {
        res.send({ sucess: false, message: "Aguardando jogadores...", object: [] })
    }

    if (jogador1.length != 0 && jogador2.length != 0) {
        isIniciado = true;
        res.send({ sucess: true, message: "Jogo iniciado", object: [] })
    }
})


// Abre o Socket
app.listen(3000, function () {
    console.log('Socket rodando na porta 3000');
});