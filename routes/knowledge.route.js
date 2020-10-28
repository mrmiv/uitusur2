const {Router} = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')
const deleteFile = require('../middleware/middleware.deleteFile')
const multipleFileUpload = require('../middleware/middleware.multipleFileUpload')
const Knowledge = require('../models/Knowledge')

/**
 * @url /api/knowledge/
 * @method GET
 * @description получить всю базу знаний
 */
router.get('/', async (req, res) => {
  try {
    await Knowledge.find()
      .sort([['title',1], ['marks', 1]])
      .then(data => res.json(data))
      .catch(err => res.status(400).json({message: err.message}))
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * @url /api/knowledge/:id
 * @method GET
 * @description получить знания по id
 * @param id
 */
router.get('/:id', async (req, res) => {

  const {id} = req.params

  try {
    const knowledge = await Knowledge.findById(id)

    if(!knowledge){
      return res.status(404).json({message: "Знания не найдены"})
    }

    return res.json(knowledge)

  } catch (error) {
   res.status(500).json({message:error.message})
  }
})

/**
 * @url /api/knowledge/
 * @method POST
 * @description добавить знания
 */
router.post('/', [auth, multipleFileUpload], async (req, res) => {

  const {
      title,
      type,
      description,
      marks,
      links
  } = req.body

  try {

    if(!title){return res.status(400).json({message: "Поле название является обязательным"})}
    if(!type){return res.status(400).json({message: "Поле тип является обязательным"})}
    if(!marks){return res.status(400).json({message: "Поле метки является обязательным"})}
    if(!links || links.length === 0){return res.status(400).json({message: "Поле ссылки является обязательным и должно содержать хотя бы одну ссылку"})}

    const image = req.filesURLs[0]

    if(!image){return res.status(400).json({message: "Поле изображение является обязательным"})}

    const exists = await Knowledge.findOne({title})

    if (exists){
      return res.status(400).json({message: "Знания с такимы названием уже существует"})
    }

    const knowledge = new Knowledge({
      title,
      description,
      links,
      marks,
      type
    })

    knowledge.image = image.path

    await knowledge.save()
      .then(knowledge => res.json({message: `${knowledge.type} "${knowledge.title}" успешно добавлен`}) )
      .catch(err => res.status(400).json({message: err.message}))

  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * @url /api/knowledge/:id
 * @method DELETE
 * @description удалить знания по id
 * @param id
 */
router.delete('/:id', auth, async (req, res) => {

  const {id} = req.params
  
  try {
    const knowledge = await Knowledge.findById(id)

    if(!knowledge){return res.status(404).json({message: "Знания не найдены"})}

    const errors = []
    const deleted = deleteFile(knowledge.image)
    if (deleted.message){
      return errors.push(deleted.message)
  }

    await knowledge.delete()
      .then( knowledge => res.json({message: `${knowledge.type} "${knowledge.title}" удален. ${errors.length !== 0 ? errors.map(err => err) : ''}`}))

  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * @url /knowledge/:id
 * @method PATCH
 * @description обновить знание
 * @param id
 */
router.patch('/:id', [auth, multipleFileUpload], async (req, res) => {

  const {id} = req.params
  const body = req.body

  try {

    if(!title){return res.status(400).json({message: "Поле название является обязательным"})}
    if(!type){return res.status(400).json({message: "Поле тип является обязательным"})}
    if(!marks){return res.status(400).json({message: "Поле метки является обязательным"})}
    if(!links || links.length === 0){return res.status(400).json({message: "Поле ссылки является обязательным и должно содержать хотя бы одну ссылку"})}

    const knowledge = await Knowledge.findById(id)

    if(!knowledge){
      return res.status(404).json({message: "Знания не найдены"})
    }

    const image = req.filesURLs[0]
    const errors = []

    if(image){
      const deleted = deleteFile(knowledge.image)
      if (deleted.message){
          return errors.push(deleted.message)
      }
      knowledge.image = image.path
    }

    knowledge.title = body.title
    knowledge.links = body.links
    knowledge.marks = body.marks
    knowledge.description = body.description

    await knowledge.save()
      .then( knowledge => res.json({message: `${knowledge.type} "${knowledge.title}" обновлен. ${errors.length === 0 ? '' : errors.map( err => err.message)}`}))

  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

module.exports = router
