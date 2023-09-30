const dados = require("../../bancodedados");

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const contaParaExcluir = dados.contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!contaParaExcluir)
        return res.status(404).json({ mensagem: "Conta não encontrada" });

    if (contaParaExcluir.saldo > 0) return res.status(404).json({ mensagem: 'Não é permitido excluir conta com saldo' });

    dados.contas = dados.contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    });

    return res.status(200).json({ mensagem: "Conta excluída com sucesso" });
};

module.exports = excluirConta;