
module.exports = (req, res, next) =>{
  try {

    if(!req.files){
      return res.status(400).json({message: "Вы не прикрепили файл"})
    }

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    const filePaths = ["other", "other/clubs", "literature", "literature/images", "news", "docs"]

    const { filePath } = req.body
    
    if((!filePath in filePaths)){
      return res.status(400).json({message: "Некорректно указан путь файла. Попробуйте еще раз"})
    }

    const { file } = req.files

    if(!file){
      return res.status(500).json({message: "Ошибка сервера. Не найден прикрепленный файл."})
    }

    const path = `uploads/${filePath}/${`${s4()}-${s4()}`}-${file.name}` 

    file.mv(path, function (err) {
      if (err) {
        return res.status(500).json(`Ошибка при прикреплении документа ${file.name}: ${err}`)
      }
    })

    req.fileURL = {
      name: file.name,
      path: `/${path}`
    }

    next()

  } catch (error) {
      res.status(500).json({message: error.message})
  }
}