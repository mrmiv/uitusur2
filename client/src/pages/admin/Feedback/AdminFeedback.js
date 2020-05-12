import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getfeedback, delfeedback } from '../../../redux/actions/data_actions/AboutActions'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'

export class QuizForm extends Component {

  state = {
    msg: null,
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.getfeedback()
  }

  componentDidUpdate(prevProps, prevState) {
    const { msg } = this.props.info
    const id = this.props.match.params.id
    if (id) {

      if (id !== prevState.id) {
        this.setState({ id })
      }
      const { feedback } = this.props

      if (feedback !== prevProps.feedback) {
        this.setState({
          name: feedback.name,
          post: feedback.post,
          text: feedback.text,
          degree: feedback.degree,
        });
      }
    }
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  delfeedback = id => {
    this.props.clearInfo()
    this.props.delfeedback(id)
    this.props.getfeedback()
  }

  render() {
    const { isLoading, feedback } = this.props
    const { msg } = this.state

    return (
      <div className="container-md container-fluid">
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
          <h2>Отзывы о кафедре</h2>
          <Link to="/admin/feedback/add">Добавить отзыв <Icon icon={faPlusCircle} /></Link>
          <div className="w-100" />
          <table className="table table-hover table-sm-responsive">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">ФИО</th>
                <th scope="col">Должность</th>
                <th scope="col">Образование</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={faTrashAlt} /></th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && feedback ?
                feedback.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td name="name"><Link to={`/admin/feedback/edit/${item._id}`}>{item.name}</Link></td>
                      <td name="post">{item.post}</td>
                      <td name="degree">{item.degree}</td>
                      <td name="del">
                        <button type="button" className="btn" onClick={() => this.delfeedback(item._id)}><Icon icon={faTrashAlt} /></button>
                      </td>
                    </tr>
                  )
                })
                : <p>loading</p>}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  feedback: state.api.feedback.FeedbackList,
  isLoading: state.api.feedback.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  {
    getfeedback,
    delfeedback,
    clearInfo
  }
)(QuizForm))