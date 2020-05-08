// Кураторы
const { Schema, model, Types } = require('mongoose')

const CuratorSchema = new Schema({

    // имя
    firstname: {
        type: String,
        required: [true, "Поле имя является обязательным"],
        validate: {
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-\."!№_:?,)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле имя содержит недопустимые символы`
        }
    },
    // фамилия
    lastname: {
        type: String,
        required: [true, "Поле фамилия является обязательным"],
        validate: {
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-\."!№_:?,)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле фамилия содержит недопустимые символы`
        }
    },
    // отчество
    secondname: {
        type: String,
        required: [true, "Поле отчество является обязательным"],
        validate: {
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-\."!№_:?,)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле отчество содержит недопустимые символы`
        }
    },

    staff_id: {
        type: Types.ObjectId,
        required: true,
        unique: true,
        index: true
    },

    group: {
        type: String,
        maxlength: 32,
        required: [true, "Поле группа является обязательным"],
        unique: true
    },

}, { autoIndex: false, versionKey: false })

module.exports = model('Curator', CuratorSchema)