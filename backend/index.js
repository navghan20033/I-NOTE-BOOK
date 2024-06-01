require('./db.js');
const express = require('express');
const connectToMongo = require('./db.js');
var cors = require('cors')

const app = express()
const port = 5000

app.use(cors())

app.use(express.json())

app.use('/api/auth', require('./routes/authentication'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello ANisha!')
// }) 


app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})
connectToMongo()