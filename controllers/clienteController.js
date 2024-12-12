const ClienteService = require('../models/clienteService');

const getAllClientes = async (req, res) => {
  try {
    const clientes = await ClienteService.getAllClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes', details: error.message });
  }
};

const createCliente = async (req, res) => {
  const { Nome_Cliente, Email } = req.body;
  try {
    await ClienteService.createCliente(Nome_Cliente, Email);
    res.status(201).json({ message: 'Cliente criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
  }
};

module.exports = { getAllClientes, createCliente };