const { Router } = require('express')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/middleware.auth')

const Literature = require('../models/Literature')

/**
 * Получить список всех книг постранично
 * params: page, perPage, sort, category, search 
 */
router.get('/', async (req, res) => {

    const page = Number(req.query.page) || 1
    const perpage = Number(req.query.perpage) || 12
    const sort = Number(req.query.sort) || 1 // 1=asc, 2=desc
    let category = req.query.filter || null
    const search = req.query.search || null

    let query = {}
    
    if (search){ 
        const q = search.length > 5 ? search.slice(0, -3) : search 
        const reg = {$regex: `.*${q}.*`}
        query.$or = [{category: reg}, {annotation: reg}, {title: reg}, {author: reg}, {category:reg}]
    }

    if (category){
        query.category = category ? category.trim() : ''
    }

    try {
        // console.log(query);
        await Literature.find(query)
            .select(['title', 'translit_title', 'author', 'category', 'image'])
            .sort([['title', sort], ['author', 1], ['category', 1]])
            .skip((page - 1) * perpage)
            .limit(perpage)
            .then(async data => {
                if (data.length === 0) {
                    return res.status(404).json({ message: "Выбранной страницы с книгами не существует" })
                }
                const total = await Literature.find(query).countDocuments()

                const fields = await Literature.distinct("category")

                res.json({
                    data,
                    total,
                    fields
                })
            }
            )
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/** 
 * Получить книгу по id
 */
router.get('/book-by-id/:id', async (req, res) => {

    const id = req.params.id

    try {
        await Literature.findById(id)
            .then(data => res.json(data))
            .catch(err => res.status(400).json({ message: err.message }))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/** 
 * Получить книгу по translit_title
 */
router.get('/book/:translit_title', async (req, res) => {

    const {translit_title} = req.params

    try {
        await Literature.findOne({translit_title})
            .then(data => res.json(data))
            .catch(err => res.status(400).json({ message: err.message }))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * Добавить книгу в БД
 */
router.post('/', auth, async (req, res) => {

    const {
        title,
        translit_title,
        author,
        category,
        description,
        annotation,
        path
    } = req.body

    if (!title) { return res.status(400).json({ message: "Поле заголовок является обязательным" }) }
    if (!author) { return res.status(400).json({ message: "Поле авторы является обязательным" }) }
    if (!category) { return res.status(400).json({ message: "Поле категория является обязательным" }) }

    const { doc, image } = req.files

    if (!image) { return res.status(400).json({ message: "Вы не прикрепили изображение" })}
    
    if (!doc){ return res.status(400).json({ message: "Вы не прикрепили оглавление" })}

    try {
        
        const Book = new Literature({
            title,
            author,
            translit_title,
            category,
            description,
            annotation,
            image: `/uploads/literature/images/${image.name}`,
            doc: `/uploads/literature/${doc.name}`
        })

        if (path) {
            Book.path = path
        }

        const exists = await Literature.findOne({ $or: [{translit_title}, {image: Book.image}, {doc: Book.doc}] })

        if (exists) {
            return res.status(400).json({ message: "Книга уже существует" })
        }

        doc.mv(`uploads/literature/${doc.name}`, function (err) {
            if (err) {
                return res.status(400).json({ message: "Ошибка при прикреплении документа: " + err });
            }
        })

        image.mv(`uploads/literature/images/${image.name}`, function (err) {
            if (err) {
                return res.status(400).json({ message: "Ошибка при прикреплении изображения: " + err });
            }
        })

        await Book.save()
            .then(() => res.json({ message: "Книга успешно добавлена" }))
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * Удалить книгу
 */
router.delete('/book/:id', auth, async (req, res) => {

    const {id} = req.params

    try {
        const Book = await Literature.findById(id)
            .select['_id']

        if (!Book) {
            return res.status(400).json({ message: "Книга с введенным id не существует" })
        }

        const { image, doc } = Book

        try {
            fs.unlink(`${doc.substr(1)}`, (err) => {
                if (err) {
                    console.error("Оглавление не было удалено" + err)
                }
            })

            fs.unlink(`${image.substr(1)}`, (err) => {
                if (err) {
                    console.error("Изображение не было удалено" + err)
                }
            })

        } catch (err) {
            console.error(err)
        }

        await Book.delete()
            .then(() => res.json({ message: "Книга удалена" }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * Обновить книгу по id
 */
router.patch('/book/:id', auth, async (req, res) => {

    const {id} = req.params

    try {
        await Literature.findByIdAndUpdate(id, req.body)
            .then(book => res.json({ message: `Книга ${book.title} успешно обновлена` }))
            .catch(err => res.status(400).json({message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
