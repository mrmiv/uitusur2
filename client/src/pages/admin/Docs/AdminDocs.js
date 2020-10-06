import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { GetDocuments, delDocument } from '../../../redux/actions/docsActions'
import { toDate } from '../../components/NewsList'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import bxsEdit from '@iconify/icons-bx/bxs-edit';
import { MessageAlert } from '../components/MessageAlert'


export class AdminDocs extends Component {

  state = {
    category: null,
    msg: null
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    document.title = this.props.title
    this.props.GetDocuments()
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info

    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  delDocument = id => {
    const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
    if(areYouSure){
      window.scrollTo(0, 0)
      this.props.clearInfo()
      this.props.delDocument(id)
    } else {
      console.log('Элемент не удален')
    }
    
  }

  // setNewsType = e => {
  //   this.props.clearInfo()
  //   const type = e.target.value
  //   this.setState({ type })
  //   this.props.GetNewsList(type)
  // }

  render() {
    const { msg } = this.state
    const { docslist, isLoading } = this.props

    return (
      <div className="container-md container-fluid">
        
        <MessageAlert msg={msg} id={this.props.info.id}/>

        <div className="row no-gutters align-items-center justify-content-between">
          <h1>Регламентирующие документы</h1>
          <Link className="add_admin_button" to="/admin/docs/add">Добавить документ/ссылку <Icon icon={plusCircle} /></Link>
        </div>
          {docslist && !isLoading ?
            <table className="table table-sm table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Дата утверждения</th>
                  <th scope="col">Категория</th>
                  <th scope="col">Подкатегория</th>
                  <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={bxsEdit} /> </th>
                  <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={trashAlt} /> </th>
                </tr>
              </thead>
              <tbody>
                {docslist.map((item, index) => {
                  return (<tr>
                    <th scope="row">{index + 1}</th>
                    <td name="title">{item.title}</td>
                    <td name="date">{item.date ? toDate(item.date) : "-"}</td>
                    <td name="category">{item.category}</td>
                    <td name="date">{item.subcategory ? item.subcategory : "-"}</td>
                    <td name="edit">
                      <Link className="btn" to={`/admin/docs/edit/${item._id}`}><Icon icon={bxsEdit} color="green"/></Link>
                    </td>
                    <td name="del">
                      <button className="btn" onClick={() => this.delDocument(item._id)}><Icon icon={trashAlt} color="red"/></button>
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
            : <p>Загрузка</p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  docslist: state.api.docs.docslist.docslist,
  isLoading: state.api.docs.docslist.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  { closeNavbar, clearInfo, GetDocuments, delDocument }
)(AdminDocs))