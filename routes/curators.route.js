const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Curator = require('../models/Curator')

// /curator
router.get('/', async (req, res) => {

  try {
    await Curator.find()
      .sort([['group', 1], ['lastname', 1], ['firstname', 1]])
      .then(data => res.json(data))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// /curator/:id
router.get('/:id', async (req, res) => {

  const id = req.params.id

  try {

    const curator = await Curator.findById(id)

    if (!curator) {
      return res.status(404).json({ message: "Куратор не найден" })
    }

    res.json(curator)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// curator/
router.post('/', auth, async (req, res) => {

  const {
    firstname,
    lastname,
    secondname,
    staff_url,
    group,
    staff_id
  } = req.body

  try {

    const curator = new Curator({
      firstname,
      lastname,
      secondname,
      staff_url,
      staff_id,
      group
    })

    const exists = await Curator.findOne({ group })

    if (exists) {
      return res.status(400).json({ message: "Куратор для данной группы уже существует" })
    }

    await curator.save()
      .then(curator => res.json({ message: `Куратор ${curator.lastname} ${curator.firstname} успешно добавлен для группы ${curator.group}`, curator }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// curator/:id
router.delete('/:id', auth, async (req, res) => {

  const id = req.params.id

  try {
    const curator = await Curator.findById(id)


    if (!curator) {
      return res.status(404).json({ message: "Куратор не найден" })
    }

    await curator.delete()
      .then(() => res.status(201).json({ message: "Куратор удален" }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id', auth, async (req, res) => {

  const id = req.params.id
  const { firstname,
    lastname,
    secondname,
    staff_url,
    group,
    staff_id } = req.body

  try {
    const curator = await Curator.findById(id)

    if (!curator) {
      return res.status(404).json({ message: "Куратор не найден" })
    }

    // console.log(body, body.rank);


    if (firstname) { curator.firstname = firstname }
    if (lastname) { curator.lastname = lastname }
    if (secondname) { curator.secondname = secondname }
    if (staff_url) { curator.staff_url = staff_url }
    if (group) { curator.group = group }
    if (staff_id) { curator.staff_id = staff_id }

    await curator.save()
      .then(curator => res.json({ message: `Куратор для группы ${curator.group} обновлен на ${curator.lastname} ${curator.firstname}`, curator }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
