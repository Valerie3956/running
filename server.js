const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const URL = process.env.MONGO_URL
const path = require("path")

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))



app.use("/auth", require('./routes/authRouter'))
app.use('/api', expressjwt({secret: process.env.SECRET, algorithms:["HS256"]}))
app.use('/api/run', require('./routes/runRouter'))
app.use('/api/comments', require('./routes/commentsRouter'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

mongoose.connect(
    URL,
    () => 
    app.listen(9000, () => {
        console.log(`Server is running on local port 9000`)
      })
    )
