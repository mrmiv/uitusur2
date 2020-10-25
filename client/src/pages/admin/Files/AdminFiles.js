import React, { Fragment, Component } from 'react'
import { getfiles, delfile } from '../../../redux/actions/filesActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { connect } from 'react-redux'
import { Icon } from '@iconify/react';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import copyIcon from '@iconify/icons-fa-solid/copy';

export class AdminFiles extends Component {

  state = {
    msg: null
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.getfiles()
  }

  delfile = id => {
    const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
    if(areYouSure){
      window.scrollTo(0, 0)
      this.props.clearInfo()
      this.props.delfile(id)

    } else {
      console.log('Элемент не удален')
    }
  }

  copyPath = path => {
    const {domain} = this.props
    navigator.clipboard.writeText(`https://${domain}${path}`)
      .then(()=> alert("Ссылка скопирована"))
  }

  render() {

    const { files, domain, isLoading } = this.props

    return (<Fragment>
      {!isLoading ?
        (files && files.length !== 0) ? 
        <table class="table table-hover table-bordered table-sm mt-3">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Ссылка</th>
              <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={copyIcon} /></th>
              <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
            </tr>
          </thead>
          <tbody>
              {files.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td name="name">{item.name}</td>
                    <td name="link"><a href={`https://${domain}${item.file}`} target="_blank" rel="noopener noreferrer">{item.file}</a></td>
                    <td name="copy"><button title="Копировать ссылку" className="btn" onClick={()=>this.copyPath(item.file)}><Icon icon={copyIcon} color="blue" /></button></td>
                    <td name="del">
                      <button title="Удалить" className="btn" onClick={() => this.delfile(item._id)}><Icon icon={trashAlt} color="red"/></button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        : <p>Нет загруженных файлов</p>
      : <p>Загрузка</p>}
    </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.api.files.isLoading,
  files: state.api.files.files,
  info: state.info,
  domain: state.location.domain
})

export default connect(
  mapStateToProps,
  {
    getfiles,
    delfile,
    clearInfo
  }
)(AdminFiles)