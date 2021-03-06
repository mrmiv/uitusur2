//  Литература кафедры
const {Schema, model} = require('mongoose')

const LiteratureSchema = new Schema({

    // Дата создания заказа
    createdDate:{
        type: Date,
        default: Date.now
    },

    // Заголовок
    title:{
        type: String,
        maxlength: 255,
        minlength: 1,
        required: [true, 'Поле заголовок является обязательным!'],
        unique: true,
        validate:{
            validator: function (title) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\*.,:\-_?\(\)\"\'\!\#;)]+$/.test(title) // добавить тире
            },
            message: props => `${props.value} - Поле заголовок содержит недопустимые символы`
        }
    }, 

    translit_title: {
        type: String,
        maxlength: 255,
        minlength: 1,
        lowercase: true,
        required: [true, 'Поле заголовок является обязательным!'],
        unique: true,
    },

    // Авторы
    author:{
        type: String,
        required: [true, 'Поле авторы является обязательным'],
        validate:{
            validator: function (author) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-\.,\')]+$/.test(author) // добавить тире и запятую
            },
            message: props => `${props.value} - Поле авторы содержит недопустимые символы`
        }
    },

    // Категория
    category:{
        type: String,
        required: true,
        lowercase: true,
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\*)]+$/.test(name) //
            },
            message: props => `${props.value} - Поле категория содержит недопустимые символы`
        }
    },

    // Библиографическое описание
    description:{
        type: String,
        required: true
    },

    // Аннотация
    annotation:{
        type: String,
        required: true
    },

    // Оглавление
    doc:{
        type: String,
        unique: true
    },

    // Обложка
    image:{
        type: String,
        required: true,
        unique: true
    },

    path:{
        type: String,
        unique: true
    },

}, {autoIndex:false, versionKey: false})

module.exports = model('Literature', LiteratureSchema)
