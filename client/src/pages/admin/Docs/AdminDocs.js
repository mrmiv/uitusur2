import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { GetDocuments, delDocument } from '../../../redux/actions/docsActions'
import { toDate } from '../../components/NewsList'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import cogIcon from '@iconify/icons-fa-solid/cog';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';


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
        {msg ?
          <div className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
            {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
            {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
            {msg.message}.
                <button type="button" className="close" data-dismiss="alert" onClick={() => this.props.clearInfo()} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}
        <div className="row no-gutters align-items-center justify-content-between">
          <h1>  <Link to="/admin" style={{fontSize: "1em"}}><Icon icon={cogIcon} /></Link> Регламентирующие документы</h1>
          <Link className="add_admin_button" to="/admin/docs/form">Добавить документ/ссылку<Icon icon={plusCircle} /></Link>
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
                  <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={trashAlt} /> </th>
                </tr>
              </thead>
              <tbody>
                {docslist.map((item, index) => {
                  return (<tr>
                    <th scope="row">{index + 1}</th>
                    <td name="title"><Link to={`/admin/docs/form/${item._id}`}>{item.title}</Link></td>
                    <td name="date">{item.date ? toDate(item.date) : "-"}</td>
                    <td name="category">{item.category}</td>
                    <td name="date">{item.subcategory ? item.subcategory : "-"}</td>
                    <td name="del">
                      <button type="button" className="btn" onClick={() => this.delDocument(item._id)}><Icon icon={trashAlt} color="red"/></button>
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