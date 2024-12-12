const jwt = require('jsonwebtoken');

// Exemplo de função para gerar token após o login
const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.ID_Cliente, nome: user.Nome_Cliente },
    process.env.JWT_SECRET, // Sua chave secreta que está no .env
    { expiresIn: '1h' } // O token vai expirar em 1 hora
  );
  return token;
};

// Exemplo de como você pode usar ao fazer o login
const loginUser = (req, res) => {
  // Suponha que você tenha verificado o usuário no banco de dados
  const user = {
    ID_Cliente: 1, 
    Nome_Cliente: "Cliente1"
  };

  const token = generateToken(user);
  res.json({ token }); // Retorna o token gerado para o cliente
};
