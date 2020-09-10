const { Router } = require('express')
const router = Router()
const auth = require('../middleware/middleware.auth')

const Staff = require('../models/Staff')
const Literature = require('../models/Literature')
const Param = require('../models/Param')
const Clubs = require('../models/Clubs')
const News = require('../models/News')
const Doc = require('../models/Doc')

router.post('/', async (req, res) => {

  const { query } = req.body
  
  try {

    if (!query) {
      return res.status(400).json({ message: "Вы ничего не ввели в поисковой запрос!" })
    }

    const q = { $regex: `.*${query.length < 5 ? query : query.substr(0, query.length-3)}.*`, $options: 'i' }

    const staffData      = await Staff.find({$or:[{firstname: q}, { lastname: q }, { secondname: q }, { post: q }]})
      .select([
        'firstname',
        'lastname',
        'secondname'])
    const literatureData = await Literature.find({$or: [{description: q}, {title: q}, {category: q}, {author: q}]})
      .select([
        'title',
        'author',
        'category',
        'image'])
    const clubData       = await Clubs.find({name: q})
    const newsData       = await News.find({$or: [{title: q}, {annotation: q}, {body: 'q'}]})
      .select([
        "title",
        "translit_title",
        "annotation",
        "created_at",
        "pin",
        "city",
        "period",
        "deadline",
        "users",
      ])
      .limit(6)
    const docData        = await Doc.find({$or: [{title: q}, {category: q}, {subcategory: q}]})
    const paramData      = await Param.find({text: q, isActive: true})
      .select(['page'])

    return res.json({
      staffData,
      literatureData,
      clubData,
      newsData,
      docData,
      paramData
    })
    

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router