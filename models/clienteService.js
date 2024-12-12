const Database = require('./database');

class ClienteService {
  static async getAllClientes() {
    const db = new Database();
    const connection = await db.connect();
    const [rows] = await connection.execute('SELECT * FROM Clientes');
    await connection.end();
    return rows;
  }

  static async createCliente(nome, email) {
    const db = new Database();
    const connection = await db.connect();
    await connection.execute('INSERT INTO Clientes (Nome_Cliente, Email) VALUES (?, ?)', [nome, email]);
    await connection.end();
  }
}

module.exports = ClienteService;