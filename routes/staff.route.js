const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Staff = require('../models/Staff')

// /staff
router.get('/', async (req, res) => {

    try {
        await Staff.find()
            .select(['firstname', 'lastname', 'secondname', 'fullname_url'])
            .sort([['lastname', 1], ['firstname', 1], ['secondname', 1]])
            .then(data => res.json(data))
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * Получение сотрудника по id
 */
router.get('/get-by-id/:id', async (req, res) => {

    const id = req.params.id

    try {

        const staff = await Staff.findById(id)

        if (!staff) {
            return res.status(404).json({ message: "Сотрудник не найден" })
        }

        res.json(staff)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * Получение сотрудника по translit-fullname 
 * ivanon-ii
 */
router.get('/:fullname_url', async (req, res) => {

    const {fullname_url} = req.params

    try {

        const staff = await Staff.findOne({fullname_url})

        if (!staff) {
            return res.status(404).json({ message: "Сотрудник не найден" })
        }

        res.json(staff)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// staff/
router.post('/', auth, async (req, res) => {

    const {
        firstname,
        lastname,
        secondname,
        fullname_url,
        post,
        degree,
        rank,
        path,
        worktime
    } = req.body

    try {

        const staff = new Staff({
            firstname,
            lastname,
            secondname,
            fullname_url,
            post,
            degree,
            rank,
            path,
            worktime
        })

        await staff.save()
                .then(staff => res.json({ message: "Сотрудник успешно добавлен", staff }))
                .catch(err => res.status(400).json({ message: err.message }))
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// staff/:id
router.delete('/:id', auth, async (req, res) => {

    const id = req.params.id

    try {
        const staff = await Staff.findById(id)


        if (!staff) {
            return res.status(404).json({ message: "Сотрудник не найден" })
        }

        await staff.delete()
            .then(() => res.status(201).json({ message: "Сотрудник удален" }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', auth, async (req, res) => {

    const id = req.params.id
    const body = req.body

    try {

        await Staff.findByIdAndUpdate(id, body)
            .then(staff => res.json({ message: `Сотрудник ${staff.lastname} ${staff.firstname} обновлен`, staff }))
            .catch(err=>{
                return res.status(400).json({ message: err.message })
            })
            
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
