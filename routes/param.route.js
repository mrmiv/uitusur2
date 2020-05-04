const { Router } = require('express')
const router = Router()
// const authStaff = require('../middleware/middleware.auth.Param')

const Param = require('../models/Param')

// /param
router.get('/', async (req, res) => {

  const page = req.query.page

  try {
    await Param.find(page ? { page } : null)
      .then(data => res.json(data))
      .catch(err => res.status(400).json({ message: err.message }))

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
      return res.status(404).json({ message: "Текст не найден" })
    }
    res.json(param)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// param/
router.post('/', async (req, res) => {

  const {
    page,
    title,
    text
  } = req.body

  try {

    const param = new Param({ title, page, text })

    const exists = await Param.findOne({ page, title })
    // console.log(exists);

    if (exists) {
      return res.status(400).json({ message: "Текст уже существует" })
    }

    try {
      await param.save()
        .then(param => res.status(201).json({ message: "Текст успешно добавлен", param }))
        .catch(err => res.status(400).json({ message: err.message }))
    } catch (error) {
      error instanceof Error.ValidationError
      return res.status(400).json({
        message: "Проверьте введенные данные",
        errors: error.message
      })
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// param/:id
router.delete('/:id', async (req, res) => {

  const id = req.params.id

  try {
    const param = await Param.findById(id)

    if (!param) {
      return res.status(404).json({ message: "Текст не найден" })
    }
    await param.delete()
      .then(() => res.status(201).json({ message: "Текст удален" }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id', async (req, res) => {

  const id = req.params.id
  const { page, text, title } = req.body

  try {
    const param = await Param.findById(id)

    if (!param) {
      return res.status(404).json({ message: "Текст не найден" })
    }

    if (title) { param.title = title }
    if (text) { param.text = text }
    if (page) { param.page = page }

    await param.save()
      .then(param => res.json({ message: "Текст обновлен", param }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
