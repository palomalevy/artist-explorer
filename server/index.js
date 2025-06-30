const express = require('express')
const cors = require('cors')
const session = require('express-session')

const app = express()

const auth = require('./api/auth')

app.use(express.json())
app.use(cors())

app.use('/api/auth', auth)
// app.use('/api/users', users)

app.use(session({
  secret: 'pulse-artist-explorer', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1-hour session
}))

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

module.exports = app
