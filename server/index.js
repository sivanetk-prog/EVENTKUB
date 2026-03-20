const app = require('./src/app')
const { getConnection } = require('./src/config/db')

const port = process.env.PORT || 8000

app.listen(port, async () => {
  console.log('http server run at ' + port)
  try {
    await getConnection()
    console.log('database connected')
  } catch (error) {
    console.error('database connection failed:', error.code || error.message)
    console.error('check mysql server, DB_HOST, DB_PORT, DB_NAME, DB_USER and DB_PASS')
  }
})
