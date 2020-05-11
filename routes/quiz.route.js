const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Quiz = require('../models/Quiz')

// /quiz
router.get('/', async (req, res) => {

  try {
    await Quiz.find()
      .then(data => res.json(data[0]))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /quiz
router.post('/', auth, async (req, res) => {

  const { quiz } = req.body

  try {

    const new_quiz = new Quiz({ quiz })

    await new_quiz.save()
      .then(q => res.json({ message: `Опрос ${q.quiz} добавлен` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /quiz
router.patch('/', auth, async (req, res) => {

  const { quiz } = req.body

  try {

    let old = await Quiz.find()
      .catch(err => res.status(400).json({ message: err.message }))

    let oldquiz = old[0]

    oldquiz.quiz = quiz
    await oldquiz.save()
      .then(q => res.json({ message: `Опрос обновлен на ${q.quiz}` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router