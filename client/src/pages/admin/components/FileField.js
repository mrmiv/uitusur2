import React, { Fragment, PureComponent } from 'react'
import Files from "react-butterfiles";
import { slugify } from 'transliteration';

import { Icon } from '@iconify/react';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';

export class FileField extends PureComponent{

  state = {
    oldFiles: [],
    files: [],
    errors: []
  }

  componentDidUpdate(prevProps, prevState){
    const {files, oldFiles} = this.state
    const {props} = this

    if (props.files && (props.files !== oldFiles)){
      this.setState({oldFiles: props.files})
    }

    if ((files !== prevState.files) && (files !== props.files)){
      this.props.handleParentFiles(files)
    }
  }

  handleFiles = files => {
    this.setState(state => {return {files: [...state.files, ...files.map( file => file.src.file)], errors: []}})
  }

  deleteFile = file => {
    this.setState(state => { return {files: state.files.filter( f => f !== file ), errors: []}})
  }

  hideError = error => {
    this.setState(state => { return {errors: state.errors.filter( e => e !== error )}})
  }

  sendDeleteFile = file => {
    this.props.deleteOldFile(file)
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
    const {oldFiles} = this.state

    return <Fragment>
      <Files
        name={name}
        id={id}
        multiple={multiple}
        maxSize="15mb"
        multipleMaxSize="15mb"
        multipleMaxCount={10}
        accept={accept || ["application/pdf", "image/jpg","image/jpeg"]}
        onSuccess={files => this.handleFiles(files)}
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
                {oldFiles && oldFiles.map((file, index) => (<div className="file-item old-file-item d-flex justify-content-between align-items-center">
                  <li key={file.name || `Неопознанный документ ${index + 1}`}> {file.name || `Неопознанный документ ${index + 1}`} </li>
                  <a className="btn btn-danger" style={{borderRadius: "8px"}} title="Удалить файл" onClick={(() => this.sendDeleteFile(file))}><Icon color="white" inline icon={trashAlt}/></a>
                </div>
                ))}
                {this.state.files.map((file, index) => (
                  <div className="file-item d-flex justify-content-between align-items-center">
                    <li key={file.name || `Неопознанный документ ${index + 1}`}> {file.name || `Неопознанный документ ${index + 1}`} </li>
                    <a className="btn btn-danger" style={{borderRadius: "8px"}} title="Удалить файл" onClick={(() => this.deleteFile(file))}><Icon color="white" inline icon={trashAlt}/></a>
                  </div>
                ))}
                {this.state.errors.map(error => (
                  <li title="Нажмите, чтобы скрыть ошибку" style={{cursor: "pointer"}} onClick={() => this.hideError(error)} className="file-item file-error" key={error.id}>
                    {error.file ? <span> {error.file.name} - {error.type}</span> : error.type}
                  </li>
                ))}
              </ol>
            </div>
            <div className="d-flex align-items-center mt-2">Или нажмите <a className="more-link" 
              style={{background: "#26358c", color: "white", padding: "4px 8px", margin: "0 4px" }} 
              onClick={browseFiles}> на эту кнопку </a> чтобы выбрать файлы.</div>
          </div>
        }}
      </Files>
    </Fragment>
  }
}