// Внеучебные клубы
// Сотрудники кафедры
const { Schema, model } = require('mongoose')

const ClubSchema = new Schema({

    // Название
    name: {
        type: String,
        required: [true, "Поле название является обязательный"],
        validate: {
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-\."!№_:?,)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле название содержит недопустимые символы`
        }
    },

    // ссылка
    path: String,

    // image
    image: {
        type: String,
        require: [true, 'Изображение является обязательным']
    }

}, { autoIndex: false, versionKey: false })

module.exports = model('Club', ClubSchema)