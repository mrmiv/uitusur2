const { Router } = require("express");
const router = Router();
const fs = require("fs");
const auth = require("../middleware/middleware.auth")
const dbFile = require('../models/dbFile')

router.get("/", async (req, res) => {

  try {

    await dbFile.find()
      .then(data => res.json(data))

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

router.post("/", auth, async (req, res) => {

  try {
    if (req.files) {
      const doc = req.files.file;
      // console.log(doc);
      const file = new dbFile({ name: doc.name })
      doc.mv(`uploads/other/${file._id}_${doc.name}`, function (err) {
        if (err) {
          return res
            .status(500)
            .json(`Ошибка при прикреплении документа ${doc.name}: ` + err);
        }
        // console.log(doc.name + " uploaded");
      });
      file.file = `/uploads/other/${file.id}_${doc.name}`
      file.save()
        .then(q => res.json({ message: `Файл ${q.name} добавлен. Ссылка: ${q.file}` }))
    } else {
      return res.status(400).json({ message: "Вы не прикрпепили файл" })
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {

  const { id } = req.params

  try {

    const file = await dbFile.findById(id)

    if (!file) {
      return res.status(404).json({ message: `Файл с id ${id} не найден` })
    }

    fs.unlink(`${file.file.substr(1)}`, (err) => {
      if (err) {
        return res.status(400).json({ message: "Файл не удален. " + err })
      }
    })

    await file.delete()
      .then(q => res.json({ message: `Файл ${q.name} удален.` }))

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
