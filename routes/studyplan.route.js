const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const StudyPlan = require('../models/StudyPlan')

// /sp
router.get('/', async (req, res) => {

    try {
        await StudyPlan.find()
            .select(['course','group'])
            .sort([['course',1],['group',1]])
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
    const data = req.body

    try {
        const sp = await StudyPlan.findById(id)

        if (!sp) {
            return res.status(404).json({ message: "Учебный план не найден" })
        }

        // const data = { course, 
        //     group, 
        //     exam_from, 
        //     exam_to, 
        //     practic_from, 
        //     practic_to, 
        //     practic_type, 
        //     gia_from, 
        //     gia_to, 
        //     weekend_from, 
        //     weekend_to }

        // console.log(data);

        await StudyPlan.findByIdAndUpdate(id, {
            ...data,
            exam:{
                from: data.exam_from,
                to: data.exam_to
            },
            practic:{
                type: data.practic_type,
                to: data.practic_to,
                from: data.practic_from
            },
            weekend:{
                from: data.weekend_from,
                to: data.weekend_to
            },
            gia:{
                from: data.gia_from,
                to: data.gia_to
            },
        })
            .then(sp => res.json({ message: `Учебный план для группы ${sp.group} обновлен!`, sp }))            

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
