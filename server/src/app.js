const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(bodyparser.json())
app.use(cors())

app.use('/users', require('./routes/users'))
app.use('/projects', require('./routes/projects'))
app.use('/tasks', require('./routes/tasks'))
app.use('/tags', require('./routes/tags'))

app.use(errorHandler)

module.exports = app
