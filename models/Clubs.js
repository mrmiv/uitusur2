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

    // Руководитель
    // leader:{
    //     type: String,
    //     required: [true, "Поле руководитель является обязательным"],
    //     validate:{
    //         validator: function (name) {
    //             return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-)(\.)]+$/.test(name) // добавить тире
    //         },
    //         message: props => `${props.value} - Поле руководитель содержит недопустимые символы`
    //     }
    // },

    // ссылка
    path: {
        type: String,
        validate: {
            validator: function (path) {
                return /^((https|http)?:\/\/)?+*$/.test(path)
            },
            message: props => `${props.value} - Поле ссылка содержит недопустимые символы`
        }
    },

    // image
    image: {
        type: String,
        require: [true, 'Изображение является обязательным']
    }

}, { autoIndex: false, versionKey: false })

module.exports = model('Club', ClubSchema)