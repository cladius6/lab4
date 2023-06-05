const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: '5429',
})
const setup = (async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS notes(id SERIAL PRIMARY KEY, title TEXT, content TEXT, user_id INTEGER) `
  )
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username TEXT, password TEXT)`
  )
});
setup()

module.exports = pool
