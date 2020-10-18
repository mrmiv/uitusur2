const {Router} = require('express')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/middleware.auth')
const deleteFile = require('../middleware/middleware.deleteFile')
const multipleFileUpload = require('../middleware/middleware.multipleFileUpload')
const Club = require('../models/Clubs')

/**
 * @url /api/clubs/
 * @method GET
 * @description получить все клубы
 */
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

/**
 * @url /api/clubs/:id
 * @method GET
 * @description получить клуб по id
 * @param id
 */
router.get('/:id', async (req, res) => {

    const {id} = req.params

    try {
        const club = await Club.findById(id)

        if(!club){
            return res.status(404).json({message: "Клуб не найден"})
        }

        return res.json(club)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/**
 * @url /api/clubs/
 * @method POST
 * @description добавить клуб
 */
router.post('/', [auth, multipleFileUpload], async (req, res) => {

    const {
        name,
        path
    } = req.body

    try {

        const club = new Club({
            name,
            path
        })

        if(!name){return res.status(400).json({message: "Поле название является обязательным"})}
        if(!path){return res.status(400).json({message: "Поле ссылка является обязательным"})}

        const exists = await Club.findOne({name})

        if (exists){
            return res.status(400).json({message: "Клуб с таким названием уже существует"})
        }

        const image = req.filesURLs[0]

        if(!image){return res.status(400).json({message: "Вы не прикрепили изображение"})}

        club.image = image.path

        await club.save()
            .then(club => res.json({message: `Клуб "${club.name ? club.name : ''}" успешно добавлен`}) )
            .catch(err => res.status(400).json({message: err.message}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/**
 * @url /api/clubs/
 * @method DELETE
 * @description удалить клуб по id
 * @param id
 */
router.delete('/:id', auth, async (req, res) => {

    const {id} = req.params
    
    try {
        const club = await Club.findById(id)

        if(!club){return res.status(404).json({message: "Клуб не найден"})}

        await club.delete()
            .then(()=> res.json({message: "Клуб удален"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.patch('/:id', [auth, multipleFileUpload], async (req, res) => {

    const {id} = req.params
    const body = req.body

    try {
        const club = await Club.findById(id)

        if(!club){
            return res.status(404).json({message: "Клуб не найден"})
        }

        const image = req.filesURLs[0]
        const errors = []

        if(image){
            const deleted = deleteFile(club.image)
            if (deleted.message){
                return errors.push(deleted.message)
            }
            club.image = image.path
        }

        club.name = body.name
        club.path = body.path

        await club.save()
            .then(club => res.json({message: `Клуб "${club.name ? club.name : ''}" обновлен. ${errors.length === 0 ? '' : errors.map( err => err.message)}`}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports = router
