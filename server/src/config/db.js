const mysql = require('mysql2/promise')

let conn = null

const getConnection = async () => {
  if (!conn) {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'event_db',
      port: parseInt(process.env.DB_PORT, 10) || 3300
    })
  }
  return conn
}

module.exports = { getConnection }
