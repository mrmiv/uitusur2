// Заголовки и документы

const { Schema, model } = require('mongoose')

const ParamSchema = new Schema({

  page: {
    type: String,
    required: true,
  },

  // Название
  title: {
    type: String,
    required: [true, "Поле название является обязательный"],
    validate: {
      validator: function (name) {
        return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-\."!№_:?,)]+$/.test(name) // добавить тире
      },
      message: props => `${props.value} - Поле название содержит недопустимые символы`
    }
  },

  // Поле
  text: {
    type: String,
    required: true
  }

}, { autoIndex: false, versionKey: false })

module.exports = model('Param', ParamSchema)