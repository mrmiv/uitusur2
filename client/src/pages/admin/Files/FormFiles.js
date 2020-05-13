import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { postfile } from '../../../redux/actions/filesActions'
import CyrillicToTranslit from "cyrillic-to-translit-js";

export class FormFiles extends Component {

  state = {
    file: null,
    msg: null,
    active: false
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  handeFile = (e) => {
    let file = e.target.files[0];
    Object.defineProperty(file, "name", {
      writable: true,
      value: CyrillicToTranslit().transform(file["name"], "_"),
    });
    this.setState({ file });
  };

  postfile = e => {
    e.preventDefault()
    this.props.clearInfo()
    const { file } = this.state
    // console.log(file);
    this.props.postfile(file)
  }

  render() {
    const { isLoading } = this.props
    const { msg, active } = this.state

    return (
      <div className="w-100 mt-3">
        {msg ?
          <div className={`alert 
        ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
        ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
            {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
            {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
            {msg.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}
        {active ? <form onSubmit={this.postfile} className="pt-2">
          <div className="form-row">
            <div className="col form-group">
              <input type="file" className="form-control-file"
                onChange={this.handeFile} id="file-input" name="file" />
            </div>
            <button disabled={isLoading} type="submit" role="button"
              className="btn btn-success mr-0">Добавить файл</button>
          </div>
        </form> : <a onClick={() => this.setState({ active: true })} className="btn btn-info w-100 text-center">Добавить файл</a>}
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