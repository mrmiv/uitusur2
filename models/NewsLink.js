// Ссылки в новостях
const { Schema, model } = require('mongoose')

const NewsLinkSchema = new Schema({

    // Название
    name: {
        type: String,
        required: [true, "Поле название является обязательным"],
        maxlength: 512,
        trim: true
    },

    // ссылка
    path: {
      type: String,
      required: [true, "Поле ссылка является обязательным"],
      trim: true
    },

    // категория новостей
    type: {
        type: Number,
        require: [true, 'Поле категория новостей является обязательным'],
        trim: true,
    }

}, { autoIndex: false, versionKey: false })

module.exports = model('NewsLink', NewsLinkSchema)