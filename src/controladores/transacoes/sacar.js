const dados = require('../../bancodedados');

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório.' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória.' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor é obrigatório.' });
    }

    const contaParaSaque = dados.contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!contaParaSaque) {
        return res.status(404).json({ mensagem: 'Conta não encontrada com o numero fornecido.' })
    }
    if (senha !== contaParaSaque.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha invália' });
    }
    if (valor > contaParaSaque.saldo) {
        return res.status(401).json({ mensagem: 'Saldo insuficiente para o saque.' });
    }

    contaParaSaque.saldo -= valor;

    let data = new Date();

    const extratoDoSaque = {
        data,
        numero_conta,
        valor
    };

    dados.saques.push(extratoDoSaque);

    return res.status(200).json({ mensagem: 'Saque realizado com sucesso' });
};

module.exports = sacar;