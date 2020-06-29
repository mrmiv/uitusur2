import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { GetAllCurators, delCurator } from '../../../redux/actions/data_actions/curatorActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'

export class AdminCurators extends Component {

  state = {
    msg: null
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    this.props.clearInfo()
    document.title = this.props.title
    this.props.GetAllCurators()
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info
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

  delCurator = (id) => {
    window.scrollTo(0, 0)
    this.props.clearInfo()
    this.props.delCurator(id)
  }

  render() {
    const { curators } = this.props
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
          <h2>Кураторы</h2>
          <Link to="/admin/curator/add">Добавить куратора<Icon icon={faPlusCircle} /></Link>
          <div className="w-100" />
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">ФИО</th>
                <th scope="col">Группа</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={faTrashAlt} /></th>
                {/* style={{width="50px"}} */}
              </tr>
            </thead>
            <tbody>
              {curators ?
                curators.length !== 0 ? curators.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td name="FIO"><Link to={`/admin/curator/edit/${item._id}`}>{item.lastname + " " + item.firstname + " " + item.secondname}</Link></td>
                      <td name="group">{item.group}</td>
                      <td name="del">
                        <button type="button" className="btn" onClick={() => this.delCurator(item._id)}><Icon icon={faTrashAlt} /></button>
                      </td>
                    </tr>
                  )
                }) : <p>Здесь пусто, добавьте куратора</p>
                : <p>loading</p>}
            </tbody>
          </table>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  curators: state.api.curators.CuratorList,
  isLoading: state.api.curators.isLoading,
  info: state.info
})

export default withRouter(connect(
  mapStateToProps,
  {
    closeNavbar,
    clearInfo,
    GetAllCurators,
    delCurator
  }
)(AdminCurators))