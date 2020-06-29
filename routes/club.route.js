const {Router} = require('express')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/middleware.auth')
const Club = require('../models/Clubs')

// /club
router.get('/', async (req, res) => {
    
    try {
        await Club.find()
            .sort([['name',1]])
            .then(data => { res.json(data)})
            .catch(err => res.status(400).json({message: err.message}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// /club/:id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const club = await Club.findById(id)

        if(!club){
            return res.status(404).json({message: "Клуб не найден"})
        }

        res.json(club)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// club/
router.post('/',auth, async (req, res) => {

    const {
        name,
        path
    } = req.body

    try {

        const club = new Club({
            name,
            path
        })

        // console.log(club);
        const exists = await Club.findOne({name})

        if (exists){
            return res.status(400).json({message: "Клуб уже существует"})
        }

        const {image} = req.files

        if(!image){
            return res.status(400).json({message: "Вы не прикрепили изображение"})
        }

        image.mv(`uploads/other/clubs/${image.name}`, function(err){
            if (err){
                return res.status(500).json({message: "Ошибка при прикреплении изображения: "+ err});
            }
        })

        club.image = `/uploads/other/clubs/${image.name}`
        // console.log(club);
        try{
            await club.save()
            .then(club => res.status(201).json({message:"Клуб успешно добавлен", club}) )
            .catch(err => res.status(400).json({message: err.message}))
        } catch (error){
            error instanceof Error.ValidationError
            return res.status(400).json({
                message: "Проверьте введенные данные",
                errors: error.message
            })
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// club/:id
router.delete('/:id',auth, async (req, res) => {

    const id = req.params.id
    
    try {
        const club = await Club.findById(id)

        if(!club){
            return res.status(404).json({message: "Клуб не найден"})
        }

        await club.delete()
            .then(()=> res.json({message: "Клуб удален"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.patch('/:id',auth, async (req, res) => {

    const id = req.params.id
    const body = req.body

    try {
        const club = await Club.findById(id)

        if(!club){
            return res.status(404).json({message: "Клуб не найден"})
        }

        // console.log(body, body.rank);
        club.name = body.name
        club.path = body.path

        await club.save()
            .then(club => res.json({message: "Клуб обновлен", club}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports = router
