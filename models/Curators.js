// Кураторы
const {Schema, model} = require('mongoose')

const CuratorSchema = new Schema({

// Название
    name:{
        type: String,
        required: [true, "Поле куратор является обязательный"],
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-\."!№_:?,)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле куратор содержит недопустимые символы`
        }
    },

    group:{
        type: String,
        maxlength: 32,
        required: [true, "Поле группа является обязательным"],
        unique: true
    },

    path: String

}, {autoIndex:false, versionKey: false})

module.exports = model('Curator', CuratorSchema)