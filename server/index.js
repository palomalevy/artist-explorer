const express = require('express')
const cors = require('cors')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 3000 

const auth = require('./api/auth')
const user = require('./api/users')
const posts = require('./api/posts')

const { ValidationError } = require('./middleware/CustomErrors')

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use(session({
  secret: 'pulse-artist-explorer', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1-hour session
}))

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/posts', posts)

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({ error: err.message })
    }
    res.status(500).json({ error: "Internal Server Error" })
})  


app.listen(PORT, () => {})

module.exports = app
