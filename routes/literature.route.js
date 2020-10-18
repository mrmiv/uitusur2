const { Router } = require('express')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/middleware.auth')

const Literature = require('../models/Literature')

/**
 * @description Получить список всех книг постранично
 * @param page
 * @param perPage 
 * @param sort
 * @param category
 * @param search 
 */
router.get('/', async (req, res) => {

    const page = Number(req.query.page) || 1
    const perpage = Number(req.query.perpage) || 12
    const sort = Number(req.query.sort) || 1 // 1=asc, 2=desc
    let category = req.query.filter || null
    const search = req.query.search || null

    let query = {}
    
    if (search){ 
        const q = search.length > 6 ? search.slice(0, -3) : search 
        const reg = {$regex: `.*${q}.*`, $options: 'i' }
        query.$or = [{category: reg}, {description: reg}, {annotation: reg}, {title: reg}, {author: reg}]
    }

    if (category){
        query.category = category ? category.trim() : ''
    }

    try {
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
 * @param id
 * @description Получить книгу по id
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
 * @param translit_title
 * @description Получить книгу по translit_title
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
 *  @description Добавить книгу в БД
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
        
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      try {

        const image = req.files['image']
        if (!title) { return res.status(400).json({ message: "Поле заголовок является обязательным" }) }
        if (!author) { return res.status(400).json({ message: "Поле авторы является обязательным" }) }
        if (!category) { return res.status(400).json({ message: "Поле категория является обязательным" }) }
        if (!description) { return res.status(400).json({ message: "Поле библиографическое описание является обязательным" }) }
        if (!annotation) { return res.status(400).json({ message: "Поле аннотация является обязательным" }) }
        if (!image) { return res.status(400).json({ message: "Вы не прикрепили изображение" })}

        const exists = await Literature.findOne({ $or: [{translit_title},  {title}] })

        if (exists) {return res.status(400).json({ message: "Книга c таким названием / URL уже существует" })}

        const imagePath = `uploads/literature/images/${s4()}-${s4()}-${image.name}`

        const Book = new Literature({
            title,
            author,
            translit_title,
            category,
            description,
            annotation,
            image: `/${imagePath}`,
        })

        const filesErrors = []
        if (path) {Book.path = path}
        
        image.mv(imagePath, function (err) {
            if (err) {return res.status(400).json({ message: `Ошибка при прикреплении изображения: ${err}` })}
        })

        const doc = req.files['doc']
        
        if (doc){

            const docPath = `uploads/literature/${doc.name}`
            doc.mv(docPath, function (err) {
                if (err) {filesErrors.push({ message: `Ошибка при прикреплении документа ${doc.name}: ${err}` })}
            })
            Book.doc = `/${docPath}`
        }
        await Book.save()
            .then(() => res.json({ message: `Книга успешно добавлена. ${filesErrors.length === 0 ? '' : filesErrors[0].message}` }))
            .catch(err => res.status(400).json({ message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @description Удалить книгу
 */
router.delete('/book/:id', auth, async (req, res) => {

    const {id} = req.params

    try {

        const Book = await Literature.findById(id)
        if (!Book) {return res.status(400).json({ message: "Книга с введенным id не существует" })}

        const { image, doc } = Book

        const filesErrors = []

        if (doc){
            fs.unlink(doc.substr(1), (err) => {
                if (err) {filesErrors.push({ message: `Ошибка при удалении оглавления`, error: err })}
            })
        }

        fs.unlink(image.substr(1), (err) => {
            if (err) {filesErrors.push({ message: `Ошибка при удалении изображения.`, error: err })}
        })

        await Book.delete()
            .then(() => res.json({ message: `Книга удалена. ${filesErrors.length === 0 ? '' : filesErrors.map( err => err.message)}` }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @param id
 * @description Обновить книгу по id
 */
router.patch('/book/:id', auth, async (req, res) => {

    const {id} = req.params

    const {title,
        translit_title,
        author,
        category,
        description,
        annotation,
        path, 
        oldDoc} = req.body

    try {
        
		const Book = await Literature.findById(id)
		if (!Book){ return res.status(404).json({message: `Книга с таким id не найдена`}) }

        if (!title) { return res.status(400).json({ message: "Поле заголовок является обязательным" }) }
        if (!author) { return res.status(400).json({ message: "Поле авторы является обязательным" }) }
        if (!category) { return res.status(400).json({ message: "Поле категория является обязательным" }) }
        if (!description) { return res.status(400).json({ message: "Поле библиографическое описание является обязательным" }) }
        if (!annotation) { return res.status(400).json({ message: "Поле аннотация является обязательным" }) }

        const filesErrors = []
        if (!oldDoc){
            Book.doc = null
        }

        if (req.files){
            const {doc, image} = req.files

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            function updateFile(file, filepath) {
                file.mv(filepath, function (err) {
                    if (err) {
                        filesErrors.push({ message: `Ошибка при прикреплении документа ${file.name}.`, error: err })
                        return false
                    }
                })
                return true
            }

            function deleteFile(path) {
                fs.unlink(path.substr(1), (err) => {
                    if (err) { filesErrors.push({message: `Файл не был удален`, error: err})}
                })
            }
            
            if(image){
                const imagepath = `uploads/literature/images/${s4()}-${s4()}-${image.name}`

                if (updateFile(image, imagepath)){
                    deleteFile(Book.image)
                    Book.image = `/${imagepath}`
                }
            }

            if(doc){
                const docpath = `uploads/literature/${s4()}-${s4()}-${doc.name}`
                
                if (updateFile(doc, docpath)){
                    deleteFile(Book.doc)
                    Book.doc = `/${docpath}`
                }
            }
        }
	
        Book.title = title
        Book.translit_title = translit_title
        Book.path = path
        Book.category = category
        Book.author = author
        Book.description = description
        Book.annotation = annotation

        await Book.save()
            .then(book => res.json({ message: `Книга ${book.title ? book.title : ''} успешно обновлена. ${filesErrors.length === 0 ? '' : `Возникли ошибки при обновлении вложений: ${filesErrors.map( err => err.message)}`}` }))
            .catch(err => res.status(400).json({message: err.message }))

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
