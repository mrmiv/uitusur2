import React, { Fragment, PureComponent } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { getNewsLinksByType, delNewsLink } from '../../../redux/actions/newsLinksActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import bxsEdit from '@iconify/icons-bx/bxs-edit';

import { MessageAlert } from '../components/MessageAlert'

export class AdminNewsLinks extends PureComponent {

  state = {
    msg: null,
    type: ""
  }

  componentWillUnmount() {
    this.props.closeNavbar()
  }

  componentDidMount() {
    this.props.clearInfo()
    document.title = this.props.title
    this.props.getNewsLinksByType()
  }

  componentDidUpdate(prevProps) {
    const { msg } = this.props.info

    if (msg !== prevProps.info.msg) {
      this.setState({ msg })
    }
    
  }

  ChangeType = e => {
    const type = e.target.value

    this.setState({type})
  }

  delParam = id => {
    const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
    if(areYouSure){
      window.scrollTo(0, 0)
      this.props.clearInfo()
      this.props.delNewsLink(id)
    } else {
        console.error('Элемент не удален')
    }
  }

  renderTableRow = () =>{

    const { newsLinks, isLoading } = this.props
    const { type } = this.state
    
    if(isLoading){
      return <tr><td>Загрузка</td></tr>
    }
    
    if (!newsLinks || newsLinks.length === 0){
      return <Fragment/>
    }

    if(type){
      const newsLinksListByType = newsLinks.filter(item => item.type === parseInt(type))
      console.log(type, newsLinksListByType);
      return newsLinksListByType.map((item, index) => this.renderRow(item, index))
    }

    return newsLinks.map((item, index) => this.renderRow(item, index) )
  }

  returnNewsType = type => {
    switch (type) {
      case 1:
        return "Объявления кафедры";
      case 2:
        return "Стипендии, конкурсы и гранты";
      case 3:
        return "Конференции";
      default:
        return "Тип не определен";
    }
  }
  
  renderRow = (item, index) => {
    
    return <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td name="name">{item.name}</td>
      <td name="type">{this.returnNewsType(item.type)}</td>
      <td name="link" style={{textAlign: "center" }}>
        <a href={item.path} target="blank" ref="noopener norefferer">Ссылка</a>
      </td>
      <td name="edit">
        <Link to={`/admin/news-links/edit/${item._id}`} className="btn"><Icon icon={bxsEdit} color="green"/></Link>
      </td>
      <td name="del">
        <button type="button" className="btn" onClick={() => this.delParam(item._id)}><Icon icon={trashAlt} color="red"/></button>
      </td>
    </tr>
  }

  renderNavigation = () =>{
    return <form>
      <div className="form-row align-items-center">
        <div className="form-group col-auto">
          <select onChange={this.ChangeType} value={this.state.type} className="form-control">
            <option defaultValue value="">Все</option>
            <option value={1}>Объявления кафедры</option>
            <option value={2}>Стипендии, конкурсы и гранты</option>
            <option value={3}>Конференции</option>
          </select>
        </div>
      </div>
    </form>
  }

  render() {
    
    return (
      <div className="container-md container-fluid">

        <MessageAlert msg={this.state.msg} id={this.props.info.id}/>
        
        <div className="row no-gutters  align-items-center justify-content-between">
          <h1>Полезные ссылки (для новостей)</h1>
          <Link className="add_admin_button" to="/admin/news-links/add">Добавить ссылку <Icon icon={plusCircle} /></Link>
        </div>

        {this.renderNavigation()}

          <table className="table table-hover table-bordered table-sm ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Тип новости</th>
                <th scope="col">Ссылка</th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={bxsEdit} /></th>
                <th scope="col" style={{ width: "50px", textAlign: "center" }}><Icon icon={trashAlt} /></th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRow()}
            </tbody>
          </table>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  newsLinks: state.api.news.newslinks.NewsLinksList,
  isLoading: state.api.news.newslinks.isLoading,
  info: state.info
})

export default connect(
  mapStateToProps,
  { closeNavbar, clearInfo,
    delNewsLink, getNewsLinksByType }
)(AdminNewsLinks)