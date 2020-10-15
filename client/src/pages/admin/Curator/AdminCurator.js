import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { connect } from 'react-redux'
import { GetAllCurators, delCurator } from '../../../redux/actions/data_actions/curatorActions'
import { Link, withRouter } from 'react-router-dom'
import { clearInfo } from '../../../redux/actions/infoActions'
import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import bxsEdit from '@iconify/icons-bx/bxs-edit';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import { MessageAlert } from '../components/MessageAlert'

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
    const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
    if(areYouSure){
      window.scrollTo(0, 0)
      this.props.clearInfo()
      this.props.delCurator(id)
    } else {
      console.log('Элемент не удален')
    }
  }
  
  renderCuratorsTable = () => {
    const { curators, isLoading } = this.props

    if (isLoading){
      return <p>Загрузка</p>
    }

    if (curators && (curators.length === 0)){
      return <p>Кураторов нет</p>
    }

    return <table class="table table-sm table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Группа</th>
          <th scope="col">ФИО</th>
          <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={bxsEdit} /></th>
          <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
        </tr>
      </thead>
      <tbody>
        {curators.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row" style={{width: "50px"}}>{index + 1}</th>
              <td name="group" style={{width: "100px"}}>{item.group}</td>
              <td name="FIO">{`${item.lastname} ${item.firstname} ${item.secondname ? item.secondname : ''}`}</td>
              <td name="edit" className="text-center">
                <Link title="Редактировать" className="btn" to={`/admin/curator/edit/${item._id}`}> <Icon icon={bxsEdit} color="green"/></Link>
              </td>
              <td name="del">
                <button title="Удалить" className="btn" onClick={() => this.delCurator(item._id)}><Icon icon={trashAlt} color="red" /></button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>

  }

  render() {
    const { msg } = this.state
    return (
      <div className="container-md container-fluid">
        
        <MessageAlert msg={msg} id={this.props.info.id}/>

        <div className="row no-gutters align-items-center justify-content-between">
          <h1>Кураторы</h1>
          <Link className="add_admin_button" to="/admin/curator/add">Добавить куратора<Icon icon={plusCircle} /></Link>
        </div>
        {this.renderCuratorsTable()}
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