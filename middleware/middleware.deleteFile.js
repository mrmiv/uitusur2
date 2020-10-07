const fs = require("fs");

module.exports = (res, filePath) =>{
  try {

    if(!filePath){
      return res.status(400).json({message: "Ошибка сервера. Файл не удален. Не найден путь к файлу."})
    }

    const filePaths = ["other", "other/clubs", "literature", "literature/images", "news", "docs"]
    
    if((!filePath in filePaths)){
      return res.status(400).json({message: "Ошибка сервера. Некорректно указан путь файла. Попробуйте еще раз."})
    }
    
    const path = filePath.substr(1) 

    fs.unlink(path, (err) => {
      if (err) { return res.status(400).json({message: `Файл не был удален. Ошбика: ${err}`})}
    })

  } catch (error) {
      res.status(500).json({message: error.message})
  }
}