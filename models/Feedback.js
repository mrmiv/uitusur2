const { Schema, model } = require('mongoose')

const Feedback = new Schema({

  name: {
    type: String,
    required: true,
    minlength: 5,
  },

  post: String,
  degree: String,
  text: {
    type: String,
    required: true
  },

}, { autoIndex: false, versionKey: false })

module.exports = model('Feedback', Feedback)