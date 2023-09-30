const dados = require("../../bancodedados");

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem)
        return res.status(400).json({ mensagem: 'A conta de origem é obrigatória.' });

    if (!numero_conta_destino)
        return res.status(400).json({ mensagem: 'A conta de destino é obrigatória.' });

    if (!valor)
        return res.status(400).json({ mensagem: 'O valor deve ser inserido.' });

    if (!senha)
        return res.status(400).json({ mensagem: "A senha deve ser inserida corretamente." });

    const contaOrigem = dados.contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem);
    });
    const contaDestino = dados.contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino);
    });

    if (!contaOrigem)
        return res.status(404).json({ mensagem: 'Conta de origem não foi encontrada.' });

    if (!contaDestino)
        return res.status(404).json({ mensagem: 'A Conta de destino não foi encontrada.' });

    if (senha !== contaOrigem.usuario.senha)
        return res.status(401).json({ mensagem: "Senha incorreta." });

    if (valor > contaOrigem.saldo)
        return res.status(401).json({ mensagem: 'Saldo insuficiente para a transferência.' });

    contaOrigem.saldo -= valor;

    contaDestino.saldo += valor;

    let data = new Date();

    const extratoTranferencia = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor,
    };

    dados.transferencias.push(extratoTranferencia);

    return res.status(200).json({ mensagem: 'Transferência realizado com sucesso' });
};

module.exports = transferir;