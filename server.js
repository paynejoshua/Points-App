require('dotenv').config()
const {Database} = require("./database")

const express = require('express')
const app = express()


// app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const pointsRouter = require("./routes/points")
app.use('/points', pointsRouter)

const port = process.env.PORT || 4001


app.listen(port, () => { 
    console.log(`listening on port ${port}`)
    global.database = new Database()

})