const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Feedback = require('../models/Feedback')

// /feedback
router.get('/', async (req, res) => {

  try {
    await Feedback.find()
      .then(data => res.json(data))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
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

  const { name, post, degree, text } = req.body

  try {

    if (!name) {
      return res.status(400).json({ message: "Введите имя!" })
    }
    if (!text) {
      return res.status(400).json({ message: "Введите отзыв!" })
    }

    const feedback = new Feedback({ name, text, post, degree })


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
  const { name, post, degree, text } = req.body

  try {

    if (!name) {
      return res.status(400).json({ message: "Введите имя!" })
    }
    if (!text) {
      return res.status(400).json({ message: "Введите отзыв!" })
    }

    await Feedback.findByIdAndUpdate(id, { name, post, degree, text })
      .then(q => res.json({ message: `Отзыв от ${q.name} обновлен` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router