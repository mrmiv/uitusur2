const { Router } = require('express')
const { PassThrough } = require('nodemailer/lib/xoauth2')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Feedback = require('../models/Feedback')

/**
 * Получить все отзывы и цитаты сотрудников
 * При параметре type = 1 -- получить отзывы о кафедре
 * При параметре type = 2 -- получить цитаты сотрудников
 * При параметре isActive = true -- получить активные отзывы и цитаты
 */
router.get('/', async (req, res) => {

  const {type, isActive} = req.query
  const query = {}

  try {

    if(type){ query.type = parseInt(type) }
    if(isActive){ query.isActive = Boolean(isActive) }
    
    await Feedback.find(query)
      .then(data => res.json(data))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/item/:id', async (req, res) => {
  const { id } = req.params

  try {
    const feedback = await Feedback.findById(id)
      .catch(err => res.status(400).json({ message: err.message }))

    if (!feedback) {
      return res.status(400).json({ message: "Отзыв с таким id не найден" })
    }

    return res.json(feedback)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /feedback
router.delete('/:id', auth, async (req, res) => {

  const { id } = req.params

  try {

    await Feedback.findByIdAndDelete(id)
      .then(q => res.json({ message: `Отзыв от ${q.name} удален` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /feedback
router.post('/', auth, async (req, res) => {

  const { name, post, degree, text, isActive, type, color } = req.body

  try {

    if (!name) {
      return res.status(400).json({ message: "Введите имя!" })
    }
    if (!text) {
      return res.status(400).json({ message: "Введите отзыв!" })
    }

    const feedback = new Feedback({ name, text, post, degree, isActive, type, color })

    await feedback.save()
      .then(q => res.json({ message: `Отзыв от ${q.name} добавлен` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /feedback
router.patch('/:id', auth, async (req, res) => {

  const { id } = req.params
  const { name, post, degree, text, isActive, type, color } = req.body

  try {

    if (!name) {
      return res.status(400).json({ message: "Введите имя!" })
    }
    if (!text) {
      return res.status(400).json({ message: "Введите отзыв!" })
    }

    await Feedback.findByIdAndUpdate(id, { name, post, degree, text, isActive, type, color })
      .then(q => res.json({ message: `Отзыв от ${q.name} обновлен` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router