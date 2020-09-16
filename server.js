require('dotenv').config()  //to load all the enviornment variables

const express = require('express')
const app = express ()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true },{ useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error('error',error))
db.once('open', () => console.log('Connected to DB'))

//middleware 
app.use(express.json()) //let our body accept json

//creating routes
const subscribersRouter = require('./routes/subsrcibers')
app.use('/subscribers',subscribersRouter)

app.listen(3000, () => console.log('Server has started'))