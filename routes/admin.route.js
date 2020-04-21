const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const {Error} = require('mongoose')
const jwt = require('jsonwebtoken')

const Admin = require('../models/User')
const auth = require('../middleware/middleware.auth')

const router = Router()

router.get('/',auth, async (req, res) => {
    try {
      
      const user = await Admin.findOne({email: req.user})

      if (!user) throw Error({message: 'no auth'})
      
      res.json({message: `Пользователь ${req.user} авторизован`})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

// /api/auth/register - Регистрация
router.post('/register',auth, async (req, res) => {

    const {email, password} = req.body

    try {
        // проверка емайла на существование в бд
        const candidate = await Admin.findOne({ email })
        
        if (candidate){
            return res.status(400).json({message: "Пользователь с таким email уже существует"})
        }

        try{
            await Admin.validate({email, password}, ['email', 'password'])
        } catch( error){
            error instanceof Error.ValidationError
            return res.status(400).json({
                message: error.message
            })
        }

        // кодировка пароля
        const hashedPassword = await bcrypt.hash(password, 12)
        admin = new Admin({email, password: hashedPassword})

        try{
            await admin.save()
                .then(() => res.json({message: "Пользователь успешно зарегистрирован"}))
                .catch(err => res.status(400).json({
                    message: err.message
                }))
        } catch(error){ 
            error instanceof Error.ValidationError
            return res.status(400).json({
                message: error.message
            })
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

// /auth/login - Авторизация
router.post('/login', async (req, res) => {

    const {email, password} = req.body

    try {
        // console.log(email, password);

        try{
            await Admin.validate({email, password}, ['email', 'password'])
        } catch( error){
            error instanceof Error.ValidationError
            return res.status(400).json({
                message: error.message
            })
        }

        // проверка пользователя на существование
        const user = await Admin.findOne({ email })        

        if (!user){
            return res.status(400).json({message: "Проверьте правильность введенных данных"})
        }

        // проверка совпадения паролей 
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message:"Проверьте правильность введенных данных"})
        }

        // создание токена jwt 
        const token = jwt.sign(
            { email : user.email },
            process.env.secretKey || config.get('secretKey'),
            {expiresIn: '2h'}
        )
        
        return res.json({ token, email: user.email })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.delete('/:id',auth, async (req,res)=>{

    const {id} = req.params

    try {

        const user = await Admin.findById(id)

        if (!user){
            return res.status(404).json({message: "Такого пользователя не существует"})
        }

        await user.delete()
        res.json({message: "Пользователь удален"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

module.exports = router