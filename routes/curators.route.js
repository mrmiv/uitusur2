const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Curator = require('../models/Curator')

/**
 * @url /api/curator
 * @method GET
 * @description Получить всех кураторов
 */
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

/**
 * @url /api/curator/:id
 * @method GET
 * @description Получить куратора по id
 * @param id
 */
router.get('/:id', async (req, res) => {

  const {id} = req.params

  try {

    const curator = await Curator.findById(id)

    if (!curator) {
      return res.status(404).json({ message: "Куратор не найден" })
    }

    return res.json(curator)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @url /api/curator
 * @method POST
 * @description Добавить куратора
 */
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

    const exists = await Curator.findOne({ group })

    if (exists) {
      return res.status(400).json({ message: "Куратор для данной группы уже существует" })
    }

    const curator = new Curator({
      firstname,
      lastname,
      secondname: secondname ? secondname : null,
      staff_url,
      staff_id,
      group
    })

    console.log(curator)

    await curator.save()
      .then(curator => res.json({ message: `Куратор ${curator.lastname} ${curator.firstname} успешно добавлен для группы ${curator.group}` }))
      .catch(err => res.status(400).json({ message: err.message }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @url /api/curator/:id
 * @method DELETE
 * @param id
 * @description Удалить куратора по id 
 */
router.delete('/:id', auth, async (req, res) => {

  const id = req.params.id

  try {
    const curator = await Curator.findById(id)

    if (!curator) {
      return res.status(404).json({ message: "Куратор не найден" })
    }

    await curator.delete()
      .then(() => res.json({ message: "Куратор удален" }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * @url /api/curator/:id
 * @method PATCH
 * @param id
 * @description Редактировать куратора по id 
 */
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

    curator.firstname = firstname
    curator.lastname = lastname
    curator.secondname = secondname ? secondname : null
    curator.staff_url = staff_url
    curator.group = group
    curator.staff_id = staff_id

    await curator.save()
      .then(curator => res.json({ message: `Куратор для группы ${curator.group} обновлен на ${curator.lastname} ${curator.firstname}` }))

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
