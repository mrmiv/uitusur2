const { Router } = require("express");
const router = Router();
const fs = require("fs");
const auth = require("../middleware/middleware.auth");
const deleteFile = require("../middleware/middleware.deleteFile");
const fileUpload = require("../middleware/middleware.fileUpload");
const multipleFileUpload = require("../middleware/middleware.multipleFileUpload");
const dbFile = require('../models/dbFile')

router.get("/", auth, async (req, res) => {

  try {

    await dbFile.find()
      .sort([['created', -1], ['name',1]])
      .then(data => res.json(data))

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

router.post("/", [auth, fileUpload], async (req, res) => {

  try {
    const { name, path } = req.fileURL 
    
    const file = new dbFile({ name, file: path })
    await file.save()
      .then( savedFile => res.json({message: `Файл ${savedFile.name} добавлен`, file: savedFile}) )

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @params filePath, file (папка, в которую сохранить файл, файл)
 * @return Object (Путь к сохраненному файлу и его название)
 */
router.post("/upload-file", [auth, fileUpload], async (req, res) => {
  try {
    
    res.json({message: "Файл успешно загружен", file: req.fileURL})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

/**
 * @params filePath, files (папка, в которую сохранить файлы, файлы)
 * @return Array of Objects (Массив с путями файлов и их названиями)
 */
// router.post("/upload-files", [auth, multipleFileUpload], async (req, res) => {
//   try {
    
//     res.json({message: "Файлы успешно загружены", files: req.filesURLs})

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

/**
 * @description Удалить ссылку на файл из бд
 */
router.delete("/:id", auth, async (req, res) => {

  const { id } = req.params

  try {

    const file = await dbFile.findById(id)

    if (!file) {
      return res.status(404).json({ message: `Файл с id ${id} не найден` })
    }

    await deleteFile(res, file.file)

    await file.delete()
      .then(q => res.json({ message: `Файл ${q.name} удален.`, file: q }))

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/", auth, async (req, res) => {
  
  const {filePath} = req.body

  try {
    
    if(!filePath){
      return res.status(400).json({message: "Путь для удаления не найден"})
    }

    await deleteFile(res, filePath)

    return res.json({message: "Файл удален"})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


module.exports = router;
