const dados = require('../../bancodedados');

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O numero da conta e a senha são obrigatório.' });
    }

    const contaParaExtrato = dados.contas.find((conta) => conta.numero === Number(numero_conta));

    if (!contaParaExtrato) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    }

    if (contaParaExtrato.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha inválida.' });
    }

    const depositoDaConta = dados.depositos.filter((deposito) => {
        return deposito.numero_conta === (numero_conta)
    });
    const saqueDaConta = dados.saques.filter((saques) => {
        return saques.numero_conta === (numero_conta)
    });

    const transferenciasEnviadas = dados.transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === (numero_conta)
    });

    const transferenciasRecebidas = dados.transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === (numero_conta)
    });

    const extratoConta = {
        depositos: depositoDaConta,
        saques: saqueDaConta,
        transferenciasEnviadas,
        transferenciasRecebidas
    };

    return res.status(200).json(extratoConta);
};

module.exports = extrato;