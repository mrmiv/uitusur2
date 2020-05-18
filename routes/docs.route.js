const { Router } = require('express')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/middleware.auth')

const Docs = require('../models/Doc')

// /docs
router.get('/', async (req, res) => {
    try {
        await Docs.find()
            .sort([['category', 1], ['subcategory', 1], ['title', 1], ['document', 1], ['date', 1]])
            .then(async data => {

                let categories = []
                let subcategories = []
                const arrayoffields = await Docs.find().select(['category', 'subcategory'])
                for (let f of arrayoffields) {
                    if (!categories.includes(f.category)) {
                        categories.push(f.category)
                    }
                    if (!subcategories.includes(f.subcategory)) {
                        subcategories.push(f.subcategory)
                    }
                }

                res.json({
                    data,
                    categories,
                    subcategories
                })
            }
            )
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// /docs/:id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        await Docs.findById(id)
            .then(data => res.json(data))
            .catch(err => res.status(400).json({ message: err.message }))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Docs/
router.post('/', auth, async (req, res) => {

    const {
        title,
        subcategory,
        category,
        path,
        date
    } = req.body

    if (!title) { return res.status(400).json({ message: "Поле название является обязательным" }) }
    if (!category) { return res.status(400).json({ message: "Поле категория является обязательным" }) }

    let document = null
    if (req.files) { document = req.files.document }
    if (!document && !path) { return res.status(400).json({ message: "Прикрепите документ или ссылку" }) }

    try {

        const doc = new Docs({
            title,
            category
        })

        if (path && !document) { doc.path = path }
        if (date) { doc.date = date }
        if (subcategory) { doc.subcategory = subcategory }

        const exists = await Docs.findOne({ title })

        if (exists) {
            return res.status(400).json({ message: "Документ уже существует. Измените название" })
        }

        if (document) {
            doc.document = `/uploads/docs/${doc._id}_${document.name}`

            // Use the mv() method to place the file somewhere on your server
            document.mv(`uploads/docs/${doc._id}_${document.name}`, function (err) {
                if (err) {
                    return res.status(500).json({ message: "Ошибка при прикреплении документа: " + err });
                }
            })
        }

        try {
            await doc.save()
                .then(() => res.status(201).json({ message: "Документ успешно добавлен" }))
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

// Docs/:id
router.delete('/:id', auth, async (req, res) => {

    const id = req.params.id

    try {
        const doc = await Docs.findById(id)

        if (!doc) {
            return res.status(404).json({ message: "Книга с введенным id не существует" })
        }

        const { document } = doc

        if (document) {
            fs.unlink(`${document.substr(1)}`, (err) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                }
            })
        }

        await doc.delete()
            .then(() => res.json({ message: "Документ удален" }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', auth, async (req, res) => { //patch smth try catch delete file

    const id = req.params.id
    const { title, date, path, category, subcategory } = req.body

    try {
        const doc = await Docs.findById(id)

        if (!doc) {
            return res.status(404).json({ message: "Документ с таким id не существует" })
        }

        const { document } = doc
        if (req.files) {
            const newdocument = req.files[0]

            if (newdocument) {

                if (document) {
                    fs.unlink(`${document.substr(1)}`, (err) => {
                        if (err) {
                            return res.status(400).json({ message: err.message })
                        }
                    })
                }

                if (doc.path) {
                    doc.path = undefined
                }

                newdocument.mv(`uploads/docs/${doc._id}_${newdocument.name}`, function (err) {
                    if (err) {
                        return res.status(500).json({ message: "Ошибка при прикреплении документа: " + err });
                    }
                })
                doc.document = `/uploads/docs/${doc._id}_${newdocument.name}`
                // Use the mv() method to place the file somewhere on your server
            }
        }

        // console.log(subcategory);

        if (title) { doc.title = title }
        if (date) { doc.date = date }
        if (category) { doc.category = category }
        if (subcategory) { doc.subcategory = subcategory } else { doc.subcategory = undefined }
        if (path && !req.files) { doc.path = path }

        try {
            await doc.save()
                .then(() => res.status(201).json({ message: "Документ успешно обновлен" }))
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

module.exports = router
