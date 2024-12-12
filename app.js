const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Cliente } = require('./models');  // Certifique-se de que o modelo Cliente está importado corretamente

const app = express();
app.use(express.json());

// Rota para registrar um novo usuário (cliente)
app.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  // Validação básica dos campos
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  // Verificar se o cliente já existe
  const clienteExistente = await Cliente.findOne({ where: { email } });
  if (clienteExistente) {
    return res.status(400).json({ error: 'O email já está em uso.' });
  }

  // Criptografar a senha
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    // Criar o novo cliente no banco de dados
    const novoCliente = await Cliente.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    // Gerar o token JWT
    const token = jwt.sign({ id: novoCliente.ID_Cliente, nome: novoCliente.Nome_Cliente }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Resposta com o token de autenticação
    res.status(201).json({ message: 'Usuário criado com sucesso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rota para autenticar (login)
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const cliente = await Cliente.findOne({ where: { email } });
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  // Comparar a senha informada com a senha criptografada
  const senhaValida = await bcrypt.compare(senha, cliente.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  // Gerar o token JWT
  const token = jwt.sign({ id: cliente.ID_Cliente, nome: cliente.Nome_Cliente }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Retornar o token
  res.status(200).json({ message: 'Login bem-sucedido', token });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});