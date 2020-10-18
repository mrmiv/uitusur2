const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Param = require('../models/Param')

async function changeOrder(newOrder, oldOrder, paramPage){

  if(newOrder && (newOrder !== oldOrder)){
    if (newOrder > oldOrder){

      await Param.updateMany({
        page: paramPage,
        order: {$lte: newOrder, $gt: oldOrder}
      },{
        $inc: { order: -1 }
      })

    } else if (newOrder < oldOrder){

      await Param.updateMany({
        page: paramPage, 
        order: {$lt: oldOrder, $gte: newOrder}
      }, {
        $inc:{ order: 1 }
      })

    }
  }

}

async function updateOrdersOnPage(page, order, method){

  await Param.updateMany({
    page, 
    order: {$gte: order}
  }, {
    $inc:{ order: method === 'post' ? 1 : -1 }
  })

}

/**
 * @url /api/param/
 * @description Получить все заголовки
 * @param page
 */
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

/**
 * @description Получить все активные заголовки
 * @param page
 */
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

/**
 * @description Получить заголовок по id
 * @param id
 */
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

/**
 * @description Создать заголовок
 */
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

    await updateOrdersOnPage(page, order, 'post')

    await param.save()
      .then(param => res.json({ message: "Заголовок успешно добавлен", param }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

/**
 * @description удалить заголовок по id
 */
router.delete('/:id', auth, async (req, res) => {

  const {id} = req.params

  try {
    const param = await Param.findById(id)

    if (!param) {
      return res.status(404).json({ message: "Заголовок не найден" })
    }

    await updateOrdersOnPage(param.page, param.order, 'delete')

    await param.delete()
      .then(() => res.json({ message: "Заголовок удален" }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @url /api/param/:id
 * @description Изменить порядок или отображение заголовка
 * @param isActive
 * @param order
 */
router.put('/:id', async (req,res) => { 

  const id = req.params.id
  const {order, isActive} = req.body

  try{
    
    if(!order && (isActive === null)){
      return res.status(400).json({message: "Не задан порядок отображения или статус активности. Попробуйте еще раз"})
    } 

    const param = await Param.findById(id)
    
    if (!param) {
      return res.status(404).json({ message: "Заголовок не найден" })
    }

    if((order !== param.order) && order){
      await changeOrder(order, param.order, param.page)
      param.order = order
    }
    
    if((isActive !== param.isActive) && (isActive !== null)){
      param.isActive = isActive
    }

    await param.save()
      .then(param=>res.json({message: `Порядок заголовка "${param.title}" на странице "${param.page}": ${param.order}, статус активности: ${param.isActive? `виден` : `скрыт`}`}))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @description Изменить заголовок
 * @param id
 */
router.patch('/:id', async (req, res) => {

  const {id} = req.params
  const { page, text, title, isActive, order, img } = req.body

  try {

    if (!page){return res.status(400).json({ message: "Поле страница является обязательным" })}
    if (!title){return res.status(400).json({ message: "Поле заголовок является обязательным" })}
    if (!text){return res.status(400).json({ message: "Поле текст является обязательным" })}

    const param = await Param.findById(id)

    if (!param) {
      return res.status(404).json({ message: "Заголовок не найден" })
    }

    const exists = await Param.findOne({title, page})

    if (exists && ((exists.title !== param.title) && (exists.page !== param.page))){
      return res.status(400).json({ message: "Заголовок с таким названием на данной странице уже существует" })
    }

    const isSetNewOrder = (page === param.page) && order && (order !== param.order)
    const isSetNewPage = page && (page !== param.page)

    if(isSetNewOrder){
      await changeOrder(order, param.order, param.page)
      param.order = order
    }

    if(isSetNewPage){
      // Удалить с предыдущей страницы и изменить порядок остальных
      await updateOrdersOnPage(param.page, param.order, 'delete')

      // добавить на новую страницу и изменить порядрк остальных
      await updateOrdersOnPage(page, order, 'post')

      param.order = order 
      param.page = page
    }
    
    param.title = title
    param.text = text
    param.isActive = isActive
    param.img = img ? img : null

    await param.save()
      .then(param => res.json({ message: "Заголовок обновлен" }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
