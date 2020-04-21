// Сотрудники кафедры
const {Schema, model} = require('mongoose')

const StaffSchema = new Schema({

// Фамилия
    lastname:{
        type: String,
        required: [true, "Поле фамилия является обязательный"],
        minlength: [2, "Минимальная длина фамилии - 2 символа"],
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\-)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле фамилия содержит недопустимые символы`
        }
    },

// Имя
    firstname:{
        type: String,
        required: [true, "Поле имя является обязательным"],
        minlength: [2, "Минимальная длина имени - 2 символа"],
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\-)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле имя содержит недопустимые символы`
        }
    },

// Отчество
    secondname:{
        type: String,
        minlength: [2, "Минимальная длина отчества - 4 символа"],
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\-)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле отчество содержит недопустимые символы`
        }
    },

// должность
    post:{
        type: String,
        required: true,
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле должность содержит недопустимые символы`
        }
    },
// Уч.степень
    degree: {
        type: String,
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-)(\.)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле ученая степень содержит недопустимые символы`
        }
    },
// Справочник
    path: {
        type: String,
        validate:{
            validator: function(path){
                return /^((https|http)?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(path)
            },
            message: props => `${props.value} - Поле сайт содержит недопустимые символы`
        }
    },
// Уч.звание
    rank:{
        type: String,
        validate:{
            validator: function (name) {
                return /^[а-яА-ЯёЁa-zA-Z0-9(\s)(\-)]+$/.test(name) // добавить тире
            },
            message: props => `${props.value} - Поле ученое звание содержит недопустимые символы`
        }
    },

// Время консультаций
    worktime: [{
        require: false,
        index: false,
        week: {
            type: String,
            require: true
        },
        time: {
            type: String,
            maxLength: 32,
            require: true,
            validate:{
                validator: function (time) {
                    return /^[0-9(\s)(\-|–)(\:)]+$/.test(time) // добавить тире
                },
                message: props => `${props.value} - Поле время содержит недопустимые символы`
            }
        },
        place: {
            type: String,
            maxLength: 64,
            require: true,
        },
    }]



}, {autoIndex:false, versionKey: false})

module.exports = model('Staff', StaffSchema)