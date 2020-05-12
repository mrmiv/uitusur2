import React, { Component, Fragment } from 'react'
import { closeNavbar } from '../../../redux/actions/navbarActions'
import { clearInfo } from '../../../redux/actions/infoActions'
import { GetNewsList, delNews, pinNews } from '../../../redux/actions/newsActions'
import { toDate } from '../../components/NewsList'
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'
import Pagination from "react-js-pagination";

export class AdminNews extends Component {

    state = {
        type: 1,
        page: 1,
        perPage: 12,

        msg: null
    }

    componentWillUnmount() {
        this.props.closeNavbar()
    }

    componentDidMount() {
        document.title = this.props.title
        this.props.GetNewsList(1, this.state.page)
    }

    componentDidUpdate(prevProps, prevState) {
        const { msg } = this.props.info

        if (msg !== prevProps.info.msg) {
            this.setState({ msg })
        }
    }

    Paginate(page) {
        window.scrollTo(0, 0);
        // console.log(page);
        const { type } = this.state
        this.setState({ page })
        this.props.GetNewsList(type, page)
    }

    delNews = id => {
        this.props.delNews(id)
        setTimeout(() => {
            this.props.GetNewsList(this.state.type, this.state.page)
        }, 250)
    }

    pinNews = id => {
        this.props.pinNews(id)
        setTimeout(() => {
            this.props.GetNewsList(this.state.type, this.state.page)
        }, 250)
    }

    setNewsType = e => {
        this.props.clearInfo()
        const type = e.target.value
        this.setState({ type })
        this.props.GetNewsList(type, 1)
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
                <div className="row no-gutters justify-content-between">
                    <h2>Новости кафедры</h2>
                    <select onChange={this.setNewsType}>
                        <option name="Объявления кафедры" value={1}>Объявления кафедры</option>
                        <option name="Стипендии и гранты" value={2}>Стипендии и гранты</option>
                        <option name="Конференции" value={3}>Конференции</option>
                    </select>
                    <Link to="/admin/news/form">Добавить новость<Icon icon={faPlusCircle} /></Link>
                    <div className="w-100" />
                    {this.state.type &&
                        <Fragment>
                            <table className="table table-hover table-sm-responsive">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Заголовок</th>
                                        <th scope="col">Дата создания</th>
                                        <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={faMapPin} /> </th>
                                        <th scope="col" style={{ width: "50px", textAlign: "center" }}> <Icon icon={faTrashAlt} /> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {NewsList && !isLoading ?
                                        NewsList.map((item, index) => {
                                            return (<tr>
                                                <th scope="row">{index + 1}</th>
                                                <td name="title"><Link to={`/admin/news/form/${item._id}`}>{item.title}</Link></td>
                                                <td name="date">{toDate(item.created_at, true)}</td>
                                                <td name="pin">
                                                    <button type="button" className="btn"
                                                        onClick={() => this.pinNews(item._id)}
                                                    >{item.pin && <Icon icon={faMapPin} />}</button>
                                                </td>
                                                <td name="del">
                                                    <button type="button" className="btn"
                                                        onClick={() => this.delNews(item._id, this.state.type)}><Icon icon={faTrashAlt} /></button>
                                                </td>
                                            </tr>)
                                        })
                                        : <p>loading</p>}
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
                        </Fragment>
                    }
                </div>
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