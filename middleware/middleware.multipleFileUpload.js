
module.exports = (req, res, next) =>{
  try {
      
    const { filepath } = req.headers

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    function fileMove(path, file){
      file.mv(path, function (err) {
        if (err) {return res.status(500).json(`Ошибка при прикреплении документа ${file.name}: ${err}`)}
      })

      filesURLs.push({
        name: file.name,
        path: `/${path}`
      })
    }

    if(!req.files){
      req.filesURLs = []
      next()
      return
    }

    const files = Object.values(req.files)

    const filePaths = ["other", "other/clubs", "literature", "literature/images", "news", "docs", "knowledge"]

    if(!filePaths.find(path => path === filepath)){
      return res.status(400).json({message: "Некорректно указан путь файла. Попробуйте еще раз"})
    }

    let filesURLs = []

    files.forEach(file => {
      const path = `uploads/${filepath}/${`${s4()}-${s4()}`}-${file.name}`
      fileMove(path, file)
    })

    req.filesURLs = filesURLs
    next()

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}