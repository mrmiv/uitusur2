// док-ты
const { Schema, model } = require('mongoose')

const FileSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true,
  },

  // document
  file: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now()
  }

}, { autoIndex: false, versionKey: false })

module.exports = model('dbFIle', FileSchema)