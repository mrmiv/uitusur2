const fs = require("fs");

module.exports = (filePath) =>{
  let error

  if(!filePath){
    return error = {message: "Ошибка сервера. Файл не удален. Не найден путь к файлу."}
  }
  
  const path = filePath.substr(1)

  fs.unlink(path, (err) => {
    if (err) { return error = {message: `Файл не был удален. Ошбика: ${err}`} }
  })

  return false
}