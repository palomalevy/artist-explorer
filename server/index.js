const express = require('express')
const cors = require('cors')

const app = express()

const auth = require('./api/auth')

app.use(express.json())
app.use(cors())

app.use('/api/auth', auth)
// app.use('/api/users', users)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

module.exports = app
