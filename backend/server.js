const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const colors = require('colors')
const mongoose = require('mongoose')
require('dotenv').config()


// bring routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

// app
const app = express();

// db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('DB connected'.green.inverse))

// middleware 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// cors
if (process.env.NODE_ENV == 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// routes middleware
app.use('/api', blogRoutes)
app.use('/api', authRoutes)

// port 
const port = process.env.PORT || 8000

// run server
app.listen(port, () => {
    console.log(`server running on PORT ${port}`.cyan.underline)
})