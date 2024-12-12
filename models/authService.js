const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Database = require('./database');

class AuthService {
  // Gera um token JWT para o administrador
  static generateToken(admin) {
    return jwt.sign(
      { id: admin.ID_Administrador, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Expiração de 1 hora
    );
  }

  // Autentica o usuário
  static async authenticate(email, senha) {
    const db = new Database();
    let connection;

    try {
      connection = await db.connect();
      
      // Consultando o administrador pelo email
      const [rows] = await connection.execute('SELECT * FROM Administradores WHERE email = ?', [email]);

      // Se o usuário não for encontrado
      if (rows.length === 0) {
        throw { status: 404, message: 'Usuário não encontrado' };
      }

      const admin = rows[0];

      // Verificando se a senha é válida
      const senhaValida = await bcrypt.compare(senha, admin.senha);
      if (!senhaValida) {
        throw { status: 401, message: 'Credenciais inválidas' };
      }

      return admin; // Retorna os dados do administrador se as credenciais forem válidas
    } catch (error) {
      throw error; // Lançar erro para ser tratado em outro lugar
    } finally {
      if (connection) {
        await connection.end(); // Certifique-se de fechar a conexão com o banco de dados
      }
    }
  }
}

module.exports = AuthService;
