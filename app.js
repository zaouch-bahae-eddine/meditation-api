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

// Initialisation database
sequelize.initDb()

//User Routes
require('./src/routes/user/createUser')(app)
require('./src/routes/user/findUserByPk')(app)
require('./src/routes/user/updateUser')(app)
require('./src/routes/user/findAllUsers')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/security/login')(app)
require('./src/routes/security/register')(app)

//Meditatione Time
require('./src/routes/meditaionTime/addMeditationTime')(app)
app.listen(port, () => console.log(`Notre serveur attend sur http://localhsot:${port}`))