const dados = require('../../bancodedados');

const depositarSaldo = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O numero da conta e o valor são obrigatórios' });
    }

    const contaParaDeposito = dados.contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!contaParaDeposito) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do depósito deve ser maior que zero.' });
    }

    contaParaDeposito.saldo += valor;

    let data = new Date();

    const extratoDoDeposito = {
        data,
        numero_conta,
        valor,
    };

    dados.depositos.push(extratoDoDeposito);

    res.status(200).json({ mensagem: 'O valor foi depositado com sucesso.' });
};

module.exports = depositarSaldo;