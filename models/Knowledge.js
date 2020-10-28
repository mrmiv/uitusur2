// База знаний
const { Schema, model } = require('mongoose')

const KnowledgeSchema = new Schema({

  title: {
    type: String,
    maxlength: [64, "Максимальная длина названия 64 символов"],
    unique: true,
    minlength: [1, "Минимальная длина названия - 1 символ"],
    required: [true, "Поле название является обязательный"]
  },

  type:{
    type: String,
    required: [true, "Поле тип является обязательный"],
    enum: ["Подкаст", "Аудиокнига", "Курс", "Приложение", "Другое"]
  },

  description:{
    type: String,
    maxlength: [512, "Максимальная длина названия 512 символов"],
  },

  image: {
    type: String,
    required: [true, "Изображение является обязательным"]
  },

  marks:{
    all: {
      type: Boolean,
      default: false,
      index: false
    },
    rt: {
      type: Boolean,
      default: false,
      index: false
    },
    i: {
      type: Boolean,
      default: false,
      index: false
    },
    uk: {
      type: Boolean,
      default: false,
      index: false
    }
  },

  links: {
    type: [String],
    required: [true, "Ссылки являются обязательными"]
  }
    
}, { autoIndex: false, versionKey: false })

module.exports = model('Knowledge', KnowledgeSchema)