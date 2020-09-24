const {Router} = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')
const NewsLink = require('../models/NewsLink')

/**
 * Получить список всех ссылок
 * возможные параметры: 1, 2, 3 соответствуют типу новостей
 */
router.get('/', async (req, res) => {
    
  const {type} = req.query

  let query = {}

  if (type && (type === 1 || 2 || 3)){
    query.type = type
  }

  try {
    await NewsLink.find(query)
      .sort([['type',1],['name',1]])
      .then(data => res.json(data))
      .catch(err => res.status(400).json({message: err.message}))

  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * Получить полезную ссылку по id
 */
router.get('/:id', auth, async(req, res) => {
  
  const {id} = req.params

  if (!id){
    return res.status(400).json({message: `Параметр id является обязательным!`})
  }

  try {

    await NewsLink.findById(id)
      .then(data => res.json(data))
      .catch(err => res.status(400).json({message: err.message}))
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }

})

/** 
 * Добавить новую ссылку для новостей
 */
router.post('/',auth, async (req, res) => {
    
  const {name, path, type} = req.body

  try {

    const newsLink = new NewsLink({name, path, type})

    await newsLink.save()
      .then(newslink => res.json({message: `Полезная ссылка ${newslink.name} добавлена`}))
      .catch(err => res.status(400).json({message: err.message}))
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * Удалить полезную ссылку по id
 */
router.delete('/:id', auth, async (req, res) => {

  const {id} = req.params
  
  if(!id){
    return res.status(400).json({message: `Параметр id является обязательным!`})
  }

  try {
    const newsLink = await NewsLink.findById(id)

    await newsLink.delete()
      .then(newslink => res.json({message: `Полезная ссылка ${newslink.name} удалена.`}))
      .catch(err => res.status(400).json({message: `Полезная ссылка не удалена. ${err.message}`}))

  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * Обновить полезную ссылку по id 
 */
router.patch('/:id', auth, async (req, res) => {

  const {id} = req.params
  const{ name, path, type } = req.body
  
  if(!id){
    return res.status(400).json({message: `Параметр id является обязательным!`})
  }

  try {

    await NewsLink.findByIdAndUpdate(id, {name, path, type})
      .then(newslink => res.json({message: `Полезная ссылка ${newslink.name} обновлена.`}))
      .catch(err => res.status(400).json({message: `Полезная ссылка не обновлена. ${err.message}`}))

  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

module.exports = router
