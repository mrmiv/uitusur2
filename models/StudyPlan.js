// Учебный план
const { Schema, model } = require('mongoose')

const StudyPlanSchema = new Schema({

    course: {
        type: Number,
        max: 6,
        min: 1,
        required: [true, "Поле курс является обязательным"],
        unique: true
    },

    group: {
        type: String,
        maxlength: 32,
        required: [true, "Поле группа является обязательным"],
        unique: true
    },

    exam: {
        from: Date,
        to: Date
    },

    weekend: {
        from: Date,
        to: Date
    },

    gia: {
        from: Date,
        to: Date
    },

    practic: {
        type: { type: String },
        from: Date,
        to: Date
    }

}, { autoIndex: false, versionKey: false })

module.exports = model('StudyPlan', StudyPlanSchema)