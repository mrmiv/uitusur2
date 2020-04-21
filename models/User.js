// Админ пользователь

const {Schema, model} = require('mongoose')

const AdminSchema = new Schema({

    email:{
        type: String,
        unique: true,
        required: [true, 'Поле email - обязательное'],
        minlength: 6,
        maxlength: 255,
        index: true,
        lowercase: true,

        validate: {
            validator: function(email) {
              return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
            },
            message: props => `${props.value} - Некорректный email`
        },
    },

    password:{
        type: String,
        required: [true, 'Поле пароль является обязательным'],
        minlength: [8, 'Слишком короткий пароль'],
        validate: {
            validator: function(password) {
                return /(?=.*[0-9])(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&_*]{8,}/g.test(password)
            },
            message: `Проверьте правильность введенных данных`
        }
    },

}, {versionKey: false})

module.exports = model('Admin', AdminSchema)