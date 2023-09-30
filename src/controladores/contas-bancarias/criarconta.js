const dados = require('../../bancodedados');

let numero = 1;

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const cpfDuplicado = dados.contas.find(conta => conta.usuario.cpf === cpf);
    const emailDuplicado = dados.contas.find(conta => conta.usuario.email === email);

    if (cpfDuplicado) {
        return res.status(400).json({ mensagem: 'CPF já está em uso' });
    }
    if (emailDuplicado) {
        return res.status(400).json({ mensagem: 'Email já está em uso' });
    }

    const novaConta = {
        numero: numero++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        },
    };
    dados.contas.push(novaConta);
    res.status(201).json(novaConta);
};

module.exports = criarConta;