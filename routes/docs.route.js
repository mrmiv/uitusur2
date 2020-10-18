const { Router } = require('express')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/middleware.auth');
const deleteFile = require('../middleware/middleware.deleteFile');
const multipleFileUpload = require("../middleware/middleware.multipleFileUpload");

const Docs = require('../models/Doc')

/**
 * @url /api/docs/
 * @description Получить все документы
 */
router.get('/', async (req, res) => {

    const {category} = req.query
    
    const query = category ? {category} : {}

    try {
        await Docs.find(query)
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

/**
 * @url /api/docs/:id
 * @description Получить документ по id
 * @param id
 */
router.get('/:id', async (req, res) => {

    const {id} = req.params

    try {
        await Docs.findById(id)
            .then(data => res.json(data))
            .catch(err => res.status(400).json({ message: err.message }))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @url /api/docs/
 * @description Добавить заголовок
 */
router.post('/', [auth, multipleFileUpload], async (req, res) => {

    const {
        title,
        subcategory,
        category,
        path,
        date
    } = req.body

    try {
        if (!title) { return res.status(400).json({ message: "Поле название является обязательным" }) }
        if (!category) { return res.status(400).json({ message: "Поле категория является обязательным" }) }
    
        const exists = await Docs.findOne({ title })

        if (exists) {
            return res.status(400).json({ message: "Документ с таким названием уже существует" })
        }

        const document = req.filesURLs[0]
        
        const doc = new Docs({
            title,
            category,
            date: date? date : null,
            subcategory: subcategory ? subcategory : null
        })
        
        if (path){
            doc.path = path
        } else if (document) {
            doc.document = document.path
        } else {
            return res.status(400).json({ message: "Прикрепите документ или ссылку" })
        }

        await doc.save()
            .then(() => res.json({ message: "Документ успешно добавлен" }))
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @url /api/docs/:id
 * @param id
 * @description Удалить документ по id
 */
router.delete('/:id', auth, async (req, res) => {

    const {id} = req.params

    try {

        const doc = await Docs.findById(id)

        if (!doc) {
            return res.status(404).json({ message: "Документ с таким id не найден" })
        }

        const { document } = doc

        if (document) {
            const deleteError = deleteFile(document)
            if(deleteError){
                return res.status(400).json({message: deleteError.message})
            }
        }

        await doc.delete()
            .then(() => res.json({ message: "Документ удален" }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @url /api/docs/:id
 * @method patch
 * @description Обновить документ по id
 * @param id
 */
router.patch('/:id', [auth, multipleFileUpload], async (req, res) => { 

    const {id} = req.params
    const { title, date, path, category, subcategory } = req.body

    try {
        const doc = await Docs.findById(id)

        if (!doc) {
            return res.status(404).json({ message: "Документ с таким id не найден" })
        }

        if (!title) { return res.status(400).json({ message: "Поле название является обязательным" }) }
        if (!category) { return res.status(400).json({ message: "Поле категория является обязательным" }) }

        const { document } = doc
        const newDoc = req.filesURLs[0]

        function deleteOldDocument(oldDocument) {
            if (oldDocument) {
                const deleteError = deleteFile(oldDocument)
                if(deleteError){
                    return res.status(400).json({message: deleteError.message})
                }
            }
        }

        if (newDoc) {
            doc.document = newDoc.path
            doc.path = null 
            if (document){deleteOldDocument(document)}
        } else if (path){
            doc.path = path
            doc.document = null
            if (document){deleteOldDocument(document)}
        }

        doc.title = title
        doc.category = category
        doc.subcategory = subcategory ? subcategory : null
        doc.date = date ? date : null

        await doc.save()
            .then(() => res.status(201).json({ message: "Документ успешно обновлен" }))
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
