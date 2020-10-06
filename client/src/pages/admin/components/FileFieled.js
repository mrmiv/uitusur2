import React, { Fragment, PureComponent } from 'react'
import Files from "react-butterfiles";

export class FileField extends PureComponent{

  state = {
    files: [],
    errors: []
  }

  handleFiles = e => {
    this.setState({errors: []})
    this.props.handleParentFiles(e)
  }

  onError = errors => {

    function returnErrorDescription(type) {
      switch (type) {
        case "unsupportedFileType":
          return "Неподдерживаемый тип файла!"
        case "maxSizeExceeded":
          return "Максимальный размер прикрепляемого файла не должен превышать 15 Мб!"
        case "multipleMaxCountExceeded":
          return "Допускается не больше четырех вложений одновременно!"
        case "multipleMaxSizeExceeded":
          return "Максимальный размер всех прикрепляемых файлов не должен превышать 15 Мб!"
        case "multipleNotAllowed":
          return "Можно прикрепить только один файл!"
        default:
          return "Что-то пошло не так!"
      }
    }

    this.setState({errors: errors.map( err => {
      err.type = returnErrorDescription(err.type)
      return err
    })})

  }

  render(){

    const {label, id, name, accept, multiple} = this.props

    return <Fragment>
      <Files
        onChange={this.handleFiles}
        name={name}
        id={id}
        multiple={true}
        maxSize="15mb"
        multipleMaxSize="15mb"
        multipleMaxCount={4}
        accept={accept || ["application/pdf", "image/jpg","image/jpeg"]}
        onSuccess={files => this.setState({files})}
        onError={errors => this.onError(errors)}
      >
        {({browseFiles, getDropZoneProps}) => {
          return <div>
            <label>{`Перетащите ${label || "файлы"} сюда`}</label>
            <div
              {...getDropZoneProps({
                style: {
                  width: "100%",
                  minHeight: 200,
                  border: "2px lightgray dashed"
                }
              })}
            >
              <ol className="files-list">
                {this.state.files.map(file => (
                  <li className="file-item" key={file.name}>{file.name}</li>
                ))}
                {this.state.errors.map(error => (
                  <li className="file-item file-error" key={error.id}>
                    {error.file ? <span> {error.file.name} - {error.type}</span> : error.type}
                  </li>
                ))}
              </ol>
            </div>
            <div className="d-flex align-items-center mt-2">Или нажмите <button className="more-link" 
              style={{background: "#26358c", color: "white", padding: "4px 8px", margin: "0 4px" }} 
              onClick={browseFiles}> на эту кнопку </button> чтобы выбрать файлы.</div>
          </div>
        }}
      </Files>
    </Fragment>
  }
}