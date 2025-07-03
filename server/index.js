const express = require('express')
const cors = require('cors')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 3000 

const auth = require('./api/auth')
const routes = require('./api/users')

const { ValidationError } = require('./middleware/CustomErrors')

app.use(cors({
  origin: 'http://localhost:5174', // Replace with your frontend's origin
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
app.use('/api', routes)

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({ error: err.message })
    }

    // Additional Prisma error checks can be placed here
    res.status(500).json({ error: "Internal Server Error" })
})  


app.listen(PORT, () => {})

module.exports = app
