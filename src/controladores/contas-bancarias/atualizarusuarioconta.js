const dados = require('../../bancodedados');

const atualizarContaUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const contaParaAtualizar = dados.contas.find((conta) => { return conta.numero === Number(numeroConta) });

    if (!contaParaAtualizar) {
        return res.status(404).json({ mensagem: 'Conta nao encontrada' });
    }

    if (!nome && !cpf && data_nascimento && !telefone && !email && !senha) {
        return res.status(404).json({ mensagem: 'Pelo menos uma propriedade deve ser fornecida para atualização.' });
    }

    const cpfDuplicado = dados.contas.find((conta) => { return conta.usuario.cpf === cpf });
    if (cpfDuplicado) {
        return res.status(400).json({ mensagem: 'CPF já está em uso por outra conta.' });
    }
    const emailDuplicado = dados.contas.find((conta) => { return conta.usuario.email === email });
    if (emailDuplicado) {
        return res.status(400).json({ mensagem: 'Email já está em uso por outra conta.' });
    }

    if (nome) contaParaAtualizar.usuario.nome = nome;
    if (email) contaParaAtualizar.usuario.email = email;
    if (cpf) contaParaAtualizar.usuario.cpf = cpf;
    if (data_nascimento) contaParaAtualizar.usuario.data_nascimento;
    if (telefone) contaParaAtualizar.usuario.telefone = telefone;
    if (senha) contaParaAtualizar.usuario.senha = senha;

    return res.status(201).json({ mensagem: 'Dados do usuário atualizados com sucesso.' });
};

module.exports = atualizarContaUsuario;