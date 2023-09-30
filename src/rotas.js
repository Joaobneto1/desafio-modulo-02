const express = require('express');
const criarConta = require('./controladores/contas-bancarias/criarconta');
const listarContasBancarias = require('./controladores/contas-bancarias/listarcontas');
const atualizarContaUsuario = require('./controladores/contas-bancarias/atualizarusuarioconta');
const excluirConta = require('./controladores/contas-bancarias/excluir-conta');
const depositarSaldo = require('./controladores/transacoes/depositar');
const sacar = require('./controladores/transacoes/sacar');
const transferir = require('./controladores/transacoes/transferir');
const rotas = express();


rotas.post('/contas', criarConta);
rotas.get('/contas', listarContasBancarias);
rotas.put('/contas/:numeroConta/usuario', atualizarContaUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', depositarSaldo);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);

module.exports = rotas;