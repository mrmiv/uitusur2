// Объявления кафедры
const { Schema, model } = require('mongoose')

const NewsSchema = new Schema({

    // Дата создания новости
    created_at: {
        type: Date,
        required: true
    },

    // Заголовок
    title: {
        type: String,
        minlength: 1,
        required: [true, 'Поле заголовок является обязательным!'],
        unique: true,
        trim: true
    },

    translit_title: {
        type: String,
        required: [true, 'Поле URL является обязательным!'],
        unique: true,
        trim: true,
        lowercase: true
    },

    // Аннотация
    annotation: {
        type: String,
        maxlength: 255,
        trim: true
    },

    // Авторы
    body: {
        type: String,
        minlength: 1,
        required: true
    },

    pin: {
        type: Boolean,
        default: false
    },

    // Тип
    type: {
        type: Number,
        required: true,
        enum: [1, 2, 3]
        // 1 - Объявления кафедры
        // 2 - Стипендии и гранты
        // 3 - Конференции
    },

    // свойства
    // Сайт
    site: {
        type: String,
        validate: {
            validator: function (path) {
                if(!path){
                    return
                }
                return /^((https|http)?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(path)
            },
            message: props => `${props.value} - Поле сайт содержит недопустимые символы`
        }
    }, //conf
    // Место проведения
    city: { type: String, trim: true },//grants, conf
    // Дедлайн
    deadline: { type: Date, trim: true },//all
    // Для кого
    users: { type: String, trim: true },//all

    // Период действия гранта или сроки результатов конференции
    period: { type: String, trim: true },//grants, conference

    // Сумма гранта
    grant: { type: String, trim: true },//grants

    // Вложения
    docs: { 
        type: [{
            name: {
                type: String,
                required: true,
                trim: true
            },
            path: {
                type: String,
                required: true,
                trim: true
            }
        }]
    }

}, { autoIndex: false, versionKey: false })

module.exports = model('News', NewsSchema)
