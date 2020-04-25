const {Router} = require('express')
const router = Router()
const fs = require('fs')
// const authStaff = require('../middleware/middleware.auth.Staff')

const Literature = require('../models/Literature')

// /literature
router.get('/', async (req, res) => {

    // const {page, perpage, sort} = req.params
    const page = Number(req.query.page) || 1
    const perpage = Number(req.query.perpage) || 12
    const sort = Number(req.query.sort) || 1 // 1=asc, 2=desc
    const category = req.query.filter || null
    const keywords = req.query.keywords || null
    // console.log(keywords);
    // console.log(page, perpage, sort, category);
    let query = {}
    try {

        if(category){
            query ={category}
        } else if (keywords){
            query = {keywords: {$in:{ keywords }}}
        }

        await Literature.find(query)
            .select(['title', 'author', 'category', 'image'])
            .sort([['title',sort], ['author',1], ['category',1]])
            .skip((page-1)*perpage)
            .limit(perpage)
            .then(async data => {
                if (data.length===0){
                    return res.status(404).json({message: "Такой страницы не существует"})
                }
                const pages = Math.ceil(await Literature.find(category?{category}:null).countDocuments()/perpage)

                let fields = []
                const arrayoffields = await Literature.find().select('category')
                for(let f of arrayoffields){
                    if(!fields.includes(f.category.toLowerCase())){
                        fields.push(f.category.toLowerCase())
                    }
                }

                res.json({
                    data,
                    pages,
                    fields
            })}
            )
            .catch(err => res.status(400).json({message: err.message}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// /literature/:id
router.get('/book/:id', async (req, res) => {

    const id = req.params.id

    try {
        await Literature.findById(id)
            .then(data => res.json(data))
            .catch(err => res.status(400).json({message: err.mesage}))
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// Literature/
router.post('/', async (req, res) => {

    const {
        title, 
        author, 
        category, 
        description, 
        annotation,
        keywords,
        path
    } = req.body

    if(!title){return res.status(400).json({message:"Поле заголовок является обязательным"})}
    if(!author){return res.status(400).json({message:"Поле авторы является обязательным"})}
    if(!category){return res.status(400).json({message:"Поле категория является обязательным"})}

    if(!req.files){
        return res.status(400).json({message: "Вы не прикрепили файл"})
    }

    try {
        const {doc, image} = req.files

        const Book = new Literature({
            title, 
            author, 
            category, 
            description, 
            annotation,
            image: `/uploads/literature/images/${image.name}`, 
            keywords
        })

        if(path){
            Book.path = path
        }    

        const exists = await Literature.findOne({ title }) || await Literature.findOne({ image: Book.image })

        if (exists){
            return res.status(400).json({message: "Книга уже существует"})
        }
    
        if(doc){
            Book.doc = `/uploads/literature/${doc.name}`
            // Use the mv() method to place the file somewhere on your server
            doc.mv(`uploads/literature/${doc.name}`, function(err){
                if (err){
                    return res.status(500).json({message: "Ошибка при прикреплении документа: "+ err});
                }
            })
        }

        image.mv(`uploads/literature/images/${image.name}`, function(err){
            if (err){
                return res.status(500).json({messagee: "Ошибка при прикреплении изображения: "+ err});
            }
        })
        // console.log(`files ${doc.name}, ${image.name} uploaded`);
        // console.log(Book);

        try{
            await Book.save()
            .then(() => res.status(201).json({message:"Книга успешно добавлена"}) )
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

// Literature/book/:id
router.delete('/book/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const Book = await Literature.findById(id)


        if(!Book){
            return res.status(404).json({message: "Книга с введенным id не существует"})
        }

        const {image, doc} = Book

        try {
            // delete doc
            fs.unlink(`${doc.substr(1)}`, (err) => {
                if (err) {
                  console.error("Оглавление не было удалено"+ err)
                }
            })
            // delete image
            fs.unlink(`${image.substr(1)}`, (err) => {
                if (err) {
                    console.error("Изображение не было удалено"+ err)
                }
            })
            // files removed
        } catch(err) {
            console.error(err)
        }

        await Book.delete()
            .then(()=> res.status(201).json({message: "Книга удалена"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.patch('/book/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const Book = await Literature.findById(id)


        if(!Book){
            return res.status(404).json({message: "Книга с таким id не существует"})
        }

        const {image, doc} = Book

        try {
            // delete doc
            fs.unlink(`${doc}`, (err) => {
                if (err) {
                  console.error("Оглавление не было удалено"+ err)
                }
            })
            // delete image
            fs.unlink(`${image}`, (err) => {
                if (err) {
                    console.error("Изображение не было удалено"+ err)
                }
            })
            // files removed
        } catch(err) {
            console.error(err)
        }

        await Book.delete()
            .then(()=> res.status(201).json({message: "Книга удалена"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports = router
