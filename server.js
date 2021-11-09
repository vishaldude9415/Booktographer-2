const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const methodOverride = require('method-override')
const homeRouter = require('./routes/home')
const articleRouter = require('./routes/articles')
const adminRouter = require('./routes/admin')
const app = express()
const path = require('path')

mongoose.connect(process.env.LINK, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, })

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Connected Successfully');
}).catch((error) => {
    console.log('Connection Failed');
})

// Static Middleware 
app.use(express.static(path.join(__dirname, 'public')))

console.log(path.join(__dirname, 'public'));

// app.use(express.static(__dirname + 'public'));

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

let articles = [{
        title: 'Article Title',
        createdAt: new Date(),
        description: 'This Blog website contaon all the crud opeartion'
    },
    {
        title: 'Another Article',
        createdAt: new Date(),
        description: 'This Blog website contaon all the crud opeartion'
    }
]

app.get('/', (req, res) => {
    res.render('articles/home', { articles: articles })
})

app.listen(process.env.PORT || 8000)


// ---------------------------Middlewares------------------------------------------
app.use('/articles', articleRouter)
app.use('/', homeRouter);
app.use('/admin', adminRouter);