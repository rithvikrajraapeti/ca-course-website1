require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/api/signup', signupRoute)
app.use('/api/login', loginRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))