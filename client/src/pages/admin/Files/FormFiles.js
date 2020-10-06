import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { postfile } from '../../../redux/actions/filesActions'
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { FileField } from '../components/FileFieled';
import { MessageAlert } from '../components/MessageAlert';
 
export class FormFiles extends Component {

  state = {
    files: null,
    msg: null
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  handeFile = (e) => {
    // let file = e.target.files[0];
    // Object.defineProperty(file, "name", {
    //   writable: true,
    //   value: CyrillicToTranslit().transform(file["name"], "_"),
    // });
    this.setState({ files: e.target.files });
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
    const { msg } = this.state

    return (
      <div className="w-100 mt-3">
        <MessageAlert msg={msg} id={this.props.info.id}/>
        {/* <form onSubmit={this.postfile} className="pt-2">
          <div className="form-row">
            <div className="col form-group">
              <input type="file" className="form-control-file"
                onChange={this.handeFile} id="file-input" name="file" />
            </div>
            <button disabled={isLoading} type="submit" role="button"
              className="btn btn-success mr-0">Добавить файл</button>
          </div>
        </form> */}
        <FileField handleParentFiles={this.handeFile} id="files" name="files-input" multiple={false}/>
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