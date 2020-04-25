// Реглам. док-ты
const {Schema, model} = require('mongoose')

const DocSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    category:{
        type: String,
        required: true,
    },

// document
    document: {
        type: String
    },
//path
    path: {
        type: String
    },

    data: {
        type: Date
    }

}, {autoIndex:false, versionKey: false})

module.exports = model('Doc', DocSchema)