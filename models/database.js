const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }

  async connect() {
    return await mysql.createConnection(this.config);
  }
}

module.exports = Database;