import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getAllParam, getPageParam, delParam, getActiveParamsOnpage, getActiveParams, setActivityOrOrder } from '../../../redux/actions/data_actions/paramActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import cogIcon from '@iconify/icons-fa-solid/cog';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import eyeIcon from '@iconify/icons-fa-solid/eye';
import eyeSlash from '@iconify/icons-fa-solid/eye-slash';

export class AdminParam extends Component {

  state = {
    msg: null,
    page: null,
    onlyActive: false
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    this.props.clearInfo()
    document.title = this.props.title
    this.props.getAllParam()
  }

  componentDidUpdate(prevProps, prevState) {
    const { msg } = this.props.info
    const {page,onlyActive} = this.state

    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
    if (page !== prevState.page || onlyActive !== prevState.onlyActive){
      if (page){
        if (onlyActive){
          this.props.getActiveParamsOnpage(page)
        } else {
          this.props.getPageParam(page)
        }
      } else {
        if (onlyActive){
          this.props.getActiveParams()
        } else {
          this.props.getAllParam()
        }
      }
    }
  }


  setActivity = (id, activity) => {
    const {page, onlyActive} = this.state

    this.props.setActivityOrOrder(id, activity, page, onlyActive)
  }

  ChangePage=(e)=>{
    const {value} = e.target
    this.setState({page: value.length? value : null})
  }

  delParam = (id) => {
    window.scrollTo(0, 0)
    this.props.clearInfo()
    this.props.delParam(id)
  }

  render() {
    const { params_list, params_list_onpage } = this.props
    const { msg, page, onlyActive } = this.state

    const TableRow = ({item, index}) => {
      return (<tr key={index}>
        <th scope="row">{index + 1}</th>
        <th name="visible" style={{cursor: "pointer", textAlign: "center"}} 
        onClick={()=>this.setActivity(item._id,!item.isActive)}>
          <Icon icon={item.isActive ? eyeIcon : eyeSlash}/>
        </th>
        <td name="page">{item.page}</td>
        <td name="title"><Link to={`/admin/param/edit/${item._id}`}>{item.title}</Link></td>
        <td name="order" style={{textAlign: "center" }}>{item.order}</td>
        <td name="del">
          <button type="button" className="btn" onClick={() => this.delParam(item._id)}><Icon icon={trashAlt} color="red"/></button>
        </td>
      </tr>)
    }

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
          <h2> <Link to="/admin"><Icon icon={cogIcon} /></Link> Заголовки</h2>
          <Link className="add_admin_button" to="/admin/param/add">Добавить заголовок <Icon icon={plusCircle} /></Link>
        </div>
        <form>
            <div className="form-row align-items-center">
              <div className="form-group col-auto">
                <select onChange={this.ChangePage} className="form-control">
                  <option defaultValue value="">Все</option>
                  <option value="О кафедре">О кафедре</option>
                  <option value="Поступающему Магистратура">Абитуриенту - Магистратура</option>
                  <option value="Абитуриенту">Абитуриенту - Бакалавриат</option>
                  <option value="Бакалавриат">Обучающимся - Бакалавриат</option>
                  <option value="Магистратура">Обучающимся - Магистратура</option>
                </select>
              </div>
              <div className="form-group col-auto">
                <div className="form-check">
                  <input type="checkbox" id="getActiveParams" name="onlyActive" className="form-check-input" 
                  onChange={()=>this.setState({onlyActive: !onlyActive})} checked={onlyActive}/>
                  <label htmlFor="getActiveParams" className="form-check-label">Только активные заголовки</label>
                </div>
              </div>
            </div>
          </form>
          <table class="table table-hover table-bordered table-sm ">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{textAlign: "center"}}><Icon icon={eyeIcon} /></th>
                <th scope="col">Страница</th>
                <th scope="col">Заголовок</th>
                <th scope="col" style={{textAlign: "center"}}>Порядок</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
                {/* style={{width="50px"}} */}
              </tr>
            </thead>
            <tbody>
              {page && params_list_onpage ? 
                params_list_onpage.map((item, index) => {
                  return <TableRow item={item} index={index}/>
              })
              : params_list ?
                params_list.map((item, index) => {
                  return <TableRow item={item} index={index}/>
                })
                : <p>Загрузка...</p>}
            </tbody>
          </table>
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
  { closeNavbar, clearInfo,
    delParam, getAllParam,
    getPageParam, getActiveParamsOnpage,
    getActiveParams, setActivityOrOrder }
)(AdminParam)