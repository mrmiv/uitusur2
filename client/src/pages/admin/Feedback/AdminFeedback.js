import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getfeedback, delfeedback, changeVisibility } from '../../../redux/actions/data_actions/AboutActions'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import bxsEdit from '@iconify/icons-bx/bxs-edit';
import eyeSlash from '@iconify/icons-fa-solid/eye-slash';
import eyeIcon from '@iconify/icons-fa-solid/eye';

import { Link, withRouter } from 'react-router-dom'
import { MessageAlert } from '../components/MessageAlert';

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

  changeVisibility = (id, visibility) => {
    this.props.changeVisibility(id, !visibility)
  }

  render() {
    const { isLoading, feedback } = this.props
    const { msg } = this.state

    return (
      <div className="container-md container-fluid">

        <MessageAlert msg={msg} id={this.props.info.id}/>

        <div className="row no-gutters align-items-center justify-content-between">
          <h1>Отзывы о кафедре</h1>
          <Link className="add_admin_button" to="/admin/feedback/add">Добавить отзыв <Icon icon={plusCircle} /></Link>
        </div >
          <table className="table table-sm table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={eyeIcon}/></th>
                <th scope="col">ФИО</th>
                <th scope="col">Должность</th>
                <th scope="col">Образование</th>
                <th scope="col">Тип</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={bxsEdit} /> </th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && feedback ?
                feedback.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td name="isActive"><button className="btn" onClick={() => this.changeVisibility(item._id, item.isActive)}><Icon icon={item.isActive ? eyeIcon : eyeSlash}/></button></td>
                      <td name="name">{item.name}</td>
                      <td name="post">{item.post}</td>
                      <td name="degree">{item.degree}</td>
                      <td name="type">{item.type === 1 ? "Отзыв" : "Цитата"}</td>
                      <td>
                        <Link title="Редактировать" className="btn" to={`/admin/feedback/edit/${item._id}`}><Icon icon={bxsEdit} color="green"/></Link>
                      </td>
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
    clearInfo,
    changeVisibility
  }
)(AdminFeedback))