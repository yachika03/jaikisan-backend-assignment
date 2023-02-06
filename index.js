const express = require('express')
const mongoose = require('mongoose')
const route = require('./src/routes/routes.js')

require('dotenv').config()
const app = express()

app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log('MongoDB is Connected Successfully!'))
    .catch((error) => console.log(error))

app.use('/', route)

app.listen(process.env.PORT, () => {
    console.log(`App is running on port: ${process.env.PORT}`)
})