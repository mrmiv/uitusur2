import React, { Component } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { GetNewsList, delNews, pinNews } from '../../../redux/actions/newsActions'
import { toDate } from '../../components/NewsList'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Pagination from "react-js-pagination";

import { Icon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import cogIcon from '@iconify/icons-fa-solid/cog';
import trashAlt from '@iconify/icons-fa-solid/trash-alt';
import pushpinIcon from '@iconify/icons-fxemoji/pushpin';

export class AdminNews extends Component {

    state = {
        type: null,
        page: 1,
        perPage: 15,

        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
        const {type, page, perPage} = this.state
        this.props.GetNewsList(type, page, perPage)
    }

    componentDidUpdate(prevProps, prevState) {
        const { msg } = this.props.info

        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    Paginate = page => {
        window.scrollTo(0, 0);
        // console.log(page);
        const { type, perPage } = this.state
        this.setState({ page })
        this.props.GetNewsList(type, page, perPage)
    }

    delNews = id => {
        const { type, page, perPage } = this.state
        const areYouSure = window.confirm('Вы действительно хотите удалить этот элемент?')
        if(areYouSure){
            window.scrollTo(0, 0)
            this.props.clearInfo()
            this.props.delNews(id, type, page, perPage)

        } else {
            console.log('Элемент не удален')
        }
    }

    pinNews = id => {
        const { type, page, perPage } = this.state
        this.props.pinNews(id, type, page, perPage)
        // setTimeout(() => {
        //     this.props.GetNewsList(this.state.type, this.state.page)
        // }, 250)
    }

    setNewsType = e => {
        this.props.clearInfo()
        const {page, perPage} = this.state
        const type = e.target.value
        this.setState({ type })
        this.props.GetNewsList(type, page, perPage)
    }

    render() {
        const { msg, page, perPage } = this.state
        const { news } = this.props

        const { NewsList, isLoading, total } = news

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
                <div className="row no-gutters justify-content-between align-items-center">
                    <h1><Link to="/admin" style={{fontSize: "1em"}}><Icon icon={cogIcon} /></Link> Новости кафедры</h1>
                    <Link className="add_admin_button" to="/admin/news/form">Добавить новость<Icon icon={plusCircle} /></Link>
                </div>
                <form>
                    <div className="form-row align-items-center">
                        <div className="form-group col-auto">
                            <select onChange={this.setNewsType} className="form-control">
                                <option defaultValue value={''}>Все</option>
                                <option name="Объявления кафедры" value={1}>Объявления кафедры</option>
                                <option name="Стипендии, конкурсы и гранты" value={2}>Стипендии, конкурсы и гранты</option>
                                <option name="Конференции" value={3}>Конференции</option>
                            </select>
                        </div>
                    </div>
                </form>
                <table className="table table-hover table-bordered table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Заголовок</th>
                            <th scope="col">Дата создания</th>
                            <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={pushpinIcon} /> </th>
                            <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={trashAlt} /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {NewsList && NewsList.map((item, index) => {
                                return (<tr>
                                    <th scope="row">{index + 1}</th>
                                    <td name="title"><Link to={`/admin/news/form/${item._id}`}>{item.title}</Link></td>
                                    <td name="date">{toDate(item.created_at, true)}</td>
                                    <td name="pin" style={{cursor:"pointer", textAlign: "center"}} onClick={() => this.pinNews(item._id)}>
                                        <Icon icon={pushpinIcon} style={{opacity: item.pin ? 1 : '0.2' }}/>
                                    </td>
                                    <td name="del">
                                        <button type="button" className="btn"
                                            onClick={() => this.delNews(item._id, this.state.type)}><Icon icon={trashAlt} /></button>
                                    </td>
                                </tr>)
                            })}
                    </tbody>
                </table>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={perPage}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    itemClass="more-link"
                    hideFirstLastPages
                    hideDisabled
                    onChange={this.Paginate.bind(this)} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    news: state.api.news.newslist,
    info: state.info
})

export default withRouter(connect(
    mapStateToProps,
    { closeNavbar, clearInfo, GetNewsList, delNews, pinNews }
)(AdminNews))