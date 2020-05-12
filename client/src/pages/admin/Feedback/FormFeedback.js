import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { Editor } from "@tinymce/tinymce-react";
import { get_onefeedback, patchfeedback, postfeedback } from '../../../redux/actions/data_actions/AboutActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'

export class FormFeedback extends Component {

  state = {
    id: null,

    name: "",
    post: "",
    degree: "",
    text: "",

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
      this.props.get_onefeedback(id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const id = this.props.match.params.id
    const { msg } = this.props.info

    if (id) {
      if (id !== prevState.id) {
        this.setState({ id })
      }
      const { feedback } = this.props

      if (feedback !== prevProps.feedback) {

        this.setState({
          name: feedback.name,
          text: feedback.text,
          post: feedback.post,
          degree: feedback.degree
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

    const { name, text, post, degree, id } = this.state

    const Feedback = {
      name: name.trim(),
      text,
      post: post.trim(),
      degree: degree.trim()
    }

    if (id) {
      this.props.patchfeedback(id, Feedback)
    } else {
      this.props.postfeedback(Feedback)
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
          <Link to="/admin/feedback"><Icon icon={faArrowAltCircleLeft} size="lg" /> Назад</Link>
          <form id="feedback_form" className="w-100 mt-3" onSubmit={this.submitForm}>
            <div className="form-group">
              <label htmlFor="name-input">ФИО</label>
              <input onChange={this.changeInput} type="text" className="form-control"
                name="name" id="name-input" placeholder="Иванов Иван Иванович" value={this.state.name} />
            </div>
            <div className="form-row">
              <div className="col form-group">
                <label htmlFor="degree-input">Образование</label>
                <input onChange={this.changeInput} type="text" className="form-control"
                  name="degree" id="degree-input" placeholder="Факультет инновационных технологий" value={this.state.degree} />
              </div>
              <div className="col form-group">
                <label htmlFor="post-input">Должность</label>
                <input onChange={this.changeInput} type="text" className="form-control"
                  name="post" id="post-input" placeholder="Менеджер по продажам" value={this.state.post} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="body-input">Отзыв</label>
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
                disabled={isLoading}>{this.state.id ? "Обновить отзыв" : "Добавить отзыв"}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  feedback: state.api.feedback.Feedback,
  isLoading: state.api.feedback.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  { get_onefeedback, patchfeedback, postfeedback, closeNavbar, clearInfo, }
)(FormFeedback))