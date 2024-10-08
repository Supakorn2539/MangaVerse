const express = require('express')
const app = express()
const cors = require("cors")
const authRouter = require('./Routes/auth-routes')
const errorHandler = require('./middlewares/error')
const notFound = require('./middlewares/notFound')
require('dotenv').config()
const multer = require('multer')
app.use(express.json())
app.use(cors())
app.use("/auth", authRouter)
app.use("/manga",()=> {})

app.use(errorHandler)
app.use('*',notFound)
const port = process.env.PORT || 8000
app.listen(port,()=> console.log(`Server is running ${port}`))