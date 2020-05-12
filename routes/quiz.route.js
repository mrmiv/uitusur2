const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Quiz = require('../models/Quiz')

// /quiz
router.get('/', async (req, res) => {

  try {
    await Quiz.find()
      .then(data => res.json(data[0].quiz))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /quiz
router.delete('/', auth, async (req, res) => {

  // const { quiz } = req.body

  try {

    const quiz = await Quiz.find()
      .catch(err => res.status(400).json({ message: err.message }))

    await quiz[0].delete()
      .then(q => res.json({ message: `Опрос ${q.quiz} удален` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /quiz
router.post('/', auth, async (req, res) => {

  const { quiz } = req.body

  try {

    if (!quiz) {
      return res.status(400).json({ message: "Введите опрос!" })
    }

    let old = await Quiz.find()
      .catch(err => res.status(400).json({ message: err.message }))

    let newquiz;

    if (old.length !== 0) {
      // console.log(old);
      newquiz = old[0]
      newquiz.quiz = quiz
    } else {
      newquiz = new Quiz({ quiz })
    }

    await newquiz.save()
      .then(q => res.json({ message: `Опрос обновлен на ${q.quiz}` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router