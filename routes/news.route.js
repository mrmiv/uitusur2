const {Router} = require('express')
const router = Router()
const fs = require('fs')
// const authStaff = require('../middleware/middleware.auth.Staff')

const News = require('../models/News')

// /literature
router.get('/:type', async (req, res) => {

    // const {page, perpage} = req.params
    const page = Number(req.query.page) || 1
    const perpage = Number(req.query.perpage) || 10
    // console.log(page, perpage);
    const {type} = req.params

    try {

        if (!(type === 1 || 2 || 3)){
            return res.status(404).json({message: "Страница не найдена"})
        }

        await News.find({type})
            .select(['title', 'body', 'created_at', 'pin', 'city', 'period','deadline','users'])
            .sort([['created_at',1], ['pin',1], ['title',1]])
            .skip((page-1)*perpage)
            .limit(perpage)
            .then(async data => {

                if (data.length === 0){
                    return res.status(404).json({message: "Новостей нет"})
                }

                const totalnews = await News.find({type}).countDocuments()
                const pages = Math.ceil( totalnews / perpage)
                
                res.json({data, pages})
            })
            .catch(err => res.status(400).json({message: err.mesage}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// news/read/:id
router.get('/read/:id', async (req, res) => {

    const id = req.params.id

    try {
        const news = await News.findById(id)
            
        if (!news){
            return res.status(404).json({message: "Новость не найдена"})
        }

        return res.json(news)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// News/
router.post('/', async (req, res) => {

    const {
        title, 
        body, 
        type,
        pin, 
        site,
        city,
        deadline,
        users,
        period,
        grant,
        send_to_email
    } = req.body


    if(!title){return res.status(400).json("Поле заголовок является обязательным")}
    if(!body){return res.status(400).json("Поле сообщение является обязательным")}
    if(!type){return res.status(400).json("Поле тип является обязательным")}

    try {
        // const {docs} = req.files
        // console.log(docs);

        const news = new News({
            title, 
            body, 
            type, 
            pin, 
            site,
            city,
            deadline,
            users,
            period,
            grant,
            created_at: Date.now()
            // docs: `uploads/news/${doc.name}`
        })
    
        // Use the mv() method to place the file somewhere on your server
        // docs.mv(`uploads/news/${doc.name}`, function(err){
        //     if (err){
        //         return res.status(500).json("Ошибка при прикреплении документа: "+ err);
        //     }
        // })
        // console.log(`files ${doc.name}, ${image.name} uploaded`);
        // console.log(Book);

        try{

            await news.save()
            .then(() => res.status(201).json({message:"Новость создана"}) )
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

// News/read/:id
router.delete('/read/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const news = await News.findById(id)


        if(!news){
            return res.status(404).json({message: "Новости с введенным id не существует"})
        }

        if (news.docs){
            console.log(news.docs);
        }

        // try {
        //     // delete doc
        //     fs.unlink(`${doc}`, (err) => {
        //         if (err) {
        //           console.error("Оглавление не было удалено"+ err)
        //         }
        //     })
        //     // files removed
        // } catch(err) {
        //     console.error(err)
        // }

        await news.delete()
            .then(()=> res.status(201).json({message: "Новость удалена"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.patch('/read/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const news = await News.findById(id)


        if(!news){
            return res.status(404).json({message: "Книга с таким id не существует"})
        }

        // try {
        //     // delete doc
        //     fs.unlink(`${doc}`, (err) => {
        //         if (err) {
        //           console.error("Оглавление не было удалено"+ err)
        //         }
        //     })
        //     // delete image
        //     fs.unlink(`${image}`, (err) => {
        //         if (err) {
        //             console.error("Изображение не было удалено"+ err)
        //         }
        //     })
        //     // files removed
        // } catch(err) {
        //     console.error(err)
        // }

        await news.delete()
            .then(()=> res.status(201).json({message: "Книга удалена"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports = router
