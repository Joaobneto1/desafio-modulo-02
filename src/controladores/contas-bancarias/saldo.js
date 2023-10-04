const dados = require('../../bancodedados');

const saldoDaConta = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O numero da conta e a senha são obrigatórios.' });
    }

    const contaParaConsulta = dados.contas.find((conta) => conta.numero === Number(numero_conta));

    if (!contaParaConsulta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    }

    if (contaParaConsulta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha inválida.' });
    }

    const saldo = {
        saldo: contaParaConsulta.saldo
    };

    return res.status(200).json(saldo);
};

module.exports = saldoDaConta;