// Configurações Express
const express = require("express");
const cors = require("cors");
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
var matriz = {
  a1: { marcado: false, jogador: "" },
  a2: { marcado: false, jogador: "" },
  a3: { marcado: false, jogador: "" },
  b1: { marcado: false, jogador: "" },
  b2: { marcado: false, jogador: "" },
  b3: { marcado: false, jogador: "" },
  c1: { marcado: false, jogador: "" },
  c2: { marcado: false, jogador: "" },
  c3: { marcado: false, jogador: "" },
};

app.get("/statusMatriz", function(req, res) {
  res.send({
    sucess: true,
    message: "Retornando dados da matriz",
    object: matriz
  });
});

app.post("/marcar/a1", function(req, res) {
  if (!matriz.a1.marcado) {
    matriz.a1.marcado = true;
    matriz.a1.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/a2", function(req, res) {
  if (!matriz.a2.marcado) {
    matriz.a2.marcado = true;
    matriz.a2.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/a3", function(req, res) {
  if (!matriz.a3.marcado) {
    matriz.a3.marcado = true;
    matriz.a3.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/b1", function(req, res) {
  if (!matriz.b1.marcado) {
    matriz.b1.marcado = true;
    matriz.b1.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/b2", function(req, res) {
  if (!matriz.b2.marcado) {
    matriz.b2.marcado = true;
    matriz.b2.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/b3", function(req, res) {
  if (!matriz.b3.marcado) {
    matriz.b3.marcado = true;
    matriz.b3.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/c1", function(req, res) {
  if (!matriz.c1.marcado) {
    matriz.c1.marcado = true;
    matriz.c1.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/c2", function(req, res) {
  if (!matriz.c2.marcado) {
    matriz.c2.marcado = true;
    matriz.c2.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.post("/marcar/c3", function(req, res) {
  if (!matriz.c3.marcado) {
    matriz.c3.marcado = true;
    matriz.c3.jogador = req.body.jogador;
  }

  res.send({ sucess: true, message: "Marcado com sucesso", object: [] });
});

app.get("/jogador/j1", function(req, res) {
  if (jogador1.length === 0) {
    res.send({ sucess: false, message: "Jogador não conectado", object: [] });
  }

  res.send({
    sucess: true,
    message: "Retornando dados do jogador...",
    object: { nome: jogador1 }
  });
});

app.get("/jogador/j2", function(req, res) {
  if (jogador2.length === 0) {
    res.send({ sucess: false, message: "Jogador não conectado", object: [] });
  }

  res.send({
    sucess: true,
    message: "Retornando dados do jogador...",
    object: { nome: jogador2 }
  });
});

app.post("/conectar/j1", function(req, res) {
  if (jogador1.length != 0) {
    res.send({
      sucess: false,
      message: "Jogador 1 já logado, aguarde o fim do jogo!",
      object: []
    });
  }

  jogador1 = req.body.nome;
  res.send({ sucess: true, message: jogador1 + " se conectou!", object: [] });
});

app.post("/conectar/j2", function(req, res) {
  if (jogador2.length != 0) {
    res.send({
      sucess: false,
      message: "Jogador 2 já logado, aguarde o fim do jogo!",
      object: []
    });
  }

  jogador2 = req.body.nome;
  res.send({ sucess: true, message: jogador2 + " se conectou!", object: [] });
});

app.get("/status", function(req, res) {
  if (jogador1.length != 0 && jogador2.length === 0) {
    res.send({ sucess: true, message: "Aguardando jogador 2...", object: [] });
  }

  if (jogador2.length != 0 && jogador1.length === 0) {
    res.send({ sucess: true, message: "Aguardando jogador 1...", object: [] });
  }

  if (jogador1.length === 0 && jogador2.length === 0) {
    res.send({ sucess: true, message: "Aguardando jogadores...", object: [] });
  }

  if (jogador1.length != 0 && jogador2.length != 0) {
    res.send({ sucess: true, message: "Pronto para iniciar", object: [] });
  }

  if (isIniciado) {
    res.send({ sucess: true, message: "Jogo em andamento", object: [] });
  }
});

app.post("/iniciar", function(req, res) {
  if (jogador1.length != 0 && jogador2.length === 0) {
    res.send({ sucess: false, message: "Aguardando jogador 2...", object: [] });
  }

  if (jogador2.length != 0 && jogador1.length === 0) {
    res.send({ sucess: false, message: "Aguardando jogador 1...", object: [] });
  }

  if (jogador1.length === 0 && jogador2.length === 0) {
    res.send({ sucess: false, message: "Aguardando jogadores...", object: [] });
  }

  if (jogador1.length != 0 && jogador2.length != 0) {
    isIniciado = true;
    res.send({ sucess: true, message: "Jogo iniciado", object: [] });
  }
});

// Abre o Socket
app.listen(3000, function() {
  console.log("Socket rodando na porta 3000");
});
