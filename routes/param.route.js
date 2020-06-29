const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Param = require('../models/Param')

// /param
router.get('/', async (req, res) => {

  const page = req.query.page

  try {
    await Param.find(page ? { page } : null)
    .sort([["page",1],["order",1]])
      .then(data => res.json(data))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/active', async(req,res)=>{
  
  const page = req.query.page
  let query = {isActive: true}
  try {
    
    if(page){
      if(page.trim()){
        query.page = page
      }
    }

    await Param.find(query)
    .sort([["page",1],["order",1]])
      .then(data => res.json(data))
      .catch(err => res.status(400).json({message: err.message}))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /param/:id
router.get('/:id', async (req, res) => {

  const id = req.params.id

  try {

    const param = await Param.findById(id)

    if (!param) {
      return res.status(404).json({ message: "Заголовок не найден" })
    }
    res.json(param)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// param/
router.post('/', auth, async (req, res) => {

  const {
    page,
    title,
    text,
    isActive,
    order,
    img
  } = req.body

  try {

    const exists = await Param.findOne({ page, title })

    if (exists) {
      return res.status(400).json({ message: "Заголовок уже существует. Измените название или страницу." })
    }

    const param = new Param({ title, page, text, isActive, order, img })

    // console.log(exists);

    await param.save()
        .then(param => res.json({ message: "Заголовок успешно добавлен", param }))
        .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// param/:id
router.delete('/:id', auth, async (req, res) => {

  const id = req.params.id

  try {
    const param = await Param.findById(id)

    if (!param) {
      return res.status(404).json({ message: "Заголовок не найден" })
    }
    await param.delete()
      .then(() => res.json({ message: "Заголовок удален" }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', async(req,res)=>{ // only for changing order
  const id = req.params.id
  const {order, isActive} = req.body
  try{
    console.log(order, isActive);
    
    if(!order && (isActive===undefined)){
      return res.status(422).json({message: "Не задан порядок отображения или статус активности. Попробуйте еще раз"})
    } 

    const param = await Param.findById(id)

    const order_length = await Param.find({page: param.page}).countDocuments()

    if (order > order_length) {
      return res.status(422).json({message: `Порядок отображения должен быть меньше или равен ${order_length} для данной страницы`})
    }

    if (!param) {
      return res.status(404).json({ message: "Заголовок не найден" })
    }

    // const result = await Param.find({page: param.page, order:{$gte: param.order, $lt:order}})
    // const result_2 = await Param.find({page: param.page, order:{$gt: order, $lte:param.order}})

    // console.log(result, result_2);
    

    if(order){
      if (order !== param.order){
        if (order > param.order){
          await Param.updateMany({
            page: param.page,
            order: {$lte: order, $gte: param.order}
          },{
            $inc: { order: -1}
          })
        } else if (order < param.order){
          await Param.updateMany({
            page: param.page, 
            order: {$lte: param.order, $gte: order}
          }, {
            $inc:{ order: 1}
          })
        }
      }
  
      param.order = order
    }

    if((isActive !== param.isActive) && isActive!==undefined){
      param.isActive = isActive
    }

    await param.save()
      .then(param=>res.json({message: `Порядок заголовка ${param.title} на странице ${param.page}: ${param.order}, статус активности: ${param.isActive? `виден` : `скрыт`}`}))

    // things

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id', async (req, res) => {

  const id = req.params.id
  const { page, text, title, isActive, order, img } = req.body

  try {
    const param = await Param.findById(id)

    if (!param) {
      return res.status(404).json({ message: "Заголовок не найден" })
    }

    if (title || page){
      // check already exist by page (new\old page) and title (new\old title)
      const exists = await Param.findOne({
        title: title !== param.title? title : '',
        page: page!==param.page? page : ''
      })
      if (exists){
        return res.status(404).json({ message: "Заголовок с таким названием на введенной странице уже существует" })
      }
    }

    if (page && page !== param.page) { param.page = page }
    if (title && title !== param.title) { param.title = title}
    if (text && text !== param.text) { param.text = text }
    if (isActive && isActive!== param.isActive) { param.isActive = isActive }

    if (img) { 
      param.img = img 
    } else {
      // delete img prop 
      param.img = null 
    }

    if (order && order !== param.order) {       

      if (order > param.order){
        await Param.updateMany({
          page: param.page,
          order: {$lte: order, $gte: param.order}
        },{
          $inc: { order: -1}
        })
      } else if (order < param.order){
        await Param.updateMany({
          page: param.page, 
          order: {$lte: param.order, $gte: order}
        }, {
          $inc:{ order: 1}
        })
      }
  
      param.order = order  
      // and other thing to change
    }

    await param.save()
      .then(param => res.json({ message: "Заголовок обновлен", param }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
