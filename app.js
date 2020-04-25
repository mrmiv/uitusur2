const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const app = express()

// mongodb+srv://dbAdminUser:PX5nNgCp1t5onwwS@uitusurcluster-dyclv.mongodb.net/test?retryWrites=true&w=majority
// middleware
app.use(express.json())
app.use(fileUpload())
app.use('/uploads', express.static(`${__dirname}/uploads`))
// route middlewares
app.use('/api/auth', require('./routes/admin.route')) //авторизация, регистрация
app.use('/api/literature', require('./routes/literature.route')) //Литература кафедры
app.use('/api/news', require('./routes/news.route')) //Новости
app.use('/api/staff', require('./routes/staff.route')) //сотрудники
app.use('/api/clubs', require('./routes/club.route')) //сотрудники
// app.use('/user', require('./routes/user.route')) //пользовательские данные
// app.use('/reserve', require('./routes/reserve.route')) //резерв
// app.use('/category', require('./routes/category.route')) //категория
// app.use('/build', require('./routes/build.route')) //корпус

if(process.env.NODE_ENV==='production'){
    app.use('/', express.static(path.join(__dirname, "client", "build")))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000

async function start (){
    try {
        await mongoose.connect(process.env.MongoURI || config.get('mongoUri'),{
            useNewUrlParser:    true,
            useUnifiedTopology: true,
            useCreateIndex:     true,
            useFindAndModify:   false
        },()=>{console.log("База данных успешно подключена");
        })

        app.listen(PORT, () => console.log(`Сервер запущен на порте: ${PORT} ...`));
    } catch (error) {
        console.log('Ошибка сервера: ', e.message);
        process.exit(1)
    }
}

start()

