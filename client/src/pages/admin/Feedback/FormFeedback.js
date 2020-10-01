import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { Editor } from "@tinymce/tinymce-react";
import { get_onefeedback, patchfeedback, postfeedback } from '../../../redux/actions/data_actions/AboutActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, Prompt, withRouter } from 'react-router-dom'
import { EditorArea } from '../components/Editor';

export class FormFeedback extends Component {

  state = {
    id: null,

    name: "",
    post: "",
    degree: "",
    text: "",
    isActive: false,
    type: 1,
    color: "",

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
          isActive: feedback.isActive,
          type: feedback.type,
          text: feedback.text,
          post: feedback.post,
          degree: feedback.degree,
          color: feedback.color
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

    const { name, text, post, degree, id, isActive, type, color} = this.state

    const Feedback = {
      name: name.trim(),
      text,
      post: post.trim(),
      degree: degree.trim(),
      isActive,
      type,
      color
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
    const buttonName = this.state.id ? "Обновить отзыв" : "Добавить отзыв"

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
                <label htmlFor="color-input">Цвет отзыва</label>
                <select className="form-control" id="color-input" name="color" 
                  onChange={this.changeInput} value={this.state.color} style={{backgroundColor: this.state.color, color: "white"}}>
                  <option value="#DE7128" style={{color: "#DE7128" }}>Оранжевый</option>
                  <option value="#0F8455" style={{color: "#0F8455" }}>Мятный</option>
                  <option value="#354ED1" style={{color: "#354ED1" }}>Синий</option>
                  <option value="#B21F66" style={{color: "#B21F66" }}>Розовый</option>
                  <option value="#98248F" style={{color: "#98248F" }}>Пурпурный</option>
                </select>
              </div>
              <div className="col form-group">
                <label htmlFor="type-input">Тип отзыва</label>
                <select className="form-control" id="type-input" name="type" 
                  onChange={this.changeInput} value={this.state.type} >
                  <option value={1}>Отзывы о кафедре</option>
                  <option value={2}>Цитаты сотрудников</option>
                </select>
              </div>
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
            
            <EditorArea value={this.state.text} changeParentBody={this.changeBody}/>

            <div className="justify-content-end align-items-center form-row">
              
              <div className="form-group col-auto">
                  <div className="form-check">
                    <input type="checkbox" id="isActive" name="isActive" 
                    className="form-check-input" onChange={()=>this.setState({isActive: !this.state.isActive})} checked={this.state.isActive}/>
                    <label htmlFor="isActive" className="form-check-label">Отобразить на странице</label>
                  </div>
                </div>
              <div className="col-auto">
                <button className="btn btn-success mr-0" type="submit"
                  disabled={isLoading}>{buttonName}</button>
              </div>
  
            </div>

            {/* <div className="w-100 mt-2 text-right">
              
              <button className="btn btn-success mr-0" type="submit"
                disabled={isLoading}>{buttonName}</button>
            </div> */}
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