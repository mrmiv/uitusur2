const { Router } = require('express')
const router = Router()
const authStaff = require('../middleware/middleware.auth')

const StudyPlan = require('../models/StudyPlan')

// /sp
router.get('/', async (req, res) => {

    try {
        await StudyPlan.find()
            .then(data => res.json(data))
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// /sp/:id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {

        const sp = await StudyPlan.findById(id)

        if (!sp) {
            return res.status(404).json({ message: "Учебный план не найден" })
        }
        res.json(sp)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// sp/
router.post('/', auth, async (req, res) => {

    const {
        course,
        group,
        exam_from,
        exam_to,
        practic_type,
        practic_from,
        practic_to,
        gia_from,
        gia_to,
        weekend_from,
        weekend_to
    } = req.body

    try {

        const sp = new StudyPlan({
            course,
            group,
        })

        const exists = await StudyPlan.findOne({ group })

        // console.log(exists);

        if (exists) {
            return res.status(400).json({ message: "Учебный план уже существует" })
        }

        if (exam_from || exam_to) {
            if (exam_from && exam_to) {
                sp.exam = { from: exam_from, to: exam_to }
            }
            else return res.status(400).json({ message: "Должны быть введены обе даты экзаменов!" })
        }

        if (practic_to || practic_type || practic_from) {
            if (practic_to && practic_from && practic_type) {
                sp.practic = { from: practic_from, to: practic_to, type: practic_type }
            }
            else return res.status(400).json({ message: "Должны быть введены обе даты практики и ее тип!" })
        }

        if (gia_from || gia_to) {
            if (gia_from && gia_to) {
                sp.gia = { from: gia_from, to: gia_to }
            }
            else return res.status(400).json({ message: "Должны быть введены обе даты ГИА!" })
        }

        if (weekend_from || weekend_to) {
            if (weekend_from && weekend_to) {
                sp.weekend = { from: weekend_from, to: weekend_to }
            }
            else return res.status(400).json({ message: "Должны быть введены обе даты каникул!" })
        }

        try {
            await sp.save()
                .then(sp => res.status(201).json({ message: "Учебный план успешно добавлен", sp }))
                .catch(err => res.status(400).json({ message: err.message }))
        } catch (error) {
            error instanceof Error.ValidationError
            return res.status(400).json({
                message: "Проверьте введенные данные",
                errors: error.message
            })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// sp/:id
router.delete('/:id', auth, async (req, res) => {

    const id = req.params.id

    try {
        const sp = await StudyPlan.findById(id)

        if (!sp) {
            return res.status(404).json({ message: "Учебный план не найден" })
        }
        await sp.delete()
            .then(() => res.status(201).json({ message: "Учебный план удален" }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', auth, async (req, res) => {

    const id = req.params.id
    const body = req.body

    try {
        const sp = await StudyPlan.findById(id)

        if (!sp) {
            return res.status(404).json({ message: "Учебный план не найден" })
        }

        if (body.group) { sp.group = body.group }
        if (body.course) { sp.course = body.course }

        if (body.exam_from) { sp.exam.from = body.exam_from }
        if (body.exam_to) { sp.exam.to = body.exam_to }

        if (body.gia_from) { sp.gia.from = body.gia_from }
        if (body.gia_to) { sp.gia.to = body.gia_to }

        if (body.weekend_from) { sp.weekend.from = body.weekend_from }
        if (body.weekend_to) { sp.weekend.to = body.weekend_to }

        if (body.practic_from) { sp.practic.from = body.practic_from }
        if (body.practic_type) { sp.practic.type = body.practic_type }
        if (body.practic_to) { sp.practic.to = body.practic_to }

        await sp.save()
            .then(sp => res.json({ message: "Учебный план обновлен", sp }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
