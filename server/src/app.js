const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config')
const app = express()
const cors = require('cors')

const indexRouter = require('./routers/IndexRouter')
const guestRouter = require('./routers/GuestRouter')
const loginRouter = require('./routers/LoginRouter')

const port = `${config.port}`

app.use(bodyParser.json())
app.use(cors())

// set static folder
app.use(express.static('dist'))

app.use('/', indexRouter)
app.use('/guest', guestRouter)
app.use('/login', loginRouter)

app.listen(port, function () {
  console.log('Server is up and listening on port ' + port)
})
