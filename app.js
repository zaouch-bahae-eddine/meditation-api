const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')
const cors = require('cors');

const app = express()
const port = 3000

app
.use(favicon(__dirname + '/asset/favicon.ico'))
.use(morgan('dev'))
.use(express.json())
.use(cors());
sequelize.initDb()

require('./src/routes/createUser')(app)
require('./src/routes/findUserByPk')(app)
require('./src/routes/updateUser')(app)
require('./src/routes/findAllUsers')(app)
require('./src/routes/deleteUser')(app)
require('./src/routes/login')(app)
require('./src/routes/register')(app)

app.listen(port, () => console.log(`Notre serveur attend sur http://localhsot:${port}`))