const dados = require('../../bancodedados');

const listarContasBancarias = async (req, res) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha é obrigatório' });
    }

    if (senha_banco !== dados.banco.senha) {
        return res.status(401).json({ mensagem: 'Senha do banco inválida' });
    }

    return res.status(200).json(dados.contas);
};

module.exports = listarContasBancarias;