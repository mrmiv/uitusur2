const {Router} = require('express')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/middleware.auth')

const Docs = require('../models/Doc')

// /docs
router.get('/', async (req, res) => {
    try {
        await Docs.find()
            .sort([['category',1],['subcategory',1], ['title',1], ['document',1],['date',1]])
            .then(async data => {
               
                let categories = []
                let subcategories = []
                const arrayoffields = await Docs.find().select(['category','subcategory'])
                for(let f of arrayoffields){
                    if(!categories.includes(f.category)){
                        categories.push(f.category)
                    }
                    if (!subcategories.includes(f.subcategory)){
                        subcategories.push(f.subcategory)
                    }
                }

                res.json({
                    data,
                    categories,
                    subcategories
            })}
            )
            .catch(err => res.status(400).json({message: err.message}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// /docs/:id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        await Docs.findById(id)
            .then(data => res.json(data))
            .catch(err => res.status(400).json({message: err.message}))
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// Docs/
router.post('/', async (req, res) => {

    const {
        title, 
        subcategory, 
        category, 
        path, 
        date
    } = req.body

    if(!title){return res.status(400).json({message:"Поле название является обязательным"})}
    if(!category){return res.status(400).json({message:"Поле категория является обязательным"})}

    // console.log(req.files.document);
    
    const {document} = req.files

    if(!document && !path){return res.status(400).json({message:"Прикрепите документ или ссылку"})}

    try {

        const doc = new Docs({
            title,
            category
        }) 
    
        if(path){doc.path = path}
        if(date){doc.date = date}
        if(subcategory){doc.subcategory = subcategory}

        const exists = await Docs.findOne({ title }) || await Docs.findOne({ document: `/uploads/docs/${document.name}` })

        if (exists){
            return res.status(400).json({message: "Документ уже существует"})
        }
        
        if(document){
            doc.document = `/uploads/docs/${document.name}`

            // Use the mv() method to place the file somewhere on your server
            document.mv(`uploads/docs/${document.name}`, function(err){
                if (err){
                    return res.status(500).json({message: "Ошибка при прикреплении документа: "+ err});
                }
            })
        }

        try{
            await doc.save()
            .then(() => res.status(201).json({message:"Документ успешно добавлен"}) )
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

// Docs/:id
router.delete('/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const doc = await Docs.findById(id)

        if(!doc){
            return res.status(404).json({message: "Книга с введенным id не существует"})
        }

        const {document} = doc

        if(document){
            fs.unlink(`${document.substr(1)}`, (err) => {
                if (err) {
                  return res.status(400).json({message:err.message})
                }
            })
        }

        await document.delete()
            .then(()=> res.status(201).json({message: "Документ удален"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.patch('/:id', async (req, res) => { //patch smth try catch delete file

    const id = req.params.id
    const {title, date, path, category, subcategory} = req.body
    
    try {
        const doc = await Docs.findById(id)

        if(!doc){
            return res.status(404).json({message: "Документ с таким id не существует"})
        }

        const {document} = doc
        const {newdocument} = req.files

        if(newdocument){

            if(document){
                fs.unlink(`${document.substr(1)}`, (err) => {
                    if (err) {
                    return res.status(400).json({message:err.message})
                    }
                })
            }

            doc.document = `/uploads/docs/${newdocument.name}`
            // Use the mv() method to place the file somewhere on your server
            newdocument.mv(`uploads/docs/${newdocument.name}`, function(err){
                if (err){
                    return res.status(500).json({message: "Ошибка при прикреплении документа: "+ err});
                }
            })
        }

        if(title){doc.title = title}
        if(date){doc.date = date}
        if(category){doc.category = category}
        if(subcategory){doc.subcategory = subcategory}
        if(path){doc.path = path}

        try{
            await doc.save()
            .then(() => res.status(201).json({message:"Документ успешно добавлен"}) )
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

module.exports = router
