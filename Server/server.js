const express = require('express')
const app = express()
const router = require('./Router/router.js')
const connectMongo = require('./db.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api',router)
connectMongo()
const port=3000
app.listen(port,()=>{
 console.log('server is listening on port : ',port)
})
