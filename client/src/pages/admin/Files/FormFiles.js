import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { postfile } from '../../../redux/actions/filesActions'
import { FileField } from '../components/FileField';
import { MessageAlert } from '../components/MessageAlert';
 
export class FormFiles extends Component {

  state = {
    file: null,
    msg: null
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  handeFile = files => {
    this.setState({ file: files[0] })
  }

  postfile = e => {
    e.preventDefault()
    this.props.clearInfo()
    const { file } = this.state
    this.props.postfile(file)
  }

  render() {
    const { isLoading } = this.props
    const { msg, file } = this.state

    const disabled = isLoading || !file

    return (
      <div className="w-100 mt-3">
        <MessageAlert msg={msg} id={this.props.info.id}/>
        <FileField handleParentFiles={this.handeFile} id="files" name="files-input" multiple={false}/>
        <button disabled={disabled} className={`d-block mx-auto more-link ${disabled ? 'disabled' : ''}`}
          onClick={this.postfile}
          style={{backgroundColor: "green", color: "white"}}>
          Подтвердить загрузку файлов
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.api.files.isLoading,
  info: state.info
})

export default connect(
  mapStateToProps,
  {
    postfile,
    clearInfo
  }
)(FormFiles)