const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');

const app = express()

// deploy db mongodb+srv://dbAdminUser:PX5nNgCp1t5onwwS@uitusurcluster-dyclv.mongodb.net/test?retryWrites=true&w=majority
// dev db "mongodb+srv://mrmiv:ghjcnjgfhjkm1@cluster0-t2wvl.mongodb.net/test?retryWrites=true&w=majority"
// middleware
app.use(express.json())
app.use(fileUpload())
app.use('/uploads', express.static(`${__dirname}/uploads`))

// route middlewares
app.use('/api/auth', require('./routes/admin.route')) //авторизация, регистрация
app.use('/api/literature', require('./routes/literature.route')) //Литература кафедры
app.use('/api/news', require('./routes/news.route')) //Новости
app.use('/api/newslinks', require('./routes/newsLink.route')) //Полезные ссылки для новостей
app.use('/api/staff', require('./routes/staff.route')) //сотрудники
app.use('/api/docs', require('./routes/docs.route')) //сотрудники
app.use('/api/clubs', require('./routes/club.route')) //внеучебная деятельность
app.use('/api/studyplan', require('./routes/studyplan.route')) //учебный план
app.use('/api/param', require('./routes/param.route')) //тексты на страницах
app.use('/api/curator', require('./routes/curators.route')) //кураторы
app.use('/api/feedback', require('./routes/feedback.route')) //Отзывы о кафедре
app.use('/api/files', require('./routes/uploadfile.route')) //Файлы
app.use('/api/search', require('./routes/search.route')) //Поиск
app.use('/api/knowledge', require('./routes/knowledge.route')) //База знаний

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, "client", "build")))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect(process.env.MongoURI || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, () => {
            console.log("База данных успешно подключена");
        })

        app.listen(PORT, () => console.log(`Сервер запущен на порте: ${PORT} ...`));
    } catch (error) {
        console.log('Ошибка сервера: ', e.message);
        process.exit(1)
    }
}

start()

