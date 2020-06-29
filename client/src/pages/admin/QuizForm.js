import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearInfo } from '../../redux/actions/infoActions'
import { getquiz, delquiz, updatequiz } from '../../redux/actions/data_actions/quizActions'

import './AdminIndex.scss'

export class QuizForm extends Component {

  state = {
    quiz: '',
    msg: null,
    active: false
  }

  componentDidMount() {
    this.props.getquiz()
  }

  componentDidUpdate(prevProps) {
    const { quiz } = this.props
    const { msg } = this.props.info
    if (quiz !== prevProps.quiz) {
      this.setState({ quiz })
    }
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  activate = () => {
    const { active } = this.state
    this.setState({ active: !active })
  }
  changeInput = e => {
    this.setState({ quiz: e.target.value })
  }

  updateQuiz = e => {
    e.preventDefault()
    this.props.clearInfo()
    const { quiz } = this.state
    // console.log(quiz);

    this.props.updatequiz(quiz.trim())
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
            {msg.message}.
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}
        <form onSubmit={this.updateQuiz}>
          <div className="form-group">
            <label htmlFor="quiz-input">Опрос <small style={{ cursor: "pointer" }} onClick={this.activate}><u>Редактировать</u></small></label>
            <input disabled={!active} type="text" className="form-control"
              onChange={this.changeInput} id="quiz-input" name="quiz"
              value={this.state.quiz} placeholder="Сслыка на google опрос" />
          </div>
          <button disabled={isLoading || !active} type="submit"
            role="button" className="btn btn-success mr-0">Обновить опрос</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  quiz: state.api.quiz.quiz,
  info: state.info
})

export default connect(
  mapStateToProps,
  {
    getquiz,
    delquiz,
    updatequiz,
    clearInfo
  }
)(QuizForm)