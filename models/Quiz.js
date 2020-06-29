const { Schema, model } = require('mongoose')

const QuizSchema = new Schema({

  quiz: {
    type: String,
    required: true,
    minlength: 5,
  }

}, { autoIndex: false, versionKey: false })

module.exports = model('Quiz', QuizSchema)