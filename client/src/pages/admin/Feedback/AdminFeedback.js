import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getfeedback, delfeedback } from '../../../redux/actions/data_actions/AboutActions'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import cogIcon from '@iconify/icons-fa-solid/cog';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import { Link, withRouter } from 'react-router-dom'

export class AdminFeedback extends Component {

  state = {
    msg: null,
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.getfeedback()
  }

  componentDidUpdate(prevProps, prevState) {
    const { msg } = this.props.info
    
    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  delfeedback = id => {
    const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
        if(areYouSure){
            window.scrollTo(0, 0)
            this.props.clearInfo()
            this.props.delfeedback(id)
        } else {
            console.error('Элемент не удален')
        }
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
        <div className="row no-gutters align-items-center justify-content-between">
          <h1> <Link to="/admin" style={{fontSize: "1em"}}><Icon icon={cogIcon} /></Link> Отзывы о кафедре</h1>
          <Link className="add_admin_button" to="/admin/feedback/add">Добавить отзыв <Icon icon={plusCircle} /></Link>
        </div >
          <table className="table table-sm table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">ФИО</th>
                <th scope="col">Должность</th>
                <th scope="col">Образование</th>
                <th scope="col">Тип</th>
                <th scope="col">Активен</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
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
                      <td name="type">{item.type === 1 ? "Отзыв" : "Цитата"}</td>
                      <td name="isActive">{item.isActive ? "да" : "нет"}</td>
                      <td name="del">
                        <button type="button" className="btn" onClick={() => this.delfeedback(item._id)}><Icon icon={trashAlt} color="red" /></button>
                      </td>
                    </tr>
                  )
                })
                : <p>Загрузка</p>}
            </tbody>
          </table>
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
)(AdminFeedback))