import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { Editor } from "@tinymce/tinymce-react";
import { getParam, patchParam, postParam } from '../../../redux/actions/data_actions/paramActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'

export class FormParam extends Component {

  state = {
    id: null,

    title: "",
    text: "",
    page: "",

    blocked: false,
    msg: null
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    document.title = this.props.title
    const id = this.props.match.params.id
    if (id) {
      this.props.getParam(id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const id = this.props.match.params.id
    const { msg } = this.props.info

    if (id) {
      if (id !== prevState.id) {
        this.setState({ id })
      }
      const { param } = this.props

      if (param !== prevProps.param) {

        this.setState({
          title: param.title,
          text: param.text,
          page: param.page
        });
      }
    }
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  changeInput = e => {
    const field = e.target.name
    this.setState({ [field]: e.target.value })
    if (!this.state.blocked) {
      this.setState({ blocked: true })
    }
  }

  changeBody = (text) => {
    this.setState({ text });
    if (!this.state.blocked) {
      this.setState({ blocked: true });
    }
  };

  submitForm = e => {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.clearInfo()
    const id = this.state.id

    const { title, text, page } = this.state

    const Param = {
      title: title.trim(),
      text,
      page
    }

    if (id) {
      this.props.patchParam(id, Param)
    } else {
      this.props.postParam(Param)
    }

    if (this.props.info.id === "REQ_SUCCESS") {
      this.setState({ blocked: false })
      document.getElementById("param_form").reset()
    }

  }

  render() {
    const { msg } = this.state
    const { isLoading } = this.props
    return (
      <div className="container-md container-fluid">
        <Prompt
          when={this.state.blocked}
          message={() =>
            `Вы действительно хотите покинуть эту страницу?`
          }
        />
        {msg ?
          <div className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
            {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
            {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
            {msg.message}.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}
        <div className="row no-gutters justify-content-between">
          <Link to="/admin/param"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
          <form id="param_form" className="w-100 mt-3" onSubmit={this.submitForm}>

            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="title-input">Заголовок</label>
                <input onChange={this.changeInput} type="text" className="form-control"
                  name="title" id="title-input" placeholder="Правила подачи документов" value={this.state.title} />
              </div>
              <div className="col form-group">
                <label htmlFor="page-input">Страница</label>
                <input onChange={this.changeInput} type="text" className="form-control"
                  name="page" id="page-input" placeholder="Обучающимся" value={this.state.page} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="body-input">Сообщение</label>
              <Editor
                initialValue={this.state.text}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link charmap print preview anchor",
                    "searchreplace visualblocks code",
                    "insertdatetime table paste code help wordcount",
                  ],
                  style_formats: [
                    { title: 'button', inline: 'button', class: "more-link" }
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table insertfile image link media mediaembed pageembed | preview help",
                }}
                onEditorChange={this.changeBody}
                id="body-input"
              />
            </div>
            <div className="w-100 mt-2 text-right">
              <button className="btn btn-success mr-0" type="submit"
                disabled={isLoading}>{this.state.id ? "Обновить заголовок" : "Добавить заголовок"}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  param: state.param.param,
  isLoading: state.param.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  { postParam, closeNavbar, clearInfo, patchParam, getParam }
)(FormParam))