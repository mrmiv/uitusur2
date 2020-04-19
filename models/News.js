// Объявления кафедры
const {Schema, model} = require('mongoose')

const NewsSchema = new Schema({

    // Дата создания новости
    created_at:{
        type: Date,
        default: Date.now()
    },

    // Заголовок
    title:{
        type: String,
        minlength: 1,
        required: [true, 'Поле заголовок является обязательным!'],
        unique: true
    }, 

    // Авторы
    body:{
        type: String,
        minlength: 1,
        required: true
    },

    pin:{
        type: Boolean,
        default: false
    },

    // Тип
    type:{
        type: Number,
        required: true,
        enum: [1,2,3] 
        // 1 - Объявления кафедры
        // 2 - Стипендии и гранты
        // 3 - Конференции
    },

    // свойства
        // Сайт
        site:{
            type: String,
            validate:{
                validator: function(path){
                    return /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/.test(path)
                },
                message: props => `${props.value} - Поле path содержит недопустимые символы`
            }
        },
        // Место проведения
        city:{type: String},
        // Дедлайн
        deadline:{type: Date},
        // Для кого
        users:{type:String},

        // Период действия гранта или сроки результатов конференции
        period:{type:String},

        // Сумма гранта
        grant:{type:String},

    // Вложения
    docs:{type:[String]}

}, {autoIndex:false, versionKey: false})

module.exports = model('News', NewsSchema)
