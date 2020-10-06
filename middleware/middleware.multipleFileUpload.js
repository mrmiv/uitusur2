const fs = require("fs");

module.exports = (req, res, next) =>{
  try {
      
    const { filePath } = req.body

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    if(!req.files){
      return res.status(400).json({message: "Вы не прикрепили файл"})
    }

    const {files} = req.files

    const filePaths = ["other", "other/clubs", "literature", "literature/images", "news", "docs"]

    if(!filePaths.find(path => path === filePath)){
      return res.status(400).json({message: "Некорректно указан путь файла. Попробуйте еще раз"})
    }

    let filesURLs = []

    files.forEach(file => {
  
      const path = `uploads/${filePath}/${`${s4()}-${s4()}`}-${file.name}`
  
      file.mv(path, function (err) {
        if (err) {return res.status(500).json(`Ошибка при прикреплении документа ${file.name}: ${err}`)}
      })

      filesURLs.push({
        name: file.name,
        path: `/${path}`
      })

    })

    req.filesURLs = filesURLs

    next()

  } catch (error) {
      res.status(500).json({message: error.message})
  }
}