import React, { Fragment, Component } from 'react'
import { getfiles, delfile } from '../../../redux/actions/filesActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { connect } from 'react-redux'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'


export class AdminFiles extends Component {

  state = {
    msg: null
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.getfiles()
  }

  delfile = id => {
    this.props.delfile(id)
    setTimeout(() => {
      this.props.getfiles()
    }, 200)
  }

  render() {

    const { files } = this.props

    return (<Fragment>
      <table class="table table-hover mt-3">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Ссылка</th>
            <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={faTrashAlt} /></th>
            {/* style={{width="50px"}} */}
          </tr>
        </thead>
        <tbody>
          {files ?
            files.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td name="name">{item.name}</td>
                  <td name="link">{item.file}</td>
                  <td name="del">
                    <button type="button" className="btn" onClick={() => this.delfile(item._id)}><Icon icon={faTrashAlt} /></button>
                  </td>
                </tr>
              )
            })
            : <p>loading</p>}
        </tbody>
      </table>
    </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.api.files.isLoading,
  files: state.api.files.files,
  info: state.info
})

export default connect(
  mapStateToProps,
  {
    getfiles,
    delfile,
    clearInfo
  }
)(AdminFiles)