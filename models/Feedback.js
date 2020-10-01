const { Schema, model } = require('mongoose')

const Feedback = new Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },

  color: {
    type: String,
    trim: true
  },

  post: {
    type: String,
    trim: true
  },

  degree: {
    type: String,
    trim: true
  },

  type: {
    type: Number,
    enum: [1, 2],
    required: true,
    default: 1 // 1 - Отзывы о кафедре, 2 Цитаты сотрудников
  },

  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  
  text: {
    type: String,
    trim: true,
    required: true
  },

}, { autoIndex: false, versionKey: false })

module.exports = model('Feedback', Feedback)