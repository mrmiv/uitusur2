import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getAllParam, getPagePrarm, delParam } from '../../../redux/actions/data_actions/paramActions'
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export class AdminParam extends Component {

  state = {
    msg: null,
    page: ''
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    this.props.clearInfo()
    document.title = this.props.title
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info

    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
  }

  delParam = (id) => {
    window.scrollTo(0, 0)
    this.props.clearInfo()
    this.props.delParam(id)
  }

  render() {
    const { params_list, params_list_onpage } = this.props
    const { msg } = this.state
    return (
      <div className="container-md container-fluid">
        {msg ?
          <div className={`alert 
                ${this.props.info.id === "REQ_FAIL" ? 'alert-danger' : null}
                ${this.props.info.id === "REQ_SUCCESS" ? 'alert-success' : null} alert-dismissible fade show`} role="alert">
            {this.props.info.id === "REQ_FAIL" && <strong>Ошибка! </strong>}
            {this.props.info.id === "REQ_SUCCESS" && <strong>Успех! </strong>}
            {msg.message}
            <button type="button" className="close" data-dismiss="alert" onClick={() => this.props.clearInfo()} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}
        <div className="row no-gutters justify-content-between">
          <h2>Заголовки</h2>
          <Link to="/admin/param/add">Добавить заголовок<Icon icon={faPlusCircle} /></Link>
          <div className="w-100" />
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Страница</th>
                <th scope="col">Заголовок</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={faTrashAlt} /></th>
                {/* style={{width="50px"}} */}
              </tr>
            </thead>
            <tbody>
              {params_list ?
                params_list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td name="page">{item.page}</td>
                      <td name="title"><Link to={`/admin/param/edit/${item._id}`}>{item.title}</Link></td>
                      <td name="del">
                        <button type="button" className="btn" onClick={() => this.delClub(item._id)}><Icon icon={faTrashAlt} /></button>
                      </td>
                    </tr>
                  )
                })
                : <p>loading</p>}
            </tbody>
          </table>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  params_list: state.param.params_list,
  params_list_onpage: state.param.params_list_onpage,
  info: state.info
})

export default connect(
  mapStateToProps,
  { closeNavbar, clearInfo }
)(AdminParam)