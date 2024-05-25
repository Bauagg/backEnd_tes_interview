require('./databases/databases')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()

// dependesi
app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
global.__basedir = __dirname

// router
app.use('/', require('./router/user'))
app.use('/', require('./router/product'))

// midelware error
app.use('', require('./midelware/errorMidelware'))

app.listen(4000, () => console.log('express running'))