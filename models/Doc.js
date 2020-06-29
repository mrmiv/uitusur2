// Реглам. док-ты
const { Schema, model } = require('mongoose')

const DocSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\*.,:\-_+№@\/?\(\)"'!#;)]+$/.test(name)
            },
            message: props => `${props.value} - Поле заголовок содержит недопустимые символы`
        }
    },

    // категория 
    category: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
    },
    // подкатегория 
    subcategory: {
        type: String,
        lowercase: true,
        trim: true
    },
    // document
    document: {
        type: String
    },
    //path
    path: {
        type: String
    },
    // дата утверждения
    date: {
        type: Date
    }

}, { autoIndex: false, versionKey: false })

module.exports = model('Doc', DocSchema)